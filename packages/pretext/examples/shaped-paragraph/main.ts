// Sets a paragraph inside a diamond, circle or heart: one width per row, lines centred, layoutNextLine until null
import '@fontsource-variable/inter';
import { layoutNextLine, prepareWithSegments, type LayoutCursor } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import { ARTICLE, SHAPES, type ShapeName } from './shapes.ts';
import './style.css';

const FONT = '13px "Inter Variable"';
const LINE_HEIGHT = 18;
const MIN_ROW = 28;

const mount: Mount = async (el, { preview, signal }) => {
  await document.fonts.load(FONT, ARTICLE);
  if (signal.aborted) return () => {};

  const prepared = prepareWithSegments(ARTICLE, FONT);
  const size = preview ? 198 : 400;
  const page = document.createElement('div');
  page.className = 'page';
  page.style.cssText = `width:${size}px;height:${size}px;font:${FONT};line-height:${LINE_HEIGHT}px`;
  const readout = document.createElement('p');
  readout.className = 'readout';

  const render = (shape: ShapeName): void => {
    const rows = Math.floor(size / LINE_HEIGHT);
    const parts: HTMLElement[] = [];
    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
    let lines = 0;
    let done = false;
    for (let row = 0; row < rows; row++) {
      const y = row * LINE_HEIGHT;
      // The shape decides this row's width from the row's vertical centre (0 at the top, 1 at the bottom).
      const rowWidth = Math.floor(SHAPES[shape]((y + LINE_HEIGHT / 2) / size) * size);
      if (rowWidth < MIN_ROW) continue;
      const guide = document.createElement('div');
      guide.className = 'guide';
      guide.style.cssText = `top:${y}px;width:${rowWidth}px;left:${(size - rowWidth) / 2}px`;
      parts.push(guide);
      if (done) continue;
      const line = layoutNextLine(prepared, rowWidth, cursor);
      if (line === null) {
        done = true;
        continue;
      }
      const span = document.createElement('span');
      span.className = 'line';
      span.textContent = line.text;
      // Centre by the line's own measured width, not the row's.
      span.style.cssText = `top:${y}px;left:${Math.round((size - line.width) / 2)}px`;
      parts.push(span);
      cursor = line.end;
      lines++;
    }
    page.replaceChildren(...parts);
    readout.textContent = `${shape}: ${lines} lines${done ? ', text ran out' : ', text continues past the shape'}`;
  };

  const names = Object.keys(SHAPES) as ShapeName[];
  if (preview) {
    el.append(page);
    let i = 0;
    render(names[0]!);
    const timer = setInterval(() => render(names[++i % names.length]!), 2200);
    return () => clearInterval(timer);
  }

  const select = document.createElement('select');
  for (const n of names) select.append(new Option(n, n));
  const label = document.createElement('label');
  label.className = 'controls';
  label.append('Shape ', select);
  el.append(label, readout, page);
  const onChange = (): void => render(select.value as ShapeName);
  select.addEventListener('input', onChange);
  onChange();
  return () => select.removeEventListener('input', onChange);
};

export default mount;
