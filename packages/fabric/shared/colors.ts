// Colour-example helpers: a swatch painted as a fabric Rect with a caption
//
// Color traps (7.4.0): setAlpha, toGrayscale, toBlackWhite and overlayWith mutate and return the
// same instance; toHex() has no '#' and is upper case; overlayWith mixes at exactly 50%; new
// Color('banana') never throws: it is black with isUnrecognised = true.
import { FabricText, Rect } from 'fabric';

/** A colour sample: a rectangle filled with `fill` and a small caption under it. Origin is the top left. */
export function swatch(fill: string, x: number, y: number, w: number, h: number, caption?: string): (Rect | FabricText)[] {
  const box = new Rect({ left: x, top: y, width: w, height: h, originX: 'left', originY: 'top', fill, stroke: '#00000022', strokeWidth: 1, selectable: false });
  if (caption === undefined) return [box];
  const label = new FabricText(caption, {
    left: x + w / 2,
    top: y + h + 3,
    originY: 'top',
    fontSize: 10,
    fontFamily: 'monospace',
    fill: '#444',
    selectable: false,
  });
  return [box, label];
}
