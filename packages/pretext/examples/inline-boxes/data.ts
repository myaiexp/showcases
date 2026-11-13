// Sample paragraph: body text with custom-emoji squares and taller picture boxes
import type { Piece } from './paint.ts';

export const BODY = '400 15px "Inter Variable"';
export const LINE_HEIGHT = 24;

const body = (text: string): Piece => ({ text, font: BODY });
// A box's width is its margin box: the 20px square plus 2px each side.
const emoji = (cls: string, text: string): Piece => ({ width: 24, height: 24, cls: `emoji ${cls}`, text });
const picture = (cls: string, width: number, height: number): Piece => ({ width, height, cls: `picture ${cls}` });

export const PIECES: Piece[] = [
  body('Shipped the new theme '),
  emoji('e1', 'A'),
  body(' with a fresh logo '),
  picture('p1', 44, 40),
  body(' and a banner '),
  picture('p2', 72, 34),
  body(' for the launch '),
  emoji('e2', 'B'),
  emoji('e3', 'C'),
  body(' before lunch, then the changelog '),
  picture('p3', 40, 52),
  body(' went out too '),
  emoji('e1', 'D'),
  body('.'),
];
