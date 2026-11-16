// Appearance: one colour written as hex, rgb(), hsl(), RGB and RGBA
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/color'; // converts colour strings and hsl()
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';
import { stripes, cells, note } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide alpha: only the two swatches that carry alpha change." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  stripes(leafer, stage, 20);
  const forms: [string, (a: number) => Rect['fill']][] = [
    ['#32cd79', () => '#32cd79'],
    ['rgb(50,205,121)', () => 'rgb(50,205,121)'],
    ['hsl(150,62%,50%)', () => 'hsl(150,62%,50%)'],
    ['solid { r, g, b }', () => ({ type: 'solid', color: { r: 50, g: 205, b: 121 } })],
    ['solid { r, g, b, a }', (a) => ({ type: 'solid', color: { r: 50, g: 205, b: 121, a } })],
    ['rgba(…, a)', (a) => 'rgba(50,205,121,' + a + ')'],
  ];
  const grid = cells(stage, forms.length, 3, 8, stage.preview ? 0 : 6);
  const swatches = grid.map((c, i) => {
    const r = new Rect({ x: c.x, y: c.y, width: c.w, height: c.h - 16, cornerRadius: 8 });
    leafer.add(r);
    note(leafer, forms[i]![0], c.x, c.y + c.h - 13, stage.preview ? 9 : 11, c.w);
    return r;
  });
  drive(stage, 'alpha', [0, 1, 0.05], 0.6, (a) => swatches.forEach((r, i) => (r.fill = forms[i]![1](a))), 5);

  return stage.dispose;
};

export default mount;
