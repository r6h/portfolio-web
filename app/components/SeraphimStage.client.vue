<template>
  <div ref="stageRef" class="seraphim-stage" aria-hidden="true">
    <canvas ref="canvasRef" class="seraphim-canvas" />
    <div class="seraphim-vignette" />
    <div class="seraphim-grid" />
    <div class="seraphim-scan" />
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
  Vector2,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { onMounted, onUnmounted, ref } from "vue";

const modelUrl = new URL("../../eye/source/Eye.glb", import.meta.url).href;

const canvasRef = ref<HTMLCanvasElement | null>(null);
const stageRef = ref<HTMLElement | null>(null);

let renderer: WebGLRenderer | null = null;
let resizeObserver: ResizeObserver | null = null;
let stageObserver: IntersectionObserver | null = null;
let rafId = 0;
let teardown: (() => void) | null = null;
let stageVisible = true;
let prefersReducedMotion = false;

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
    roughness: 0.42,
    metalness: 0.04,
    emissive: new Color("#ccff00"),
    emissiveIntensity: 0.12,
    clearcoat: 0.72,
    clearcoatRoughness: 0.3,
  });

  material.onBeforeCompile = (shader) => {
    shader.uniforms.accentColor = { value: new Color("#ccff00") };
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <common>",
      "#include <common>\nuniform vec3 accentColor;",
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <color_fragment>",
      `#include <color_fragment>
      float grayValue = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
      diffuseColor.rgb = mix(vec3(grayValue), vec3(grayValue) * accentColor, 0.74);`,
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <emissivemap_fragment>",
      `#include <emissivemap_fragment>
      float rimAccent = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 2.0);
      totalEmissiveRadiance += accentColor * rimAccent * 0.34;`,
    );
  };
  material.customProgramCacheKey = () => "accent-luminance-material";

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
  });
};

const buildAccentShell = (model: Group) => {
  const shell = model.clone(true);
  const shellMaterial = new MeshBasicMaterial({
    color: new Color("#ccff00"),
    transparent: true,
    opacity: 0.36,
    side: BackSide,
    depthWrite: false,
    blending: AdditiveBlending,
  });

  shell.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    object.material = shellMaterial;
  });

  shell.scale.multiplyScalar(1.022);
  return shell;
};

const fitModel = (model: Group) => {
  const bounds = new Box3().setFromObject(model);
  const size = new Vector3();
  const center = new Vector3();
  bounds.getSize(size);
  bounds.getCenter(center);

  const maxAxis = Math.max(size.x, size.y, size.z) || 1;
  const scale = 3.2 / maxAxis;
  model.scale.setScalar(scale);
  model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
};

