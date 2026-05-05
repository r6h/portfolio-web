<template>
  <div ref="stageRef" class="terminal-stage" aria-hidden="true">
    <canvas ref="canvasRef" class="terminal-canvas" />
  </div>
</template>

<script setup lang="ts">
import {
  AmbientLight,
  AdditiveBlending,
  BackSide,
  Box3,
  Color,
  Group,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useAccentTheme } from "~/composables/useAccentTheme";
import { useSiteLoader } from "~/composables/useSiteLoader";
import { useModelPreloader } from "~/composables/useModelPreloader";
import { TERMINAL_MODEL_URL } from "~/utils/modelUrls";
import { hexToRgbTriplet } from "~/utils/theme";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const stageRef = ref<HTMLElement | null>(null);

let renderer: WebGLRenderer | null = null;
let resizeObserver: ResizeObserver | null = null;
let stageObserver: IntersectionObserver | null = null;
let rafId = 0;
let teardown: (() => void) | null = null;
let stageVisible = true;
let prefersReducedMotion = false;

const { isExperienceReady } = useSiteLoader();
const { preloadModel } = useModelPreloader();
const { accentHex } = useAccentTheme();

let accentMaterials: Array<MeshPhysicalMaterial & { userData: { accentUniform?: { value: Color } } }> = [];
let shellMaterial: MeshBasicMaterial | null = null;
let rimLight: PointLight | null = null;
let underLight: PointLight | null = null;
let fillLight: PointLight | null = null;

const makeAccentColor = (value = accentHex.value) => {
  const { r, g, b } = hexToRgbTriplet(value);
  const color = new Color().setRGB(r / 255, g / 255, b / 255);
  color.offsetHSL(0.045, 0.12, 0.04);
  return color;
};
const applyAccentTone = (value: string) => {
  const accentColor = makeAccentColor(value);
  rimLight?.color.set(accentColor);
  underLight?.color.set(accentColor);
  fillLight?.color.set(accentColor);
  shellMaterial?.color.set(accentColor);

  for (const material of accentMaterials) {
    material.emissive.set(accentColor);
    material.userData.accentUniform?.value.set(accentColor);
  }
};

const disposeMaterial = (material: Material | Material[]) => {
  const materials = Array.isArray(material) ? material : [material];
  for (const item of materials) item.dispose();
};

const createAccentMaterial = (sourceMaterial: Material | Material[]) => {
  const source = Array.isArray(sourceMaterial) ? sourceMaterial[0] : sourceMaterial;
  const texturedSource = source as Material & {
    map?: MeshPhysicalMaterial["map"];
    normalMap?: MeshPhysicalMaterial["normalMap"];
    roughnessMap?: MeshPhysicalMaterial["roughnessMap"];
    aoMap?: MeshPhysicalMaterial["aoMap"];
  };

  const material = new MeshPhysicalMaterial({
    map: texturedSource.map ?? null,
    normalMap: texturedSource.normalMap ?? null,
    roughnessMap: texturedSource.roughnessMap ?? null,
    aoMap: texturedSource.aoMap ?? null,
    color: new Color("#cfd7c5"),
    roughness: 0.5,
    metalness: 0.16,
    emissive: makeAccentColor(),
    emissiveIntensity: 0.12,
    clearcoat: 0.64,
    clearcoatRoughness: 0.36,
  });

  material.onBeforeCompile = (shader) => {
    shader.uniforms.accentColor = { value: makeAccentColor() };
    material.userData.accentUniform = shader.uniforms.accentColor;
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <common>",
      "#include <common>\nuniform vec3 accentColor;",
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <color_fragment>",
      `#include <color_fragment>
      float grayValue = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
      diffuseColor.rgb = mix(vec3(grayValue), accentColor, 0.64);`,
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <emissivemap_fragment>",
      `#include <emissivemap_fragment>
      float rimAccent = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 2.15);
      totalEmissiveRadiance += accentColor * rimAccent * 0.32;`,
    );
  };
  material.customProgramCacheKey = () => "security-terminal-accent-material";

  return material;
};

const applyAccentMaterials = (model: Group) => {
  model.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    const material = createAccentMaterial(object.material);
    disposeMaterial(object.material);
    object.material = material;
    object.castShadow = false;
    object.receiveShadow = false;
    accentMaterials.push(material as MeshPhysicalMaterial & { userData: { accentUniform?: { value: Color } } });
  });
};

