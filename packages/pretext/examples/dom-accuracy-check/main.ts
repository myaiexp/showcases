// Compares layout() heights with painted element heights for many strings and widths
import '@fontsource-variable/inter';
import { layout, prepare } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import { CASES, FAMILY, WIDTHS } from './data.ts';
import './style.css';

const LINE_HEIGHT_RATIO = 1.5;

interface Result {
  predicted: number;
  dom: number;
}

const mount: Mount = async (el, { preview, signal }) => {
  const cases = preview ? [0, 2, 4, 6].map(i => CASES[i]).filter(c => c !== undefined) : CASES;
  const widths = preview ? [80, 120, 180] : WIDTHS;
  const sizeFont = (size: number): string => `${size}px ${FAMILY}`;
  await document.fonts.load(sizeFont(16), cases.map(c => c.text).join(''));
  if (signal.aborted) return () => {};

  const root = document.createElement('div');
  root.className = 'root';
  const summary = document.createElement('p');
  summary.className = 'summary';
  const note = document.createElement('p');
  note.className = 'note';
  const grid = document.createElement('div');
  grid.className = 'grid';
  grid.style.setProperty('--cols', String(widths.length));
  const probe = document.createElement('p');
  probe.className = 'probe';
  root.append(summary, grid, probe);
  if (!preview) root.append(note);
  el.append(root);

  const run = (size: number): { rows: Result[][]; cells: HTMLElement[][] } => {
    const font = sizeFont(size);
    const lineHeight = Math.round(size * LINE_HEIGHT_RATIO);
    grid.replaceChildren(document.createElement('span'));
    for (const w of widths) {
      const h = document.createElement('span');
      h.className = 'head';
      h.textContent = `${w}px`;
      grid.append(h);
    }
    probe.style.font = font;
    probe.style.lineHeight = `${lineHeight}px`;
    const rows: Result[][] = [];
    const cells: HTMLElement[][] = [];
    for (const c of cases) {
      const label = document.createElement('span');
      label.className = 'head';
      label.textContent = c.label;
      grid.append(label);
      // Prepared once per string and font; every width below reuses it.
      const prepared = prepare(c.text, font);
      probe.textContent = c.text;
      const row: Result[] = [];
      const cellRow: HTMLElement[] = [];
      for (const w of widths) {
        const predicted = layout(prepared, w, lineHeight).height;
        probe.style.width = `${w}px`;
        const dom = probe.getBoundingClientRect().height;
        row.push({ predicted, dom });
        const cell = document.createElement('span');
        cell.className = 'cell';
        cellRow.push(cell);
        grid.append(cell);
      }
      rows.push(row);
      cells.push(cellRow);
    }
    return { rows, cells };
  };

  const reveal = (r: Result, cell: HTMLElement): void => {
    const ok = r.predicted === r.dom;
    cell.className = `cell ${ok ? 'pass' : 'fail'}`;
    cell.textContent = ok ? `${r.dom}px` : `${r.predicted} vs ${r.dom}`;
  };
  const report = (rows: Result[][], shown: number): void => {
    const flat = rows.flat();
    const ok = flat.slice(0, shown).filter(r => r.predicted === r.dom).length;
    summary.textContent = `${ok}/${shown} match (${shown ? Math.round((100 * ok) / shown) : 0}%) of ${flat.length} string × width checks`;
  };

  if (preview) {
    const { rows, cells } = run(14);
    const flat = rows.flat();
    const flatCells = cells.flat();
    let shown = 0;
    const timer = window.setInterval(() => {
      // Reveal one cell at a time, then start over.
      shown = shown >= flat.length + 3 ? 0 : shown + 1;
      flatCells.forEach((c, i) => {
        const r = flat[i];
        if (!r) return;
        if (i < shown) reveal(r, c);
        else {
          c.className = 'cell';
          c.textContent = '';
        }
      });
      report(rows, Math.min(shown, flat.length));
    }, 160);
    return () => clearInterval(timer);
  }

  const controls = document.createElement('div');
  controls.className = 'controls';
  const select = document.createElement('select');
  for (const s of [14, 16, 18, 20]) select.add(new Option(`${s}px`, String(s), s === 16, s === 16));
  const label = document.createElement('span');
  label.textContent = 'font size';
  controls.append(label, select);
  root.prepend(controls);

  const render = async (): Promise<void> => {
    const size = Number(select.value);
    await document.fonts.load(sizeFont(size), cases.map(c => c.text).join(''));
    if (signal.aborted) return;
    const { rows, cells } = run(size);
    rows.forEach((row, i) => row.forEach((r, j) => {
      const cell = cells[i]?.[j];
      if (cell) reveal(r, cell);
    }));
    report(rows, rows.flat().length);
    const lang = document.documentElement.lang;
    note.textContent = `<html lang> is ${lang ? `"${lang}"` : 'empty, so Chrome and Firefox use the browser\'s language'}. Pretext doesn't read an element's own lang. Fonts: ${FAMILY}`;
  };
  select.addEventListener('change', render);
  await render();
  return () => select.removeEventListener('change', render);
};

export default mount;
