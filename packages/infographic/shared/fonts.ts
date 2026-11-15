// Bundled stand-ins for the library's five CDN fonts, so no render fetches
//
// The library registers five Chinese web fonts at assets.antv.antgroup.com, and every render
// appends a <link> for each registered font to <head>. Here each built-in family name is
// re-registered with no URLs (so no <link>), and a FontFace of the same family name is added to
// document.fonts from a bundled Latin font that plays the same role:
//   Alibaba PuHuiTi, Source Han Sans → Inter (sans) · Source Han Serif → Lora (serif)
//   LXGW WenKai → Kalam (brush) · 851tegakizatsu, the hand-drawn theme's font → Caveat
import { registerFont } from '@antv/infographic';
import inter from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
import lora400 from '@fontsource/lora/files/lora-latin-400-normal.woff2?url';
import lora700 from '@fontsource/lora/files/lora-latin-700-normal.woff2?url';
import kalam400 from '@fontsource/kalam/files/kalam-latin-400-normal.woff2?url';
import kalam700 from '@fontsource/kalam/files/kalam-latin-700-normal.woff2?url';
import caveat400 from '@fontsource/caveat/files/caveat-latin-400-normal.woff2?url';
import caveat700 from '@fontsource/caveat/files/caveat-latin-700-normal.woff2?url';

interface Face {
  url: string;
  /** CSS font-weight descriptor: '400', '700' or a range for a variable font. */
  weight: string;
}

/** Bundled faces for each family name, keyed by the name an SVG asks for. */
const STAND_INS: Record<string, Face[]> = {
  'Alibaba PuHuiTi': [{ url: inter, weight: '100 900' }],
  'Source Han Sans': [{ url: inter, weight: '100 900' }],
  'Source Han Serif': [
    { url: lora400, weight: '400' },
    { url: lora700, weight: '700' },
  ],
  'LXGW WenKai': [
    { url: kalam400, weight: '400' },
    { url: kalam700, weight: '700' },
  ],
  '851tegakizatsu': [
    { url: caveat400, weight: '400' },
    { url: caveat700, weight: '700' },
  ],
};

/** Families the gallery can draw with, for font pickers. */
export const LOCAL_FONTS = Object.keys(STAND_INS);

const absolute = (url: string): string => new URL(url, document.baseURI).href;

/**
 * A stylesheet URL (a blob: URL, so nothing leaves the page) declaring `family` from bundled
 * files: the shape registerFont's `fontWeight` values expect, a CSS file of @font-face rules.
 */
export function fontCssUrl(family: string, faces: readonly Face[]): string {
  const css = faces
    .map(
      (f) =>
        `@font-face{font-family:'${family}';src:url('${absolute(f.url)}') format('woff2');font-weight:${f.weight};font-display:block}`,
    )
    .join('\n');
  return URL.createObjectURL(new Blob([css], { type: 'text/css' }));
}

/** Bundled faces other examples may register under their own family names. */
export const FACES = {
  sans: STAND_INS['Alibaba PuHuiTi'] as Face[],
  serif: STAND_INS['Source Han Serif'] as Face[],
  brush: STAND_INS['LXGW WenKai'] as Face[],
  hand: STAND_INS['851tegakizatsu'] as Face[],
};

let ready: Promise<void> | null = null;

/** Swaps the CDN fonts for the stand-ins once per page and waits until they can measure text. */
export function installLocalFonts(): Promise<void> {
  ready ??= (async () => {
    const loads: Promise<FontFace>[] = [];
    for (const [family, faces] of Object.entries(STAND_INS)) {
      // Same family name, no URLs: getFontURLs() finds nothing, so no <link> is added.
      registerFont({ fontFamily: family, name: family, baseUrl: '', fontWeight: {} });
      for (const f of faces) {
        const face = new FontFace(family, `url('${absolute(f.url)}') format('woff2')`, { weight: f.weight });
        document.fonts.add(face);
        loads.push(face.load());
      }
    }
    // Text is measured once, at render: a font still loading would be measured as the fallback.
    await Promise.all(loads);
  })();
  return ready;
}
