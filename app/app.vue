<template>
  <div
    class="min-h-screen bg-background text-primary selection:bg-accent selection:text-background flex flex-col relative overflow-hidden"
  >
    <Transition name="boot-loader">
      <div
        v-if="isLoaderVisible"
        class="fixed inset-0 z-[120] flex items-end bg-background px-5 pb-6 pt-28 md:px-12 md:pb-10"
      >
        <div class="mx-auto grid w-full max-w-[1920px] grid-cols-12 gap-4 border-x border-border">
          <div class="col-span-12 md:col-span-8">
            <p class="font-mono text-[10px] uppercase tracking-[0.32em] text-secondary md:text-xs">
              {{ t("app.loaderTitle") }}
            </p>
            <p class="mt-4 text-[22vw] font-black uppercase leading-[0.78] tracking-[-0.09em] text-primary md:text-[12vw]">
              {{ String(progress).padStart(2, "0") }}
            </p>
          </div>
          <div class="col-span-12 md:col-span-4 md:self-end">
            <div class="border border-border">
              <div class="flex items-center justify-between border-b border-border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-secondary">
                <span>{{ t("app.loading") }}</span>
                <span>{{ loadedAssets }}/{{ totalAssets || 0 }}</span>
              </div>
              <div class="px-4 py-5">
                <div class="boot-progress-track">
                  <div class="boot-progress-fill" :style="{ width: `${progress}%` }" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="boot-loader">
      <div
        v-if="showLanguagePrompt && !isLoaderVisible"
        class="fixed left-0 top-20 z-[130] w-full px-5 md:top-24 md:px-12"
      >
        <div class="mx-auto grid w-full max-w-[1920px] grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-7 md:col-start-6">
            <div class="border border-border bg-background shadow-[0_20px_50px_rgb(0_0_0_/_0.35)]">
              <div class="border-b border-border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-secondary">
                {{ languagePrompt.eyebrow }}
              </div>
              <div class="px-4 py-5 md:px-6 md:py-5">
                <h2 class="text-2xl font-black uppercase leading-none tracking-[-0.06em] text-primary md:text-4xl">
                  {{ languagePrompt.title }}
                </h2>
                <p class="mt-3 max-w-2xl text-sm leading-relaxed text-primary/86 md:text-base">
                  {{ languagePrompt.body }}
                </p>
                <div class="mt-5 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.22em]">
                  <button class="blueprint-button blueprint-button-accent" type="button" @click="chooseLocale('es')">
                    {{ languagePrompt.confirm }}
                  </button>
                  <button class="blueprint-button" type="button" @click="chooseLocale('en')">
                    {{ languagePrompt.dismiss }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Custom Brutalist Cursor -->
    <div
      ref="cursorDot"
      class="custom-cursor absolute top-0 left-0 h-2.5 w-2.5 rounded-full bg-accent pointer-events-none z-[140] hidden md:block will-change-transform"
      :class="{
        'custom-cursor-pointer': isCursorPointerMode,
        'custom-cursor-text-mode': isCursorTextMode,
      }"
      style="transform: translate(-50%, -50%)"
    >
      <span class="custom-cursor-dot" aria-hidden="true" />
      <span class="custom-cursor-text" aria-hidden="true" />
      <span class="custom-cursor-cross" aria-hidden="true">
        <span class="custom-cursor-line custom-cursor-line-a" />
        <span class="custom-cursor-line custom-cursor-line-b" />
      </span>
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
        <div class="flex items-center gap-4 md:gap-8">
          <nav class="font-mono text-base uppercase tracking-[0.24em] hidden md:flex gap-12">
            <a href="#work" class="hover:text-accent transition-colors">{{ t("app.nav.work") }}</a>
            <a href="#security" class="hover:text-accent transition-colors"
              >{{ t("app.nav.security") }}</a
            >
            <a href="#contact" class="hover:text-accent transition-colors"
              >{{ t("app.nav.contact") }}</a
            >
          </nav>
          <div class="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] md:text-xs">
            <span class="hidden text-secondary md:inline">{{ t("app.languageSwitcher.label") }}</span>
            <button
              class="language-switcher-button"
              :class="{ 'language-switcher-button-active': locale === 'en' }"
              type="button"
              :aria-pressed="locale === 'en'"
              @click="chooseLocale('en')"
            >
              {{ t("app.languageSwitcher.english") }}
            </button>
            <button
              class="language-switcher-button"
              :class="{ 'language-switcher-button-active': locale === 'es' }"
              type="button"
              :aria-pressed="locale === 'es'"
              @click="chooseLocale('es')"
            >
              {{ t("app.languageSwitcher.spanish") }}
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Rendering -->
    <main class="flex-grow">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import Lenis from "lenis";