onMounted(async () => {
  if (!canvasRef.value || !stageRef.value || typeof window === "undefined") return;

  const stage = stageRef.value;
  const canvas = canvasRef.value;

  const scene = new Scene();
  const camera = new PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0.08, 7.4);

  renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);

  scene.add(new AmbientLight(0xf3f6ed, 1.15));

  const keyLight = new PointLight(0xffffff, 5.8, 18, 2);
  keyLight.position.set(4.6, 4.2, 6.5);
  scene.add(keyLight);

  const rimLight = new PointLight(0xccff00, 12.5, 14, 2);
  rimLight.position.set(-5.2, 1.8, 3.4);
  scene.add(rimLight);

  const underLight = new PointLight(0xccff00, 4.8, 12, 2);
  underLight.position.set(0, -4.8, 2.4);
  scene.add(underLight);

  const modelRoot = new Group();
  const rig = new Group();
  modelRoot.add(rig);
  scene.add(modelRoot);

  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync(modelUrl);
  const model = gltf.scene;
  applyAccentMaterials(model);
  fitModel(model);
  model.rotation.set(-0.08, 0, 0);
  rig.add(buildAccentShell(model));
  rig.add(model);

  const pointer = new Vector2(0, 0);
  const smoothPointer = new Vector2(0, 0);

  const updatePointerFromClientPosition = (clientX: number, clientY: number) => {
    const rect = stage.getBoundingClientRect();
    const centerX = rect.left + rect.width * 0.5;
    const centerY = rect.top + rect.height * 0.5;
    pointer.x = ((clientX - centerX) / Math.max(rect.width * 0.5, 1)) * 1.35;
    pointer.y = ((clientY - centerY) / Math.max(rect.height * 0.5, 1)) * 1.35;
    pointer.clampScalar(-1.4, 1.4);
  };

  const resize = () => {
    if (!renderer) return;
    const width = Math.max(stage.clientWidth, 1);
    const height = Math.max(stage.clientHeight, 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const currentPointer = (window as Window & { __rkPointer?: { x: number; y: number } }).__rkPointer;
    if (currentPointer) {
      updatePointerFromClientPosition(currentPointer.x, currentPointer.y);
      smoothPointer.copy(pointer);
    }
  };

  const handlePointerMove = (event: PointerEvent | MouseEvent) => {
    updatePointerFromClientPosition(event.clientX, event.clientY);
  };

  const resetPointer = () => {
    pointer.set(0, 0);
  };

  resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);
  resize();

  const currentPointer = (window as Window & { __rkPointer?: { x: number; y: number } }).__rkPointer;
  if (currentPointer) {
    updatePointerFromClientPosition(currentPointer.x, currentPointer.y);
    smoothPointer.copy(pointer);
  }

  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("blur", resetPointer);
  window.addEventListener("mouseleave", resetPointer);

  const startLoop = () => {
    if (rafId || !stageVisible || prefersReducedMotion) return;
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

    smoothPointer.lerp(pointer, 0.18);

    const drift = time * 0.001;
    const targetYaw = smoothPointer.x * 0.56;
    const targetPitch = smoothPointer.y * 0.28;

    rig.rotation.y += (targetYaw - rig.rotation.y) * 0.14;
    rig.rotation.x += (targetPitch - rig.rotation.x) * 0.14;
    modelRoot.rotation.z = Math.sin(drift * 0.7) * 0.035;
    modelRoot.position.y = Math.sin(drift * 1.25) * 0.08;

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
      if (stageVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    },
    { threshold: 0.14 },
  );
  stageObserver.observe(stage);

  const handleVisibilityChange = () => {
    stageVisible = !document.hidden;
    if (stageVisible) {
      startLoop();
    } else {
      stopLoop();
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
  teardown = () => {
    stopLoop();
    resizeObserver?.disconnect();
    resizeObserver = null;
    stageObserver?.disconnect();
    stageObserver = null;
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("blur", resetPointer);
    window.removeEventListener("mouseleave", resetPointer);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    modelRoot.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      object.geometry.dispose();
      disposeMaterial(object.material);
    });
    renderer?.dispose();
    renderer = null;
  };
});

onUnmounted(() => {
  teardown?.();
  teardown = null;
});
</script>

<style scoped>
.seraphim-stage {
  position: relative;
  min-height: 30rem;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 50%, rgb(204 255 0 / 0.12), transparent 14rem),
    linear-gradient(180deg, #060606 0%, #050505 100%);
  isolation: isolate;
}

.seraphim-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

.seraphim-vignette,
.seraphim-grid,
.seraphim-scan,
.seraphim-frame {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.seraphim-vignette {
  z-index: 2;
  background:
    radial-gradient(circle at 50% 50%, transparent 0%, transparent 28%, rgb(5 5 5 / 0.16) 58%, rgb(5 5 5 / 0.82) 100%),
    linear-gradient(90deg, rgb(5 5 5 / 0.72) 0%, transparent 24%, transparent 76%, rgb(5 5 5 / 0.72) 100%);
}

.seraphim-grid {
  z-index: 3;
  background:
    linear-gradient(90deg, rgb(237 237 237 / 0.028) 1px, transparent 1px),
    linear-gradient(rgb(237 237 237 / 0.028) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.44;
}

.seraphim-scan {
  z-index: 4;
  background:
    repeating-linear-gradient(
      180deg,
      rgb(237 237 237 / 0.042) 0,
      rgb(237 237 237 / 0.042) 1px,
      transparent 1px,
      transparent 4px
    );
  mix-blend-mode: soft-light;
  opacity: 0.16;
}
</style>
