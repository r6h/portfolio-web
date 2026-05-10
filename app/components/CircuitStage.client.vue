<template>
  <div ref="stageRef" class="circuit-stage" aria-hidden="true">
    <canvas ref="canvasRef" class="circuit-canvas" />
    <div class="circuit-grid" />
    <div class="circuit-vignette" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useAccentTheme } from "~/composables/useAccentTheme";
import { hexToRgbTriplet } from "~/utils/theme";

type CircuitNode = {
  x: number;
  y: number;
  pulseOffset: number;
};

type CircuitPath = {
  points: Array<{ x: number; y: number }>;
  speed: number;
  offset: number;
  length: number;
};

const canvasRef = ref<HTMLCanvasElement | null>(null);
const stageRef = ref<HTMLElement | null>(null);

const { accentHex } = useAccentTheme();

let resizeObserver: ResizeObserver | null = null;
let rafId = 0;
let reducedMotion = false;

const buildLayout = (width: number, height: number) => {
  const gridSize = width < 768 ? 18 : 24;
  const columns = 5;
  const rows = 6;
  const usableWidth = Math.max(width - gridSize * 4, gridSize * (columns - 1));
  const usableHeight = Math.max(height - gridSize * 4, gridSize * (rows - 1));
  const stepX = Math.max(
    gridSize,
    Math.floor(usableWidth / (columns - 1) / gridSize) * gridSize,
  );
  const stepY = Math.max(
    gridSize,
    Math.floor(usableHeight / (rows - 1) / gridSize) * gridSize,
  );
  const spanX = stepX * (columns - 1);
  const spanY = stepY * (rows - 1);
  const marginX = Math.round((width - spanX) / 2 / gridSize) * gridSize;
  const marginY = Math.round((height - spanY) / 2 / gridSize) * gridSize;

  const nodes: CircuitNode[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      nodes.push({
        x: marginX + column * stepX,
        y: marginY + row * stepY,
        pulseOffset: (row * columns + column) * 0.17,
      });
    }
  }

  const nodeAt = (column: number, row: number) => nodes[row * columns + column];

  const paths: CircuitPath[] = [
    [nodeAt(0, 1), nodeAt(1, 1), nodeAt(1, 2), nodeAt(2, 2), nodeAt(2, 3), nodeAt(4, 3)],
    [nodeAt(0, 4), nodeAt(1, 4), nodeAt(1, 3), nodeAt(3, 3), nodeAt(3, 1), nodeAt(4, 1)],
    [nodeAt(2, 0), nodeAt(2, 1), nodeAt(3, 1), nodeAt(3, 5)],
    [nodeAt(0, 2), nodeAt(0, 0), nodeAt(4, 0), nodeAt(4, 2)],
    [nodeAt(1, 5), nodeAt(1, 4), nodeAt(2, 4), nodeAt(2, 5), nodeAt(4, 5)],
  ].map((points, index) => ({
    points,
    speed: 0.11 + index * 0.025,
    offset: index * 0.19,
    length: 0,
  }));

  for (const path of paths) {
    let total = 0;
    for (let index = 1; index < path.points.length; index += 1) {
      const previous = path.points[index - 1];
      const current = path.points[index];
      total += Math.hypot(current.x - previous.x, current.y - previous.y);
    }
    path.length = total;
  }

  return { nodes, paths };
};

const drawPath = (ctx: CanvasRenderingContext2D, points: CircuitPath["points"]) => {
  if (points.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let index = 1; index < points.length; index += 1) {
    const current = points[index];
    ctx.lineTo(current.x, current.y);
  }
};

const drawPathUntil = (
  ctx: CanvasRenderingContext2D,
  points: CircuitPath["points"],
  lengthLimit: number,
) => {
  if (points.length < 2) return;

  let remaining = Math.max(lengthLimit, 0);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const segmentLength = Math.hypot(current.x - previous.x, current.y - previous.y);

    if (remaining >= segmentLength) {
      ctx.lineTo(current.x, current.y);
      remaining -= segmentLength;
      continue;
    }

    if (remaining > 0) {
      const progress = remaining / segmentLength;
      const x = previous.x + (current.x - previous.x) * progress;
      const y = previous.y + (current.y - previous.y) * progress;
      ctx.lineTo(x, y);
    }
    break;
  }
};

const getPointAtLength = (
  points: CircuitPath["points"],
  targetLength: number,
) => {
  if (points.length === 0) return null;
  if (targetLength <= 0) return points[0];

  let remaining = targetLength;
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const segmentLength = Math.hypot(current.x - previous.x, current.y - previous.y);

    if (remaining <= segmentLength) {
      const progress = segmentLength === 0 ? 0 : remaining / segmentLength;
      return {
        x: previous.x + (current.x - previous.x) * progress,
        y: previous.y + (current.y - previous.y) * progress,
      };
    }

    remaining -= segmentLength;
  }

  return points[points.length - 1];
};

const drawPathSegment = (
  ctx: CanvasRenderingContext2D,
  points: CircuitPath["points"],
  startLength: number,
  endLength: number,
) => {
  if (points.length < 2 || endLength <= startLength) return;

  const start = getPointAtLength(points, startLength);
  const end = getPointAtLength(points, endLength);
  if (!start || !end) return;

  let travelled = 0;
  let started = false;

  ctx.beginPath();
  ctx.moveTo(start.x, start.y);

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const segmentLength = Math.hypot(current.x - previous.x, current.y - previous.y);
    const segmentStart = travelled;
    const segmentEnd = travelled + segmentLength;

    if (!started) {
      if (startLength <= segmentEnd) {
        started = true;
        if (endLength <= segmentEnd) {
          ctx.lineTo(end.x, end.y);
          break;
        }
        ctx.lineTo(current.x, current.y);
      }
    } else {
      if (endLength <= segmentEnd) {
        ctx.lineTo(end.x, end.y);
        break;
      }
      ctx.lineTo(current.x, current.y);
    }

    travelled = segmentEnd;
    if (segmentEnd < segmentStart) break;
  }
};

