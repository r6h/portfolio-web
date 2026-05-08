<template>
  <div ref="stageRef" class="core-stage" aria-hidden="true">
    <canvas ref="canvasRef" class="core-canvas" />
    <div class="core-vignette" />
    <div class="core-grid" />
    <div class="core-glow" />
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
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useAccentTheme } from "~/composables/useAccentTheme";
import { useModelPreloader } from "~/composables/useModelPreloader";
import { useSiteLoader } from "~/composables/useSiteLoader";
import { OLD_COMPUTER_MODEL_URL } from "~/utils/modelUrls";
import { hexToRgbTriplet } from "~/utils/theme";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const stageRef = ref<HTMLElement | null>(null);

let renderer: WebGLRenderer | null = null;
let resizeObserver: ResizeObserver | null = null;
let stageObserver: IntersectionObserver | null = null;
let teardown: (() => void) | null = null;
let rafId = 0;
let stageVisible = true;
let prefersReducedMotion = false;

const { isExperienceReady } = useSiteLoader();
const { preloadModel } = useModelPreloader();
const { accentHex } = useAccentTheme();

let accentMaterials: Array<MeshPhysicalMaterial & { userData: { accentUniform?: { value: Color } } }> = [];
let shellMaterial: MeshBasicMaterial | null = null;
let rimLight: PointLight | null = null;
let underLight: PointLight | null = null;

const makeAccentColor = (value = accentHex.value) => {
  const { r, g, b } = hexToRgbTriplet(value);
  const color = new Color().setRGB(r / 255, g / 255, b / 255);
  color.offsetHSL(0.02, 0.04, -0.01);
  return color;
};

const applyAccentTone = (value: string) => {
  const accentColor = makeAccentColor(value);
  rimLight?.color.set(accentColor);
  underLight?.color.set(accentColor);
  shellMaterial?.color.set(accentColor);

  for (const material of accentMaterials) {
    material.emissive.set(accentColor);
    material.userData.accentUniform?.value.set(accentColor);
  }
};

const disposeMaterial = (material: Material | Material[]) => {
  const materials = Array.isArray(material) ? material : [material];
  for (const item of materials) {
    item.dispose();
  }
};

