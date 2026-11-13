// Flows one article through three fixed-height columns, carrying the cursor from each column's last line into the next
import '@fontsource-variable/inter';
import {
  layoutNextLineRange,
  materializeLineRange,
  prepareWithSegments,
  type LayoutCursor,
} from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import { ARTICLE } from './data.ts';
import './style.css';

const COLUMNS = 3;

const mount: Mount = async (el, { preview, signal }) => {
  const fontSize = preview ? 11 : 14;
  const lineHeight = preview ? 15 : 21;
  const colWidth = preview ? 76 : 180;
  const gap = preview ? 8 : 20;
  const font = `${fontSize}px "Inter Variable"`;
  await document.fonts.load(font, ARTICLE);
  if (signal.aborted) return () => {};

  const prepared = prepareWithSegments(ARTICLE, font);

  const grid = document.createElement('div');
  grid.className = 'grid';
  grid.style.cssText = `gap:${gap}px;font:${font};line-height:${lineHeight}px`;
  const cols: HTMLElement[] = [];
  const notes: HTMLElement[] = [];
  for (let i = 0; i < COLUMNS; i++) {
    const wrap = document.createElement('div');
    wrap.className = 'col-wrap';
    wrap.style.width = `${colWidth}px`;
    const col = document.createElement('div');
    col.className = 'col';
    const note = document.createElement('div');
    note.className = 'note';
    wrap.append(col, note);
    grid.append(wrap);
    cols.push(col);
    notes.push(note);
  }
  el.append(grid);

  const render = (height: number): void => {
    const rows = Math.floor(height / lineHeight);
    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
    let finished = false;
    for (let c = 0; c < COLUMNS; c++) {
      const lines: HTMLElement[] = [];
      // A column takes lines until it is full; the cursor simply stays where it is for the next one.
      for (let r = 0; r < rows && !finished; r++) {
        const range = layoutNextLineRange(prepared, colWidth, cursor);
        if (range === null) {
          finished = true;
          break;
        }
        const div = document.createElement('div');
        div.textContent = materializeLineRange(prepared, range).text;
        lines.push(div);
        cursor = range.end;
      }
      const col = cols[c]!;
      const note = notes[c]!;
      col.style.height = `${rows * lineHeight}px`;
      col.replaceChildren(...lines);
      note.textContent = finished
        ? 'end of text'
        : `next: seg ${cursor.segmentIndex}, grapheme ${cursor.graphemeIndex}`;
    }
  };

  if (preview) {
    let raf = 0;
    const tick = (t: number): void => {
      render(Math.round(70 + 90 * (0.5 + 0.5 * Math.sin(t / 1400))));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '100';
  slider.max = '420';
  slider.value = '250';
  const label = document.createElement('label');
  label.className = 'controls';
  label.append('Column height ', slider);
  el.prepend(label);
  const onInput = (): void => render(Number(slider.value));
  slider.addEventListener('input', onInput);
  onInput();
  return () => slider.removeEventListener('input', onInput);
};

export default mount;
