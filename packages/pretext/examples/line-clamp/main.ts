// Clamps a paragraph to N lines with an ellipsis: N-1 lines from layoutNextLine, then the longest prefix that fits with '…'
import '@fontsource-variable/inter';
import {
  layoutNextLine,
  measureNaturalWidth,
  prepare,
  prepareWithSegments,
  type LayoutCursor,
  type PreparedTextWithSegments,
} from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import { TEXT } from './data.ts';
import './style.css';

const FONT = '15px "Inter Variable"';
const LINE_HEIGHT = 22;
const ELLIPSIS = '…';
const graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

// The text from a cursor to the end, rebuilt from the prepared segments.
function textFrom(p: PreparedTextWithSegments, c: LayoutCursor): string {
  const first = Array.from(graphemes.segment(p.segments[c.segmentIndex] ?? ''), (s) => s.segment);
  return first.slice(c.graphemeIndex).join('') + p.segments.slice(c.segmentIndex + 1).join('');
}

// Binary search the longest prefix of `rest` that still fits on one line once '…' is appended.
function fitWithEllipsis(rest: string, width: number): string {
  const chars = Array.from(graphemes.segment(rest.slice(0, 400)), (s) => s.segment);
  const fits = (n: number): boolean => {
    const candidate = chars.slice(0, n).join('').trimEnd() + ELLIPSIS;
    return measureNaturalWidth(prepare(candidate, FONT)) <= width;
  };
  let lo = 0;
  let hi = chars.length;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (fits(mid)) lo = mid;
    else hi = mid - 1;
  }
  return chars.slice(0, lo).join('').trimEnd() + ELLIPSIS;
}

const mount: Mount = async (el, { preview, signal }) => {
  await document.fonts.load(FONT, TEXT + ELLIPSIS);
  if (signal.aborted) return () => {};

  const prepared = prepareWithSegments(TEXT, FONT);
  const box = document.createElement('div');
  box.className = 'box';
  box.style.cssText = `font:${FONT};line-height:${LINE_HEIGHT}px`;
  const readout = document.createElement('p');
  readout.className = 'readout';

  const render = (width: number, maxLines: number): void => {
    const out: string[] = [];
    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
    let clamped = false;
    for (let i = 0; i < maxLines; i++) {
      const line = layoutNextLine(prepared, width, cursor);
      if (line === null) break;
      const isLast = i === maxLines - 1;
      // The last allowed line is only kept as is when nothing follows it.
      if (isLast && layoutNextLine(prepared, width, line.end) !== null) {
        out.push(fitWithEllipsis(textFrom(prepared, cursor), width));
        clamped = true;
      } else {
        out.push(line.text);
        cursor = line.end;
      }
    }
    box.style.width = `${width}px`;
    box.replaceChildren(
      ...out.map((text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div;
      }),
    );
    readout.textContent = `width ${width}px, ${out.length} of at most ${maxLines} lines${clamped ? ', ellipsis added' : ', fits without clamping'}`;
  };

  if (preview) {
    el.append(box);
    let raf = 0;
    const tick = (t: number): void => {
      render(Math.round(130 + 100 * (0.5 + 0.5 * Math.sin(t / 1200))), 4);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const mk = (min: number, max: number, v: number): HTMLInputElement => {
    const i = document.createElement('input');
    i.type = 'range';
    i.min = String(min);
    i.max = String(max);
    i.value = String(v);
    return i;
  };
  const w = mk(120, 560, 340);
  const n = mk(1, 8, 3);
  const controls = document.createElement('div');
  controls.className = 'controls';
  const lw = document.createElement('label');
  lw.append('Width ', w);
  const ln = document.createElement('label');
  ln.append('Lines ', n);
  controls.append(lw, ln);
  el.append(controls, readout, box);
  const onInput = (): void => render(Number(w.value), Number(n.value));
  controls.addEventListener('input', onInput);
  onInput();
  return () => controls.removeEventListener('input', onInput);
};

export default mount;
