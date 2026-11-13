// Shortens file paths to a width by keeping the start and the end around '…', measured with measureNaturalWidth
import '@fontsource-variable/inter';
import { measureNaturalWidth, prepare } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import { PATHS } from './data.ts';
import './style.css';

const FONT = '14px "Inter Variable"';
const ELLIPSIS = '…';
const graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

// Every candidate string is a fresh prepare(); remember widths so a slider drag stays cheap.
const widthCache = new Map<string, number>();
function widthOf(text: string): number {
  let w = widthCache.get(text);
  if (w === undefined) {
    w = measureNaturalWidth(prepare(text, FONT));
    widthCache.set(text, w);
  }
  return w;
}

// Largest number of kept graphemes whose head + '…' + tail fits; the tail (file name) gets the bigger share.
function truncateMiddle(path: string, maxWidth: number): string {
  if (widthOf(path) <= maxWidth) return path;
  const chars = Array.from(graphemes.segment(path), (s) => s.segment);
  const build = (keep: number): string => {
    const tail = Math.ceil(keep * 0.6);
    const head = keep - tail;
    return chars.slice(0, head).join('') + ELLIPSIS + chars.slice(chars.length - tail).join('');
  };
  let lo = 0;
  let hi = chars.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (widthOf(build(mid)) <= maxWidth) lo = mid;
    else hi = mid - 1;
  }
  return build(lo);
}

const mount: Mount = async (el, { preview, signal }) => {
  await document.fonts.load(FONT, PATHS.join('') + ELLIPSIS);
  if (signal.aborted) return () => {};

  const list = document.createElement('div');
  list.className = 'list';
  list.style.font = FONT;
  const rows = (preview ? PATHS.slice(0, 6) : PATHS).map((path) => {
    const row = document.createElement('div');
    row.className = 'row';
    const text = document.createElement('span');
    row.append(text);
    list.append(row);
    return { path, row, text };
  });
  const readout = document.createElement('p');
  readout.className = 'readout';

  const render = (width: number): void => {
    let cut = 0;
    for (const r of rows) {
      const shown = truncateMiddle(r.path, width);
      if (shown !== r.path) cut++;
      r.text.textContent = shown;
      r.row.style.width = `${width}px`;
    }
    readout.textContent = `width ${width}px: ${cut} of ${rows.length} paths shortened`;
  };

  if (preview) {
    el.append(list);
    let raf = 0;
    const tick = (t: number): void => {
      render(Math.round(110 + 130 * (0.5 + 0.5 * Math.sin(t / 1300))));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '80';
  slider.max = '520';
  slider.value = '260';
  const label = document.createElement('label');
  label.className = 'controls';
  label.append('Width ', slider);
  el.append(label, readout, list);
  const onInput = (): void => render(Number(slider.value));
  slider.addEventListener('input', onInput);
  onInput();
  return () => slider.removeEventListener('input', onInput);
};

export default mount;
