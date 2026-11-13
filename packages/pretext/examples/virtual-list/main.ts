// A 10,000-message list virtualised from layout() heights: prefix sums give exact offsets
import '@fontsource-variable/inter';
import { layout, prepare, type PreparedText } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import { makeMessages, SAMPLE_TEXT } from './data.ts';
import './style.css';

const FONT = '14px "Inter Variable"';
const LINE_HEIGHT = 20;
const FULL_COUNT = 10000;
const PREVIEW_COUNT = 1500; // keeps the one-off prepare pass short in a gallery card
// Row = 4px margin above and below, bubble = 8px / 12px padding; text sits inside the bubble.
const ROW_PAD_X = 12;
const BUBBLE_PAD_X = 12;
const ROW_EXTRA_Y = 8 + 16;

const mount: Mount = async (el, { preview, signal }) => {
  await document.fonts.load(FONT, SAMPLE_TEXT);
  if (signal.aborted) return () => {};

  const COUNT = preview ? PREVIEW_COUNT : FULL_COUNT;
  const messages = makeMessages(COUNT);
  const t0 = performance.now();
  const prepared: PreparedText[] = messages.map((m) => prepare(m, FONT));
  const prepareMs = performance.now() - t0;

  const root = document.createElement('div');
  root.className = 'root';
  const readout = document.createElement('p');
  readout.className = 'readout';
  const scroller = document.createElement('div');
  scroller.className = 'scroller';
  const spacer = document.createElement('div');
  spacer.className = 'spacer';
  scroller.append(spacer);
  root.append(readout, scroller);
  el.append(root);

  // offsets[i] is the top of row i; offsets[COUNT] is the total height.
  const offsets = new Float64Array(COUNT + 1);
  let textWidth = 0;
  const relayout = (): void => {
    textWidth = scroller.clientWidth - 2 * (ROW_PAD_X + BUBBLE_PAD_X);
    for (let i = 0; i < COUNT; i++) {
      offsets[i + 1] = offsets[i]! + layout(prepared[i]!, textWidth, LINE_HEIGHT).height + ROW_EXTRA_Y;
    }
    spacer.style.height = `${offsets[COUNT]}px`;
  };

  // Last row whose top is <= y.
  const rowAt = (y: number): number => {
    let lo = 0;
    let hi = COUNT - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (offsets[mid]! <= y) lo = mid;
      else hi = mid - 1;
    }
    return lo;
  };

  const rows = new Map<number, HTMLElement>();
  const render = (): void => {
    const top = scroller.scrollTop;
    const first = rowAt(top);
    const last = rowAt(top + scroller.clientHeight);
    for (const [i, row] of rows) {
      if (i < first || i > last) {
        row.remove();
        rows.delete(i);
      }
    }
    for (let i = first; i <= last; i++) {
      let row = rows.get(i);
      if (!row) {
        row = document.createElement('div');
        row.className = 'row';
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.font = FONT;
        bubble.style.lineHeight = `${LINE_HEIGHT}px`;
        bubble.textContent = messages[i] ?? '';
        row.append(bubble);
        spacer.append(row);
        rows.set(i, row);
      }
      row.style.top = `${offsets[i]}px`;
      row.style.height = `${offsets[i + 1]! - offsets[i]!}px`;
    }
    readout.textContent =
      `${COUNT.toLocaleString()} messages · ${Math.round(offsets[COUNT]!).toLocaleString()}px tall · ` +
      `rows ${first}–${last} · ${rows.size} in the DOM · prepare ${prepareMs.toFixed(0)} ms`;
  };

  relayout();
  render();
  const observer = new ResizeObserver(() => {
    relayout();
    render();
  });
  observer.observe(scroller);
  scroller.addEventListener('scroll', render, { passive: true });

  let raf = 0;
  if (preview) {
    root.classList.add('preview');
    let last = 0;
    const tick = (t: number): void => {
      // Drift down at 120px/s, wrapping back to the top at the end.
      const dt = last ? t - last : 0;
      last = t;
      const max = offsets[COUNT]! - scroller.clientHeight;
      scroller.scrollTop = (scroller.scrollTop + dt * 0.12) % max;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }
  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    scroller.removeEventListener('scroll', render);
  };
};

export default mount;
