import { computed } from "vue";

export const useSiteLoader = () => {
  const totalAssets = useState("site-loader-total-assets", () => 0);
  const loadedAssets = useState("site-loader-loaded-assets", () => 0);
  const isLoaderVisible = useState("site-loader-visible", () => true);
  const isExperienceReady = useState("site-loader-ready", () => false);
  const isHeroIntroReady = useState("site-loader-hero-intro-ready", () => false);

  const registerAssets = (count = 1) => {
    totalAssets.value += count;
  };

  const markAssetsLoaded = (count = 1) => {
    loadedAssets.value = Math.min(loadedAssets.value + count, totalAssets.value);
  };

  const progress = computed(() => {
    if (totalAssets.value <= 0) return 0;
    return Math.round((loadedAssets.value / totalAssets.value) * 100);
  });

  const isComplete = computed(() => totalAssets.value > 0 && loadedAssets.value >= totalAssets.value);

  return {
    totalAssets,
    loadedAssets,
    isLoaderVisible,
    isExperienceReady,
    isHeroIntroReady,
    isComplete,
    progress,
    registerAssets,
    markAssetsLoaded,
  };
};
