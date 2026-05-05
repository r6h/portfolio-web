import { computed } from "vue";
import { ACCENT_HEX_VAR, ACCENT_RGB_VAR, DEFAULT_ACCENT_HEX, hexToRgbChannels, hexToRgba, normalizeHexColor } from "~/utils/theme";

const ACCENT_STATE_KEY = "theme-accent-hex";
let accentObserverStarted = false;

export const useAccentTheme = () => {
  const accentHex = useState(ACCENT_STATE_KEY, () => DEFAULT_ACCENT_HEX);

  const syncAccentFromDom = () => {
    if (typeof window === "undefined") return;
    const rawHex = window.getComputedStyle(document.documentElement).getPropertyValue(ACCENT_HEX_VAR);
    const normalizedHex = normalizeHexColor(rawHex);
    accentHex.value = normalizedHex;

    const derivedRgb = hexToRgbChannels(normalizedHex);
    const rootStyle = document.documentElement.style;
    if (rootStyle.getPropertyValue(ACCENT_RGB_VAR).trim() !== derivedRgb) {
      rootStyle.setProperty(ACCENT_RGB_VAR, derivedRgb);
    }
  };

  if (process.client && !accentObserverStarted) {
    accentObserverStarted = true;
    syncAccentFromDom();

    const observer = new MutationObserver(syncAccentFromDom);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    window.addEventListener("focus", syncAccentFromDom);
    window.addEventListener("pageshow", syncAccentFromDom);
  }

  return {
    accentHex,
    accentCss: computed(() => normalizeHexColor(accentHex.value)),
    accentRgba: (alpha: number | string) => hexToRgba(accentHex.value, alpha),
    syncAccentFromDom,
  };
};
