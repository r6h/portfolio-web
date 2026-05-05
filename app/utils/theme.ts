export const ACCENT_HEX_VAR = "--accent-hex";
export const ACCENT_RGB_VAR = "--accent-rgb";
export const DEFAULT_ACCENT_HEX = "#ccff00";

export const normalizeHexColor = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed) return DEFAULT_ACCENT_HEX;
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) return trimmed.toLowerCase();
  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    const [r, g, b] = trimmed.slice(1).split("");
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }

  return DEFAULT_ACCENT_HEX;
};

export const hexToRgbTriplet = (value: string) => {
  const normalized = normalizeHexColor(value).slice(1);
  const number = Number.parseInt(normalized, 16);

  return {
    r: (number >> 16) & 255,
    g: (number >> 8) & 255,
    b: number & 255,
  };
};

export const hexToRgbChannels = (value: string) => {
  const { r, g, b } = hexToRgbTriplet(value);
  return `${r} ${g} ${b}`;
};

export const hexToRgba = (value: string, alpha: number | string) => {
  const { r, g, b } = hexToRgbTriplet(value);
  return `rgba(${r},${g},${b},${alpha})`;
};
