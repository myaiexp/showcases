// Turns runs into Pretext items and paints materialized rich-inline lines (and a browser-flowed twin) as DOM
import type { RichInlineBox, RichInlineItem, RichInlineLine } from '@chenglou/pretext/rich-inline';

export type Run = {
  text: string;
  font: string;
  cls?: string;
  pad?: { x: number; border: number }; // horizontal padding and border, charged as extraWidth
  never?: boolean; // paint and measure as one atomic inline-block
};
export type Boxed = { width: number; height: number; cls?: string; text?: string };
export type Piece = Run | Boxed;
export const isBox = (p: Piece): p is Boxed => 'width' in p;

export function toItem(p: Piece): RichInlineItem | RichInlineBox {
  if (isBox(p)) return { width: p.width };
  const item: RichInlineItem = { text: p.text, font: p.font };
  if (p.never) item.break = 'never';
  if (p.pad) item.extraWidth = 2 * (p.pad.x + p.pad.border);
  return item;
}

// One element per run: its font, line-height 1, padding on both sides; a `never` run is an inline-block.
function runEl(run: Run, text: string): HTMLSpanElement {
  const s = document.createElement('span');
  s.className = `run ${run.cls ?? ''}`;
  s.style.font = run.font;
  s.style.lineHeight = '1';
  if (run.pad) {
    s.style.padding = `0 ${run.pad.x}px`;
    s.style.border = `${run.pad.border}px solid transparent`;
    s.style.boxDecorationBreak = 'clone';
  }
  if (run.never) {
    s.style.display = 'inline-block';
    s.style.whiteSpace = 'nowrap';
  }
  s.textContent = text;
  return s;
}

function boxEl(b: Boxed): HTMLSpanElement {
  const s = document.createElement('span');
  s.className = `box ${b.cls ?? ''}`;
  Object.assign(s.style, { display: 'inline-block', verticalAlign: 'top', width: `${b.width}px`, height: `${b.height}px` });
  if (b.text) s.textContent = b.text;
  return s;
}

// One line: each fragment its own element, the collapsed space (gapBefore) drawn in the font of item gapItemIndex.
export function paintLine(line: RichInlineLine, pieces: Piece[], lh: number): HTMLDivElement {
  const row = document.createElement('div');
  row.className = 'line';
  let tallest = lh;
  for (const f of line.fragments) {
    const p = pieces[f.itemIndex];
    if (!p) continue;
    const gap = f.gapItemIndex >= 0 ? pieces[f.gapItemIndex] : undefined;
    const hasGap = gap !== undefined && !isBox(gap) && f.gapBefore > 0;
    if (isBox(p)) {
      tallest = Math.max(tallest, p.height);
      if (hasGap) row.append(runEl({ text: ' ', font: gap.font }, ' '));
      row.append(boxEl(p));
      continue;
    }
    let text = f.text;
    if (hasGap) {
      if (f.gapItemIndex === f.itemIndex && !p.pad) text = ` ${text}`;
      else row.append(runEl({ text: ' ', font: gap.font }, ' '));
    }
    row.append(runEl(p, text));
  }
  row.style.height = `${tallest}px`;
  return row;
}

// The same runs left to the browser's own line breaking, for comparison.
export function paintFlow(pieces: Piece[]): HTMLParagraphElement {
  const p = document.createElement('p');
  p.className = 'flow';
  for (const piece of pieces) p.append(isBox(piece) ? boxEl(piece) : runEl(piece, piece.text));
  return p;
}
