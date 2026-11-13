// A table of every materialized rich-inline fragment: indices, gap, width and the slice of its source item
import '@fontsource-variable/inter';
import { materializeRichInlineLineRange, prepareRichInline, walkRichInlineLineRanges } from '@chenglou/pretext/rich-inline';
import type { RichInlineLine } from '@chenglou/pretext/rich-inline';
import type { Mount } from '@/types.ts';
import { isBox, paintLine, toItem } from './paint.ts';
import { BODY, FONTS, LINE_HEIGHT, PIECES } from './data.ts';
import './style.css';

const COLUMNS = ['line', 'itemIndex', 'text in its item', 'gapBefore', 'gapItemIndex', 'occupiedWidth', 'source'];

// The item's own text with the fragment's slice (sourceStart to sourceEnd) marked.
function sliceCell(itemText: string, start: number, end: number): HTMLElement {
  const cell = document.createElement('code');
  const mark = document.createElement('mark');
  mark.textContent = itemText.slice(start, end);
  cell.append(itemText.slice(0, start), mark, itemText.slice(end));
  return cell;
}

const mount: Mount = async (el, { preview, signal }) => {
  await Promise.all(FONTS.map((f) => document.fonts.load(f, 'Aa(),')));
  if (signal.aborted) return () => {};

  const prepared = prepareRichInline(PIECES.map(toItem));

  const root = document.createElement('div');
  root.className = 'root';
  const stage = document.createElement('div');
  stage.className = 'stage';
  stage.style.font = BODY;
  stage.style.lineHeight = `${LINE_HEIGHT}px`;
  const readout = document.createElement('p');
  readout.className = 'readout';
  const table = document.createElement('table');
  const head = table.createTHead().insertRow();
  for (const name of COLUMNS) head.append(Object.assign(document.createElement('th'), { textContent: name }));
  const body = table.createTBody();

  const render = (width: number): void => {
    const lines: RichInlineLine[] = [];
    walkRichInlineLineRanges(prepared, width, (range) => lines.push(materializeRichInlineLineRange(prepared, range)));
    body.replaceChildren();
    lines.forEach((line, n) => {
      for (const f of line.fragments) {
        const piece = PIECES[f.itemIndex];
        if (!piece) continue;
        const row = body.insertRow();
        if (n % 2) row.className = 'odd';
        const cells: (string | HTMLElement)[] = [
          String(n + 1),
          String(f.itemIndex),
          isBox(piece) ? '(box, no text)' : sliceCell(piece.text, f.sourceStart, f.sourceEnd),
          String(f.gapBefore),
          String(f.gapItemIndex),
          String(f.occupiedWidth),
          `${f.sourceStart}–${f.sourceEnd}`,
        ];
        for (const c of cells) row.insertCell().append(c);
      }
    });
    stage.style.width = `${width}px`;
    stage.replaceChildren(...lines.map((line) => paintLine(line, PIECES, LINE_HEIGHT)));
    readout.textContent = `width ${width}px → ${lines.length} lines, ${lines.reduce((n, l) => n + l.fragments.length, 0)} fragments`;
  };

  if (preview) {
    root.classList.add('compact'); // fewer columns so the table fits a card
    root.append(table);
    el.append(root);
    const widths = [360, 250, 170, 120];
    let i = 0;
    render(widths[0] ?? 260);
    const timer = setInterval(() => render(widths[++i % widths.length] ?? 260), 1800);
    return () => clearInterval(timer);
  }

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '100';
  slider.max = '560';
  slider.value = '260';
  root.append(slider, readout, stage, table);
  el.append(root);
  const onInput = (): void => render(Number(slider.value));
  slider.addEventListener('input', onInput);
  onInput();
  return () => slider.removeEventListener('input', onInput);
};

export default mount;
