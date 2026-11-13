// Wraps text around a circle: each row has up to two free intervals, and layoutNextLine fills each one in turn
import '@fontsource-variable/inter';
import { layoutNextLine, prepareWithSegments, type LayoutCursor } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import { ARTICLE } from './data.ts';
import './style.css';

const FONT = '15px "Inter Variable"';
const LINE_HEIGHT = 22;
const PAD = 8; // air between the circle and the text
const MIN_SLOT = 36; // a free interval narrower than this is skipped

const mount: Mount = async (el, { preview, signal }) => {
  await document.fonts.load(FONT, ARTICLE);
  if (signal.aborted) return () => {};

  const prepared = prepareWithSegments(ARTICLE, FONT);
  const width = preview ? 250 : 560;
  const height = preview ? 200 : 420;
  const radius = preview ? 38 : 64;

  const page = document.createElement('div');
  page.className = 'page';
  page.style.cssText = `width:${width}px;height:${height}px;font:${FONT};line-height:${LINE_HEIGHT}px`;
  const disc = document.createElement('div');
  disc.className = 'disc';
  disc.style.width = disc.style.height = `${radius * 2}px`;
  page.append(disc);
  const readout = document.createElement('p');
  readout.className = 'readout';
  if (preview) el.append(page);
  else el.append(readout, page);

  const render = (cx: number, cy: number): void => {
    disc.style.transform = `translate(${cx - radius}px, ${cy - radius}px)`;
    const spans: HTMLElement[] = [];
    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
    let split = 0;
    for (let y = 0; y + LINE_HEIGHT <= height; y += LINE_HEIGHT) {
      // How far the circle reaches into this row: use the row edge nearest its centre.
      const dy = cy >= y && cy <= y + LINE_HEIGHT ? 0 : Math.min(Math.abs(cy - y), Math.abs(cy - y - LINE_HEIGHT));
      const slots: Array<[number, number]> = [];
      if (dy >= radius + PAD) slots.push([0, width]);
      else {
        const half = Math.sqrt((radius + PAD) ** 2 - dy ** 2);
        slots.push([0, cx - half], [cx + half, width]);
      }
      let used = 0;
      for (const [from, to] of slots) {
        const x = Math.max(0, from);
        const room = Math.min(width, to) - x;
        if (room < MIN_SLOT) continue;
        // One line per free interval, each continuing from the previous line's end cursor.
        const line = layoutNextLine(prepared, Math.floor(room), cursor);
        if (line === null) {
          page.replaceChildren(disc, ...spans);
          readout.textContent = `${spans.length} lines, ${split} rows split in two around the circle`;
          return;
        }
        const span = document.createElement('span');
        span.className = 'line';
        span.textContent = line.text;
        span.style.transform = `translate(${Math.round(x)}px, ${y}px)`;
        spans.push(span);
        cursor = line.end;
        used++;
      }
      if (used === 2) split++;
    }
    page.replaceChildren(disc, ...spans);
    readout.textContent = `${spans.length} lines, ${split} rows split in two around the circle`;
  };

  // The circle drifts on its own; in the full view the pointer takes over while it is over the page.
  let pointer: { x: number; y: number } | null = null;
  const drift = (t: number): void => {
    const p = pointer ?? {
      x: width / 2 + (width / 2 - radius - 10) * Math.sin(t / 1700),
      y: height / 2 + (height / 2 - radius - 10) * Math.sin(t / 1300 + 1),
    };
    render(p.x, p.y);
  };
  let raf = 0;
  const tick = (t: number): void => {
    drift(t);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  const onMove = (e: PointerEvent): void => {
    const r = page.getBoundingClientRect();
    pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const onLeave = (): void => {
    pointer = null;
  };
  if (!preview) {
    page.addEventListener('pointermove', onMove);
    page.addEventListener('pointerleave', onLeave);
  }
  return () => {
    cancelAnimationFrame(raf);
    page.removeEventListener('pointermove', onMove);
    page.removeEventListener('pointerleave', onLeave);
  };
};

export default mount;