import { useSiteLoader } from "~/composables/useSiteLoader";
import { useAccentTheme } from "~/composables/useAccentTheme";

const cursorDot = ref<HTMLElement | null>(null);
const isCursorPointerMode = ref(false);
const isCursorTextMode = ref(false);
let lenis: Lenis;
let removeCursorListeners: (() => void) | null = null;
let lenisTickerCallback: ((time: number) => void) | null = null;
let loaderDismissTimeout = 0;
let heroIntroTimeout = 0;
let gsapModule: typeof import("gsap")["default"] | null = null;
let scrollTriggerModule: typeof import("gsap/ScrollTrigger")["default"] | null = null;
const LOCALE_PREFERENCE_KEY = "rk-locale-preference";
const { t, locale, setLocale } = useI18n();
const showLanguagePrompt = ref(false);
const shouldSuggestSpanish = ref(false);
const languagePrompt = {
  eyebrow: "[ Sugerencia de idioma ]",
  title: "¿Cambiar a español?",
  body: "Tu navegador está configurado en español. Puedes mantener el sitio en inglés o cambiar la interfaz a español ahora.",
  confirm: "Usar español",
  dismiss: "Mantener inglés",
} as const;
useHead(() => ({
  htmlAttrs: {
    lang: locale.value,
  },
}));

const {
  isComplete,
  isLoaderVisible,
  isExperienceReady,
  isHeroIntroReady,
  loadedAssets,
  progress,
  totalAssets,
} = useSiteLoader();
useAccentTheme();

const ensureGsap = async () => {
  if (gsapModule && scrollTriggerModule) return;

  const [{ default: gsapLib }, { default: scrollTriggerLib }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);

  gsapLib.registerPlugin(scrollTriggerLib);
  gsapModule = gsapLib;
  scrollTriggerModule = scrollTriggerLib;
};

const browserPrefersSpanish = () => {
  if (typeof window === "undefined") return false;
  const languages = Array.isArray(window.navigator.languages) && window.navigator.languages.length > 0
    ? window.navigator.languages
    : [window.navigator.language];
  return languages.some((language) => language?.toLowerCase().startsWith("es"));
};

const chooseLocale = async (nextLocale: "en" | "es") => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LOCALE_PREFERENCE_KEY, nextLocale);
  }
  showLanguagePrompt.value = false;
  shouldSuggestSpanish.value = false;
  await setLocale(nextLocale);
};