const draw = () => {
  if (!canvasRef.value || !stageRef.value) return;

  const canvas = canvasRef.value;
  const stage = stageRef.value;
  const context = canvas.getContext("2d");
  if (!context) return;

  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(stage.clientWidth, 1);
  const height = Math.max(stage.clientHeight, 1);

  if (canvas.width !== Math.floor(width * ratio) || canvas.height !== Math.floor(height * ratio)) {
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }

  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);

  const { r, g, b } = hexToRgbTriplet(accentHex.value);
  const layout = buildLayout(width, height);
  const time = performance.now() * 0.001;

  context.lineCap = "square";
  context.lineJoin = "miter";

  for (const path of layout.paths) {
    drawPath(context, path.points);
    context.strokeStyle = "rgba(237, 237, 237, 0.14)";
    context.lineWidth = 1.2;
    context.stroke();

    const segmentLength = path.length * 0.22;
    const cycleLength = path.length + segmentLength;
    const pixelSpeed = cycleLength * path.speed;
    const pixelOffset = cycleLength * path.offset;
    const travel = reducedMotion ? path.length : (time * pixelSpeed + pixelOffset) % cycleLength;
    const headLength = Math.min(travel, path.length);
    const tailLength = Math.max(travel - segmentLength, 0);

    if (headLength > tailLength) {
      const highlightGradient = context.createLinearGradient(
        path.points[0].x,
        path.points[0].y,
        path.points[path.points.length - 1].x,
        path.points[path.points.length - 1].y,
      );

      highlightGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
      highlightGradient.addColorStop(0.12, `rgba(${r}, ${g}, ${b}, 0.08)`);
      highlightGradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, 0.52)`);
      highlightGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.98)`);

      context.save();
      context.strokeStyle = highlightGradient;
      context.lineWidth = 2.5;
      context.shadowBlur = 16;
      context.shadowColor = `rgba(${r}, ${g}, ${b}, 0.4)`;
      context.globalAlpha = 0.98;
      drawPathSegment(context, path.points, tailLength, headLength);
      context.stroke();
      context.restore();
    }

    if (!reducedMotion && tailLength > 0) {
      context.save();
      context.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.12)`;
      context.lineWidth = 2;
      context.shadowBlur = 10;
      context.shadowColor = `rgba(${r}, ${g}, ${b}, 0.28)`;
      context.globalAlpha = 0.7;
      drawPathSegment(context, path.points, 0, tailLength);
      context.stroke();
      context.restore();
    }
  }

  for (const node of layout.nodes) {
    const pulse = reducedMotion ? 0.82 : 0.72 + Math.sin(time * 2.1 + node.pulseOffset) * 0.28;
    context.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.42 + pulse * 0.34})`;
    context.beginPath();
    context.arc(node.x, node.y, 2.1 + pulse * 1.25, 0, Math.PI * 2);
    context.fill();

    context.strokeStyle = `rgba(237, 237, 237, ${0.18 + pulse * 0.22})`;
    context.lineWidth = 1;
    context.beginPath();
    context.arc(node.x, node.y, 6 + pulse * 3.6, 0, Math.PI * 2);
    context.stroke();
  }

  if (!reducedMotion) {
    rafId = window.requestAnimationFrame(draw);
  }
};

onMounted(() => {
  if (!stageRef.value || typeof window === "undefined") return;

  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  resizeObserver = new ResizeObserver(() => {
    if (reducedMotion) {
      draw();
      return;
    }
    window.cancelAnimationFrame(rafId);
    rafId = window.requestAnimationFrame(draw);
  });
  resizeObserver.observe(stageRef.value);

  draw();
});

watch(accentHex, () => {
  if (typeof window === "undefined") return;
  if (reducedMotion) {
    draw();
    return;
  }
  window.cancelAnimationFrame(rafId);
  rafId = window.requestAnimationFrame(draw);
});

onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.cancelAnimationFrame(rafId);
  }
  resizeObserver?.disconnect();
});
</script>

<style scoped>
.circuit-stage {
  position: relative;
  min-height: 22rem;
  overflow: hidden;
  border: 1px solid rgb(51 51 51 / 0.85);
  background:
    radial-gradient(circle at 50% 50%, rgb(var(--accent-rgb) / 0.06), transparent 42%),
    linear-gradient(180deg, rgb(10 10 10 / 0.98), rgb(5 5 5 / 0.98));
  isolation: isolate;
}

.circuit-canvas,
.circuit-grid,
.circuit-vignette,
.circuit-scan {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.circuit-canvas {
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
}

.circuit-grid {
  z-index: 2;
  background:
    linear-gradient(90deg, rgb(237 237 237 / 0.03) 1px, transparent 1px),
    linear-gradient(rgb(237 237 237 / 0.03) 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.32;
}

.circuit-vignette {
  z-index: 3;
  background:
    radial-gradient(circle at 50% 50%, transparent 24%, rgb(5 5 5 / 0.08) 58%, rgb(5 5 5 / 0.46) 100%),
    linear-gradient(90deg, rgb(5 5 5 / 0.34) 0%, transparent 16%, transparent 84%, rgb(5 5 5 / 0.34) 100%);
}

@media (max-width: 767px) {
  .circuit-stage {
    display: none;
  }

  .circuit-grid {
    background-size: 18px 18px;
  }
}
</style>