const createAccentMaterial = (sourceMaterial: Material | Material[]) => {
  const source = Array.isArray(sourceMaterial) ? sourceMaterial[0] : sourceMaterial;
  const texturedSource = source as Material & {
    map?: MeshPhysicalMaterial["map"];
    normalMap?: MeshPhysicalMaterial["normalMap"];
    roughnessMap?: MeshPhysicalMaterial["roughnessMap"];
  };

  const material = new MeshPhysicalMaterial({
    map: texturedSource.map ?? null,
    normalMap: texturedSource.normalMap ?? null,
    roughnessMap: texturedSource.roughnessMap ?? null,
    color: new Color("#d4dccb"),
    roughness: 0.5,
    metalness: 0.03,
    emissive: makeAccentColor(),
    emissiveIntensity: 0.08,
    clearcoat: 0.66,
    clearcoatRoughness: 0.34,
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
      diffuseColor.rgb = mix(vec3(grayValue), accentColor, 0.34);`,
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <emissivemap_fragment>",
      `#include <emissivemap_fragment>
      float rimAccent = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 2.35);
      totalEmissiveRadiance += accentColor * rimAccent * 0.12;`,
    );
  };
  material.customProgramCacheKey = () => "intro-old-computer-accent-material";

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
    opacity: 0.08,
    side: BackSide,
    depthWrite: false,
    blending: AdditiveBlending,
  });

  shell.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    object.material = shellMaterial;
  });

  shell.scale.multiplyScalar(1.012);
  return shell;
};

const fitModel = (model: Group, camera: PerspectiveCamera, stage: HTMLElement) => {
  const stageWidth = Math.max(stage.clientWidth, 1);
  const stageHeight = Math.max(stage.clientHeight, 1);
  const cameraDistance = Math.abs(camera.position.z - model.position.z);
  const visibleHeight = 2 * Math.tan((camera.fov * Math.PI) / 360) * cameraDistance;
  const visibleWidth = visibleHeight * (stageWidth / stageHeight);
  const widthTarget = visibleWidth * 0.78;
  const heightTarget = visibleHeight * 0.72;

  const size = new Vector3();
  const center = new Vector3();

  model.position.set(0, 0, 0);
  model.scale.setScalar(1);
  model.updateMatrixWorld(true);

  const unscaledBounds = new Box3().setFromObject(model);
  unscaledBounds.getSize(size);

  const scale = Math.min(
    widthTarget / Math.max(size.x, 1),
    heightTarget / Math.max(size.y, 1),
  ) * 0.94;

  model.scale.setScalar(scale);
  model.updateMatrixWorld(true);

  const scaledBounds = new Box3().setFromObject(model);
  scaledBounds.getCenter(center);
  model.position.sub(center);
};

onMounted(async () => {
  if (!canvasRef.value || !stageRef.value || typeof window === "undefined") return;

  const stage = stageRef.value;
  const canvas = canvasRef.value;

  const scene = new Scene();
  const camera = new PerspectiveCamera(31, 1, 0.1, 100);
  camera.position.set(0, 0.14, 8.6);

  renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);

  scene.add(new AmbientLight(0xf3f6ed, 1.1));

  const keyLight = new PointLight(0xffffff, 6.2, 18, 2);
  keyLight.position.set(4.6, 3.9, 7.2);
  scene.add(keyLight);

  rimLight = new PointLight(makeAccentColor().getHex(), 6.8, 16, 2);
  rimLight.position.set(-5.8, 1.8, 4.6);
  scene.add(rimLight);

  underLight = new PointLight(makeAccentColor().getHex(), 1.9, 14, 2);
  underLight.position.set(0.4, -4.2, 2.1);
  scene.add(underLight);

  const modelRoot = new Group();
  const rig = new Group();
  modelRoot.add(rig);
  scene.add(modelRoot);

  const loader = new GLTFLoader();
  const gltf = await preloadModel("old-computer-model", () =>
    loader.loadAsync(OLD_COMPUTER_MODEL_URL),
  );
  const model = gltf.scene;
  applyAccentMaterials(model);
  model.rotation.set(-0.14, 0.66, 0.02);
  fitModel(model, camera, stage);
  const shell = buildAccentShell(model);
  shell.position.copy(model.position);
  shell.rotation.copy(model.rotation);
  rig.add(shell);
  rig.add(model);
  applyAccentTone(accentHex.value);

  const viewportParallax = new Vector2(0, 0);
  const cursorParallax = new Vector2(0, 0);
  const parallaxTarget = new Vector2(0, 0);
  const parallaxSmooth = new Vector2(0, 0);

  const syncParallaxTarget = () => {
    parallaxTarget.x = viewportParallax.x + cursorParallax.x;
    parallaxTarget.y = viewportParallax.y + cursorParallax.y;
    parallaxTarget.clampScalar(-0.75, 0.75);
  };

  const updateViewportParallax = () => {
    const rect = stage.getBoundingClientRect();
    const viewportWidth = window.innerWidth || 1;
    const viewportHeight = window.innerHeight || 1;
    const centerX = rect.left + rect.width * 0.5;
    const centerY = rect.top + rect.height * 0.5;

    viewportParallax.x = ((centerX - viewportWidth * 0.5) / viewportWidth) * -0.7;
    viewportParallax.y = ((centerY - viewportHeight * 0.5) / viewportHeight) * -0.55;
    syncParallaxTarget();
  };

  const updateCursorParallax = (clientX: number, clientY: number) => {
    const rect = stage.getBoundingClientRect();
    const viewportWidth = window.innerWidth || 1;
    const viewportHeight = window.innerHeight || 1;
    const stageInfluence = Math.max(0, Math.min(1, (viewportHeight - Math.abs(rect.top + rect.height * 0.5 - viewportHeight * 0.5)) / viewportHeight));
    const localX = clientX / viewportWidth;
    const localY = clientY / viewportHeight;

    cursorParallax.x = (localX - 0.5) * 0.42 * stageInfluence;
    cursorParallax.y = (localY - 0.5) * 0.28 * stageInfluence;
    syncParallaxTarget();
  };

  const resetCursorParallax = () => {
    cursorParallax.set(0, 0);
    syncParallaxTarget();
  };

  const handlePointerMove = (event: PointerEvent) => {
    updateCursorParallax(event.clientX, event.clientY);
  };

  const resize = () => {
    if (!renderer) return;
    const width = Math.max(stage.clientWidth, 1);
    const height = Math.max(stage.clientHeight, 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    updateViewportParallax();
    parallaxSmooth.copy(parallaxTarget);
  };

  watch(accentHex, (value) => {
    applyAccentTone(value);
  }, { immediate: true });

  resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);
  resize();
  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("blur", resetCursorParallax);
  window.addEventListener("scroll", updateViewportParallax, { passive: true });
  window.addEventListener("resize", updateViewportParallax, { passive: true });

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

    parallaxSmooth.lerp(parallaxTarget, 0.08);

    const drift = time * 0.001;
    const targetYaw = -0.08 + parallaxSmooth.x * 0.22;
    const targetPitch = 0.03 + parallaxSmooth.y * 0.1;

    rig.rotation.y += (targetYaw - rig.rotation.y) * 0.1;
    rig.rotation.x += (targetPitch - rig.rotation.x) * 0.1;
    modelRoot.rotation.z = Math.sin(drift * 0.52) * 0.01 + parallaxSmooth.x * 0.018;
    modelRoot.position.y = Math.sin(drift * 0.88) * 0.03 + parallaxSmooth.y * 0.09;
    modelRoot.position.x = Math.cos(drift * 0.44) * 0.02 + parallaxSmooth.x * 0.12;
    modelRoot.position.z = parallaxSmooth.y * -0.08;

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
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("blur", resetCursorParallax);
    window.removeEventListener("scroll", updateViewportParallax);
    window.removeEventListener("resize", updateViewportParallax);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    modelRoot.traverse((object) => {
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
.core-stage {
  position: relative;
  min-height: 22rem;
  overflow: hidden;
  background: transparent;
  isolation: isolate;
}

.core-canvas,
.core-vignette,
.core-grid,
.core-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.core-canvas {
  z-index: 1;
  width: 100%;
  height: 100%;
  display: block;
}

.core-vignette {
  z-index: 2;
  background:
    radial-gradient(circle at 48% 48%, transparent 20%, rgb(5 5 5 / 0.1) 56%, rgb(5 5 5 / 0.34) 100%),
    linear-gradient(90deg, rgb(5 5 5 / 0.16) 0%, transparent 18%, transparent 84%, rgb(5 5 5 / 0.22) 100%);
}

.core-grid {
  z-index: 3;
  background:
    linear-gradient(90deg, rgb(237 237 237 / 0.03) 1px, transparent 1px),
    linear-gradient(rgb(237 237 237 / 0.03) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: linear-gradient(180deg, rgb(0 0 0 / 0.28), rgb(0 0 0 / 0.88));
  opacity: 0.18;
}

.core-glow {
  z-index: 4;
  background:
    radial-gradient(circle at 38% 48%, rgb(var(--accent-rgb) / 0.022), transparent 14rem),
    linear-gradient(180deg, transparent 0%, rgb(5 5 5 / 0.05) 100%);
  mix-blend-mode: screen;
}

@media (max-width: 767px) {
  .core-stage {
    min-height: 17rem;
  }

  .core-grid {
    background-size: 18px 18px;
  }
}
</style>
