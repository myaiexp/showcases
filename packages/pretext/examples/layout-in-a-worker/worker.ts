// Worker: setLocale(), load a font into the worker's own FontFaceSet, prepare once, lay out per width
import { layout, prepare, setLocale } from '@chenglou/pretext';
import type { PreparedText } from '@chenglou/pretext';
import type { FromWorker, ToWorker } from './data.ts';
import { FONT_SIZE, LINE_HEIGHT } from './data.ts';

// A worker has no `document`, but Chrome gives it `self.fonts` (a FontFaceSet) and OffscreenCanvas.
// The page's "Inter Variable" face is not visible here, so we fetch the same woff2 and add it as a
// FontFace (built from an ArrayBuffer) under a worker-only family name; checked in Chrome: the heights
// then match the page's DOM. Scripts the face lacks (CJK, Arabic) fall back to system fonts, which
// the worker's canvas also uses.
const scope = self as unknown as { fonts: FontFaceSet };
const post = (m: FromWorker): void => self.postMessage(m);
const FAMILY = 'Worker Inter';
const FONT = `${FONT_SIZE}px "${FAMILY}"`;
let prepared: PreparedText[] = [];

async function init(msg: Extract<ToWorker, { type: 'init' }>): Promise<void> {
  const buffer = await (await fetch(msg.fontUrl)).arrayBuffer();
  const face = new FontFace(FAMILY, buffer, { weight: '100 900' });
  await face.load();
  scope.fonts.add(face);
  await scope.fonts.load(FONT, msg.texts.join(''));
  // setLocale() takes the page's document.documentElement.lang (a worker has none) and also
  // clears the caches, so it goes after the font is in and right before prepare().
  setLocale(msg.lang);
  prepared = msg.texts.map(t => prepare(t, FONT));
  post({ type: 'ready', lang: msg.lang, fontSource: `FontFace(ArrayBuffer) in self.fonts, ${scope.fonts.size} face(s)` });
}

self.onmessage = (e: MessageEvent<ToWorker>): void => {
  const msg = e.data;
  if (msg.type === 'init') {
    init(msg).catch((err: unknown) => post({ type: 'error', message: String(err) }));
    return;
  }
  const t0 = performance.now();
  const results = prepared.map(p => layout(p, msg.width, LINE_HEIGHT));
  post({
    type: 'heights',
    id: msg.id,
    heights: results.map(r => r.height),
    lineCounts: results.map(r => r.lineCount),
    micros: Math.round((performance.now() - t0) * 1000),
  });
};
