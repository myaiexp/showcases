// Offline stand-ins for A-Frame's nine CDN text fonts, as blob: URLs.
import inter from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
import { buildAtlas, type FaceSpec } from './atlas.ts';
import { bmfontJson, bmfontText } from './sdf.ts';

const INTER = 'aframe-inter';
const sans = (weight: number): FaceSpec => ({ family: INTER, weight });
const mono: FaceSpec = { family: 'monospace', weight: 400 };

/** Atlases to render. Fonts that look the same share one; Roboto (the only msdf font) reuses the regular one. */
const FACES: Record<string, FaceSpec> = {
  regular: sans(400),
  semibold: sans(600),
  bold: sans(700),
  mono,
};

interface FontFile {
  /** Name under fonts/, without extension. */
  name: string;
  face: keyof typeof FACES;
  json?: boolean;
}

/** The nine fonts of text.js `FONTS`, in the file names it asks for. The .png sits beside each. */
const FILES: FontFile[] = [
  { name: 'Roboto-msdf', face: 'regular', json: true },
  { name: 'DejaVu-sdf', face: 'regular' },
  { name: 'KelsonSans', face: 'regular' },
  { name: 'mozillavr', face: 'regular' },
  { name: 'Aileron-Semibold', face: 'semibold' },
  { name: 'Exo2SemiBold', face: 'semibold' },
  { name: 'Exo2Bold', face: 'bold' },
  { name: 'Monoid', face: 'mono' },
  { name: 'SourceCodePro', face: 'mono' },
];

/** text.js adds this to every yoffset of a font URL containing /Roboto-msdf.json; the file is written without it. */
const ROBOTO_Y_HACK = 30;

let cached: Promise<ReadonlyMap<string, string>> | undefined;

async function build(): Promise<ReadonlyMap<string, string>> {
  const face = new FontFace(INTER, `url(${inter})`, { weight: '100 900' });
  document.fonts.add(await face.load());
  const atlases = new Map(await Promise.all(Object.entries(FACES).map(async ([key, f]) =>
    [key, await buildAtlas(f, key === 'regular')] as const)));

  const blobs = new Map<string, string>();
  const pngUrls = new Map<string, string>();
  const blobUrl = (data: BlobPart, type: string) => URL.createObjectURL(new Blob([data], { type }));
  for (const file of FILES) {
    const atlas = atlases.get(file.face)!;
    const { font } = atlas;
    const png = file.json ? atlas.pngMsdf! : atlas.png;
    const page = `${file.name}.png`;
    const key = `${file.face}${file.json ? '/msdf' : ''}`;
    let pngUrl = pngUrls.get(key);
    if (!pngUrl) pngUrls.set(key, (pngUrl = URL.createObjectURL(png)));
    blobs.set(`fonts/${page}`, pngUrl);
    blobs.set(file.json ? `fonts/${file.name}.json` : `fonts/${file.name}.fnt`, file.json
      ? blobUrl(bmfontJson(font, page, -ROBOTO_Y_HACK), 'application/json')
      : blobUrl(bmfontText(font, page), 'text/plain'));
  }
  return blobs;
}

/** Paths relative to the CDN root ('fonts/Roboto-msdf.json', 'fonts/Roboto-msdf.png', 'fonts/DejaVu-sdf.fnt', …) to blob: URLs. Built once per page, cached. */
export function cdnFonts(): Promise<ReadonlyMap<string, string>> {
  cached ??= build().catch((e) => { cached = undefined; throw e; });
  return cached;
}
