// Sample paragraph: body, bold and monospace code runs with the code background's padding
import type { Run } from './paint.ts';

export const BODY = '400 16px "Inter Variable"';
const BOLD = '700 16px "Inter Variable"';
const CODE = '500 14px "JetBrains Mono"';
export const FONTS = [BODY, BOLD, CODE];
export const LINE_HEIGHT = 26;
export const CODE_PAD = 5;

const body = (text: string): Run => ({ text, font: BODY });
const bold = (text: string): Run => ({ text, font: BOLD });
// A code span may wrap: it keeps break 'normal' and pays its extraWidth on every line it reaches.
const code = (text: string): Run => ({ text, font: CODE, cls: 'code', pad: { x: CODE_PAD, border: 0 } });

export const PIECES: Run[] = [
  body('Call '),
  code('prepareRichInline(items, options)'),
  body(' once, then '),
  bold('every width'),
  body(' is just arithmetic: use '),
  code('walkRichInlineLineRanges(prepared, 320, onLine)'),
  body(' for the lines and keep the '),
  bold('same font'),
  body(' on the element.'),
];
