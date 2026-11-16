// Bundled fonts for text examples: loaded into document.fonts once, never from a CDN
import inter from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
import lora400 from '@fontsource/lora/files/lora-latin-400-normal.woff2?url';
import lora700 from '@fontsource/lora/files/lora-latin-700-normal.woff2?url';
import lora400i from '@fontsource/lora/files/lora-latin-400-italic.woff2?url';
import kalam400 from '@fontsource/kalam/files/kalam-latin-400-normal.woff2?url';
import kalam700 from '@fontsource/kalam/files/kalam-latin-700-normal.woff2?url';
import caveat400 from '@fontsource/caveat/files/caveat-latin-400-normal.woff2?url';
import caveat700 from '@fontsource/caveat/files/caveat-latin-700-normal.woff2?url';

interface Face {
  url: string;
  weight: string;
  style?: 'normal' | 'italic';
}

/** Family names text examples may use in `fontFamily`. All load from files in the bundle. */
export const FONTS = {
  Inter: [{ url: inter, weight: '100 900' }],
  Lora: [
    { url: lora400, weight: '400' },
    { url: lora700, weight: '700' },
    { url: lora400i, weight: '400', style: 'italic' },
  ],
  Kalam: [
    { url: kalam400, weight: '400' },
    { url: kalam700, weight: '700' },
  ],
  Caveat: [
    { url: caveat400, weight: '400' },
    { url: caveat700, weight: '700' },
  ],
} satisfies Record<string, Face[]>;

export type FontName = keyof typeof FONTS;

let loading: Promise<void> | null = null;

/**
 * Adds every bundled face to document.fonts and resolves once all have loaded. Fabric measures
 * text when it is created and caches glyph widths per family, so await this before creating text
 * in a bundled font (or call `cache.clearFontCache(family)` and `initDimensions()` afterwards).
 */
export function loadFonts(): Promise<void> {
  loading ??= Promise.all(
    Object.entries(FONTS).flatMap(([family, faces]) =>
      (faces as Face[]).map(async (f) => {
        const face = new FontFace(family, `url(${f.url})`, { weight: f.weight, style: f.style ?? 'normal' });
        document.fonts.add(await face.load());
      }),
    ),
  ).then(() => undefined);
  return loading;
}
