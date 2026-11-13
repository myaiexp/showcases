// Sample runs for the inspector: body, a chip, bold text, code and a box
import type { Piece } from './paint.ts';

export const BODY = '400 15px "Inter Variable"';
const BOLD = '700 15px "Inter Variable"';
const MENTION = '600 13px "Inter Variable"';
const CODE = '500 13px "JetBrains Mono"';
export const FONTS = [BODY, BOLD, MENTION, CODE];
export const LINE_HEIGHT = 24;

export const PIECES: Piece[] = [
  { text: 'Hello ', font: BODY },
  { text: '@maya', font: MENTION, cls: 'mention', never: true, pad: { x: 6, border: 0 } },
  { text: ', please read the ', font: BODY },
  { text: 'fragment table', font: BOLD },
  { text: ' and run ', font: BODY },
  { text: 'walk(prepared, width)', font: CODE, cls: 'code', pad: { x: 4, border: 0 } },
  { width: 24, height: 24, cls: 'badge' },
  { text: ' on it.', font: BODY },
];
