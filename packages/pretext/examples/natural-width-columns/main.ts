// Sizes table columns from measureNaturalWidth() per cell, capped, and wraps capped cells with layout()
import '@fontsource-variable/inter';
import { layout, measureNaturalWidth, prepare } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import { HEADERS, ROWS } from './data.ts';
import './style.css';

const BODY_FONT = '14px "Inter Variable"';
const HEAD_FONT = '600 14px "Inter Variable"';
const LINE_HEIGHT = 20;
const PAD_X = 10;
const PAD_Y = 8;

const mount: Mount = async (el, { preview, signal }) => {
  const all = [...HEADERS, ...ROWS.flat()].join(' ');
  await Promise.all([document.fonts.load(BODY_FONT, all), document.fonts.load(HEAD_FONT, all)]);
  if (signal.aborted) return () => {};

  const root = document.createElement('div');
  root.className = 'root';
  const readout = document.createElement('p');
  readout.className = 'readout';
  const table = document.createElement('div');
  table.className = 'table';
  table.style.setProperty('--lh', `${LINE_HEIGHT}px`);
  table.style.setProperty('--pad-x', `${PAD_X}px`);
  table.style.setProperty('--pad-y', `${PAD_Y}px`);

  // pre-wrap so a "\n" in a cell is a hard break that measureNaturalWidth() counts.
  const opts = { whiteSpace: 'pre-wrap' } as const;
  // The 200px preview card shows two columns and two rows.
  const keep = preview ? [0, 1] : [0, 1, 2, 3];
  const rows = preview ? [ROWS[3] ?? [], ROWS[2] ?? []] : ROWS;
  const grid = [HEADERS, ...rows].map((row, r) =>
    keep.map((c) => {
      const text = row[c] ?? '';
      const prepared = prepare(text, r === 0 ? HEAD_FONT : BODY_FONT, opts);
      return { text, prepared, natural: measureNaturalWidth(prepared) };
    }),
  );

  const render = (cap: number): void => {
    table.replaceChildren();
    // A column is as wide as its widest natural cell, rounded up and capped.
    const colW = keep.map((_, c) =>
      Math.min(Math.ceil(Math.max(...grid.map((row) => row[c]?.natural ?? 0))), cap),
    );
    const colX: number[] = [];
    let x = 0;
    for (const w of colW) {
      colX.push(x);
      x += w + PAD_X * 2;
    }
    let y = 0;
    grid.forEach((row, r) => {
      // Cells wider than the cap wrap: layout() gives the height each cell needs.
      const heights = row.map((cell, c) => layout(cell.prepared, colW[c] ?? 0, LINE_HEIGHT).height);
      const contentH = Math.max(...heights);
      row.forEach((cellData, c) => {
        const w = colW[c] ?? 0;
        const cell = document.createElement('div');
        cell.className = r === 0 ? 'cell head' : 'cell';
        if (cellData.natural > w) cell.classList.add('capped');
        cell.style.cssText = `left:${colX[c] ?? 0}px;top:${y}px;width:${w}px;height:${contentH}px`;
        cell.textContent = cellData.text;
        table.append(cell);
      });
      y += contentH + PAD_Y * 2;
    });
    table.style.width = `${x}px`;
    table.style.height = `${y}px`;
    readout.textContent = `cap ${cap}px · columns ${colW.filter((w) => w > 0).join(' / ')}px · ${y}px tall`;
  };

  if (preview) {
    root.append(table);
    el.append(root);
    let raf = 0;
    const tick = (t: number): void => {
      render(Math.round(90 + 60 * (0.5 + 0.5 * Math.sin(t / 1100))));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '40';
  slider.max = '420';
  slider.value = '200';
  root.append(slider, readout, table);
  el.append(root);
  const onInput = (): void => render(Number(slider.value));
  slider.addEventListener('input', onInput);
  onInput();
  return () => slider.removeEventListener('input', onInput);
};

export default mount;
