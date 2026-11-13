// Flows a paragraph around a floated box: lines beside the box are narrower, found with layoutNextLineRange
import '@fontsource-variable/inter';
import {
  layoutNextLineRange,
  materializeLineRange,
  prepareWithSegments,
  type LayoutCursor,
} from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import { ARTICLE, field } from './dom.ts';
import './style.css';

const FONT = '15px "Inter Variable"';
const LINE_HEIGHT = 22;
const GAP = 12;

type Side = 'left' | 'right';

const mount: Mount = async (el, { preview, signal }) => {
  await document.fonts.load(FONT, ARTICLE);
  if (signal.aborted) return () => {};

  // One-time work; every later call only routes lines.
  const prepared = prepareWithSegments(ARTICLE, FONT);
  const columnWidth = preview ? 240 : 520;

  const root = document.createElement('div');
  root.className = 'root';
  const readout = document.createElement('p');
  readout.className = 'readout';
  const page = document.createElement('div');
  page.className = 'page';
  page.style.width = `${columnWidth}px`;
  page.style.font = FONT;
  const box = document.createElement('div');
  box.className = 'float-box';
  page.append(box);

  const render = (boxW: number, boxH: number, side: Side): void => {
    const image = { width: boxW + GAP, bottom: boxH + GAP };
    box.style.width = `${boxW}px`;
    box.style.height = `${boxH}px`;
    box.style.left = side === 'left' ? '0' : `${columnWidth - boxW}px`;

    const spans: HTMLElement[] = [];
    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
    let y = 0;
    let narrow = 0;
    while (true) {
      // The README's loop: a line that starts above the image's bottom edge is narrower.
      const beside = y < image.bottom;
      const width = beside ? columnWidth - image.width : columnWidth;
      const range = layoutNextLineRange(prepared, width, cursor);
      if (range === null) break;
      const line = materializeLineRange(prepared, range);
      const span = document.createElement('span');
      span.className = 'line';
      span.textContent = line.text;
      span.style.top = `${y}px`;
      span.style.left = `${beside && side === 'left' ? image.width : 0}px`;
      spans.push(span);
      if (beside) narrow++;
      cursor = range.end;
      y += LINE_HEIGHT;
    }
    page.style.height = preview ? '196px' : `${Math.max(y, boxH)}px`;
    page.replaceChildren(box, ...spans);
    readout.textContent = `${spans.length} lines, ${narrow} of them ${columnWidth - image.width}px wide, the rest ${columnWidth}px`;
  };

  if (preview) {
    root.append(page);
    el.append(root);
    let raf = 0;
    const tick = (t: number): void => {
      const h = Math.round(30 + 70 * (0.5 + 0.5 * Math.sin(t / 1100)));
      render(70, h, 'left');
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const wField = field('Box width', 60, 300, 140, 4);
  const hField = field('Box height', 20, 260, 110, 2);
  const side = document.createElement('select');
  for (const s of ['left', 'right']) side.append(new Option(s, s));
  const controls = document.createElement('div');
  controls.className = 'controls';
  const sideLabel = document.createElement('label');
  sideLabel.append('Side ', side);
  controls.append(wField.label, hField.label, sideLabel);
  root.append(controls, readout, page);
  el.append(root);

  const update = (): void => render(wField.value(), hField.value(), side.value as Side);
  controls.addEventListener('input', update);
  update();
  return () => controls.removeEventListener('input', update);
};

export default mount;
