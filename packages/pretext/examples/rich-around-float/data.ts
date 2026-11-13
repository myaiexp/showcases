// Sample paragraph runs: body, bold and a mention chip
import type { Run } from './paint.ts';

export const BODY = '400 15px "Inter Variable"';
const BOLD = '700 15px "Inter Variable"';
const MENTION = '600 13px "Inter Variable"';
export const FONTS = [BODY, BOLD, MENTION];
export const LINE_HEIGHT = 22;

const body = (text: string): Run => ({ text, font: BODY });

export const PIECES: Run[] = [
  body('A float takes a corner of the column and the text '),
  { text: 'flows around it', font: BOLD },
  body(', a line at a time. Ask '),
  { text: '@maya', font: MENTION, cls: 'mention', never: true, pad: { x: 6, border: 0 } },
  body(' how the lines beside the float are narrower, and how, once the float ends, the very same paragraph takes the full width again without being prepared a second time. '),
  { text: 'Every line', font: BOLD },
  body(' is its own call, so its width can be anything you like.'),
];