const buildAccentShell = (model: Group) => {
  const shell = model.clone(true);
  shellMaterial = new MeshBasicMaterial({
    color: makeAccentColor(),
    transparent: true,
    opacity: 0.26,
    side: BackSide,
    depthWrite: false,
    blending: AdditiveBlending,
  });

  shell.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    object.material = shellMaterial;
  });

  shell.scale.multiplyScalar(1.018);
  return shell;
};

const fitModel = (model: Group) => {
  const bounds = new Box3().setFromObject(model);
  const size = new Vector3();
  const center = new Vector3();
  bounds.getSize(size);
  bounds.getCenter(center);

  const isCompactStage = typeof window !== "undefined" && window.innerWidth < 768;
  const widthTarget = isCompactStage ? 3.65 : 4.8;
  const heightTarget = isCompactStage ? 2.12 : 2.7;
  const scale = Math.min(widthTarget / Math.max(size.x, 1), heightTarget / Math.max(size.y, 1)) * (isCompactStage ? 0.74 : 0.88);

  model.scale.setScalar(scale);
  model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
};

onMounted(async () => {
  if (!canvasRef.value || !stageRef.value || typeof window === "undefined") return;

  const stage = stageRef.value;
  const canvas = canvasRef.value;

  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 8.8);

  renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);

  scene.add(new AmbientLight(0xf3f6ed, 1.05));

  const keyLight = new PointLight(0xffffff, 6.1, 18, 2);
  keyLight.position.set(4.8, 4.1, 7.2);
  scene.add(keyLight);

  rimLight = new PointLight(makeAccentColor().getHex(), 13, 16, 2);
  rimLight.position.set(-5.6, 2.4, 4.8);
  scene.add(rimLight);

  underLight = new PointLight(makeAccentColor().getHex(), 5.2, 14, 2);
  underLight.position.set(0, -4.6, 2.4);
  scene.add(underLight);

  fillLight = new PointLight(makeAccentColor().getHex(), 2.4, 14, 2);
  fillLight.position.set(0, 1.6, 6.4);
  scene.add(fillLight);

  const rotationPivot = new Group();
  scene.add(rotationPivot);

  const loader = new GLTFLoader();
  const gltf = await preloadModel("terminal-model", () => loader.loadAsync(TERMINAL_MODEL_URL));
  const model = gltf.scene;
  applyAccentMaterials(model);
  fitModel(model);
  const shell = buildAccentShell(model);
  model.rotation.set(0, 0, 0);
  shell.rotation.copy(model.rotation);
  rotationPivot.add(shell);
  rotationPivot.add(model);
  applyAccentTone(accentHex.value);

  const resize = () => {
    if (!renderer) return;
    const width = Math.max(stage.clientWidth, 1);
    const height = Math.max(stage.clientHeight, 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);
  resize();

  watch(accentHex, (value) => {
    applyAccentTone(value);
  }, { immediate: true });

  const startLoop = () => {
    if (rafId || !stageVisible || prefersReducedMotion || !isExperienceReady.value) return;
    rafId = window.requestAnimationFrame(render);
  };

  const stopLoop = () => {
    if (!rafId) return;
    window.cancelAnimationFrame(rafId);
    rafId = 0;
  };

  function render(time: number) {
    if (!stageVisible) {
      rafId = 0;
      return;
    }

    rotationPivot.rotation.y = time * 0.00042;

    renderer?.render(scene, camera);

    if (!prefersReducedMotion) {
      rafId = window.requestAnimationFrame(render);
    } else {
      rafId = 0;
    }
  }

  prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  startLoop();

  stageObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      stageVisible = Boolean(entry?.isIntersecting);
      if (stageVisible) startLoop();
      else stopLoop();
    },
    { threshold: 0.14 },
  );
  stageObserver.observe(stage);

  const handleVisibilityChange = () => {
    stageVisible = !document.hidden;
    if (stageVisible) startLoop();
    else stopLoop();
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
  teardown = () => {
    stopLoop();
    resizeObserver?.disconnect();
    resizeObserver = null;
    stageObserver?.disconnect();
    stageObserver = null;
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    rotationPivot.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      object.geometry.dispose();
      disposeMaterial(object.material);
    });
    renderer?.dispose();
    renderer = null;
  };

  watch(
    isExperienceReady,
    (ready) => {
      if (ready) startLoop();
      else stopLoop();
    },
    { immediate: true },
  );
});

onUnmounted(() => {
  teardown?.();
  teardown = null;
});
</script>

<style scoped>
.terminal-stage {
  position: relative;
  min-height: 30rem;
  overflow: hidden;
  isolation: isolate;
}

.terminal-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

@media (max-width: 767px) {
  .terminal-stage {
    min-height: 12rem;
  }
}
</style>
