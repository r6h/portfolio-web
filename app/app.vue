<template>
  <div
    class="min-h-screen bg-background text-primary selection:bg-accent selection:text-background flex flex-col relative overflow-hidden"
  >
    <!-- Custom Brutalist Cursor -->
    <div
      ref="cursorDot"
      class="custom-cursor fixed top-0 left-0 h-3 w-3 border border-accent bg-background opacity-0 pointer-events-none z-[100] mix-blend-difference hidden md:flex items-center justify-center text-[10px] font-mono text-accent font-bold transition-[width,height,background-color,border-color] duration-300 ease-out will-change-transform"
      style="transform: translate(-50%, -50%)"
    >
      <span ref="cursorText" class="opacity-0 transition-opacity duration-300"
        >VIEW</span
      >
    </div>

    <!-- Sticky Header -->
    <header
      class="fixed top-0 left-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md transition-transform duration-300"
      id="main-header"
    >
      <div
        class="max-w-[1920px] mx-auto px-6 py-4 flex justify-between items-center border-x border-border md:mx-12"
      >
        <div class="font-sans font-bold text-2xl tracking-tighter">RK</div>
        <nav class="font-mono text-base uppercase tracking-[0.24em] hidden md:flex gap-12">
          <a href="#work" class="hover:text-accent transition-colors">[Work]</a>
          <a href="#security" class="hover:text-accent transition-colors"
            >[Security]</a
          >
          <a href="#contact" class="hover:text-accent transition-colors"
            >[Contact]</a
          >
        </nav>
      </div>
    </header>

    <!-- Main Content Rendering -->
    <main class="flex-grow">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const cursorDot = ref<HTMLElement | null>(null);
const cursorText = ref<HTMLElement | null>(null);
let lenis: Lenis;

onMounted(() => {
  // 1. Initialize GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);

  // 2. Initialize Lenis (Smooth Scroll)
  lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
  });

  // Sync GSAP with Lenis
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // 3. Custom Cursor Logic (GSAP for smoothness)
  if (window.matchMedia("(pointer: fine)").matches) {
    const setCursorX = gsap.quickSetter(cursorDot.value, "x", "px");
    const setCursorY = gsap.quickSetter(cursorDot.value, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      (window as Window & { __rkPointer?: { x: number; y: number } }).__rkPointer = {
        x: e.clientX,
        y: e.clientY,
      };
      setCursorX(e.clientX);
      setCursorY(e.clientY);
      gsap.to(cursorDot.value, { opacity: 1, duration: 0.12 });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Example logic to trigger cursor states (will be expanded in components)
    // Expose this via provide/inject or a composable later
    window.addEventListener("mouseover", (e) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button"
      ) {
        gsap.to(cursorDot.value, { width: 40, height: 40, duration: 0.3 });
      }
    });

    window.addEventListener("mouseout", (e) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button"
      ) {
        gsap.to(cursorDot.value, { width: 8, height: 8, duration: 0.3 });
      }
    });

    onUnmounted(() => {
      window.removeEventListener("mousemove", onMouseMove);
    });
  }

  // 4. Header Show/Hide on Scroll Direction
  let lastScrollY = window.scrollY;
  const header = document.getElementById("main-header");

  lenis.on("scroll", (e: any) => {
    if (!header) return;
    const currentScrollY = e.animatedScroll;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }
    lastScrollY = currentScrollY;
  });
});

onUnmounted(() => {
  if (lenis) {
    lenis.destroy();
    gsap.ticker.remove(lenis.raf);
  }
});
</script>

<style>
/* Prevent horizontal scrolling issues on mobile */
html,
body {
  overflow-x: hidden;
}

@media (pointer: coarse) {
  .custom-cursor {
    display: none !important;
  }
}
</style>