onMounted(async () => {
  if (typeof window !== "undefined") {
    const savedLocale = window.localStorage.getItem(LOCALE_PREFERENCE_KEY);
    if (savedLocale === "en" || savedLocale === "es") {
      if (savedLocale !== locale.value) {
        await setLocale(savedLocale);
      }
    } else {
      shouldSuggestSpanish.value = browserPrefersSpanish() && locale.value === "en";
    }
  }

  await ensureGsap();
  if (!gsapModule) return;

  // 2. Initialize Lenis (Smooth Scroll)
  lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
  });
  lenis.stop();
  (window as Window & { __rkLenis?: Lenis }).__rkLenis = lenis;

  // Sync GSAP with Lenis
  lenis.on("scroll", () => {
    scrollTriggerModule?.update();
  });
  lenisTickerCallback = (time) => {
    lenis.raf(time * 1000);
  };
  gsapModule.ticker.add(lenisTickerCallback);
  gsapModule.ticker.lagSmoothing(0);

  // 3. Custom Cursor Logic (GSAP for smoothness)
  if (window.matchMedia("(pointer: fine)").matches) {
    const setCursorLeft = gsapModule.quickSetter(cursorDot.value, "left", "px");
    const setCursorTop = gsapModule.quickSetter(cursorDot.value, "top", "px");
    const setCursorOpacity = gsapModule.quickSetter(cursorDot.value, "opacity");
    let cursorVisible = false;
    const interactiveSelector = "a[href], button, [role='button'], summary, select, option";
    const textSelector = [
      "input",
      "textarea",
      "[contenteditable='true']",
      "[role='textbox']",
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "li",
      "label",
      "span",
      "small",
      "strong",
      "em",
      "blockquote",
      "figcaption",
      "code",
      "pre",
      "td",
      "th",
      "dt",
      "dd",
    ].join(", ");
    const updateCursorMode = (x: number, y: number) => {
      const target = document.elementFromPoint(x, y) as HTMLElement | null;
      const isInteractiveTarget = Boolean(target?.closest(interactiveSelector));
      const textTarget = !isInteractiveTarget && Boolean(target?.closest(textSelector));
      isCursorTextMode.value = textTarget;
      isCursorPointerMode.value = isInteractiveTarget && !textTarget;
    };

    const syncCursorPosition = (clientX: number, clientY: number) => {
      setCursorLeft(clientX + window.scrollX);
      setCursorTop(clientY + window.scrollY);
    };

    const onMouseMove = (e: MouseEvent) => {
      (window as Window & { __rkPointer?: { x: number; y: number } }).__rkPointer = {
        x: e.clientX,
        y: e.clientY,
      };
      syncCursorPosition(e.clientX, e.clientY);
      if (!cursorVisible) {
        setCursorOpacity(1);
        cursorVisible = true;
      }
      updateCursorMode(e.clientX, e.clientY);
    };

    const onScroll = () => {
      const pointer = (window as Window & { __rkPointer?: { x: number; y: number } }).__rkPointer;
      if (!pointer) return;
      syncCursorPosition(pointer.x, pointer.y);
      updateCursorMode(pointer.x, pointer.y);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    lenis.on("scroll", onScroll);

    removeCursorListeners = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
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

  watch(
    isComplete,
    (complete) => {
      if (!complete || !isLoaderVisible.value || isExperienceReady.value) return;
      const scheduleReveal = () => {
        loaderDismissTimeout = window.setTimeout(() => {
          isLoaderVisible.value = false;
          window.setTimeout(() => {
            isExperienceReady.value = true;
            lenis.start();
            scrollTriggerModule?.refresh();
            heroIntroTimeout = window.setTimeout(() => {
              isHeroIntroReady.value = true;
            }, 180);
          }, 420);
        }, 520);
      };

      if ("requestIdleCallback" in window) {
        (window as Window & {
          requestIdleCallback: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
        }).requestIdleCallback(() => {
          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(scheduleReveal);
          });
        }, { timeout: 900 });
        return;
      }

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(scheduleReveal);
      });
    },
    { immediate: true },
  );

  watch(
    isLoaderVisible,
    (visible) => {
      if (visible || !shouldSuggestSpanish.value || showLanguagePrompt.value) return;
      window.setTimeout(() => {
        if (isLoaderVisible.value || !shouldSuggestSpanish.value) return;
        showLanguagePrompt.value = true;
      }, 160);
    },
    { immediate: true },
  );
});

onUnmounted(() => {
      window.clearTimeout(loaderDismissTimeout);
      window.clearTimeout(heroIntroTimeout);
      isCursorPointerMode.value = false;
      isCursorTextMode.value = false;
      removeCursorListeners?.();
  removeCursorListeners = null;
  if (lenis) {
    lenis.destroy();
    delete (window as Window & { __rkLenis?: Lenis }).__rkLenis;
  }
  if (lenisTickerCallback) {
    gsapModule?.ticker.remove(lenisTickerCallback);
    lenisTickerCallback = null;
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

.custom-cursor {
  border-radius: 9999px;
  box-shadow: 0 0 18px rgb(var(--accent-rgb) / 0.55);
}

.boot-progress-track {
  position: relative;
  height: 3rem;
  border: 1px solid #333333;
  background:
    linear-gradient(90deg, rgb(237 237 237 / 0.04) 1px, transparent 1px),
    #050505;
  background-size: 20px 100%;
  overflow: hidden;
}

.boot-progress-fill {
  height: 100%;
  background:
    repeating-linear-gradient(
      90deg,
      rgb(var(--accent-rgb)) 0,
      rgb(var(--accent-rgb)) 22px,
      #050505 22px,
      #050505 24px
    );
  transition: width 220ms ease;
}

.boot-loader-enter-active,
.boot-loader-leave-active {
  transition: opacity 420ms ease, transform 420ms ease;
}

.boot-loader-enter-from,
.boot-loader-leave-to {
  opacity: 0;
  transform: translateY(3%);
}

.language-switcher-button {
  min-height: 2.25rem;
  border: 1px solid #333333;
  padding: 0.5rem 0.75rem;
  color: #9a9a9a;
  transition:
    border-color 220ms ease,
    color 220ms ease,
    background-color 220ms ease;
}

.language-switcher-button:hover,
.language-switcher-button:focus-visible {
  border-color: rgb(var(--accent-rgb));
  color: #ededed;
}

.language-switcher-button-active {
  border-color: rgb(var(--accent-rgb));
  background: rgb(var(--accent-rgb));
  color: #050505;
}

.language-switcher-button-active:hover,
.language-switcher-button-active:focus-visible,
.filter-button-active:hover,
.filter-button-active:focus-visible {
  color: #050505;
}
</style>
