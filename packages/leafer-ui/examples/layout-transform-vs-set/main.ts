// Layout: transform adds a matrix, setTransform replaces it
import { Box, Leafer, Rect, Text } from 'leafer-ui';
import type { IMatrixData } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { caption, size } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { panes: ['setTransform(m)', 'transform(m)'], hint: 'Both panes apply the same matrix (a 15 degree turn with a nudge) on every press. setTransform lands on the same pose; transform stacks.' });
  const S = size(stage) * 0.4;
  const shapes = stage.panes.map((pane) => {
    const leafer = stage.own(new Leafer({ view: pane.view }), pane);
    const b = new Box({ x: pane.width / 2 - S / 2, y: pane.height / 2 - S / 2 - 16, width: S, height: S });
    b.add(new Rect({ width: S, height: S, fill: '#32cd79', cornerRadius: 6 }));
    b.add(new Text({ x: S * 0.1, y: S * 0.2, width: S * 0.8, text: 'F', fontSize: S * 0.55, fill: '#fff', textAlign: 'center', hittable: false }));
    leafer.add(b);
    return { leafer, b, x0: b.x!, y0: b.y! };
  });
  const notes = shapes.map((s) => caption(stage, s.leafer));
  const c = Math.cos(Math.PI / 12), n = Math.sin(Math.PI / 12);
  let presses = 0;
  const press = (): void => {
    presses++;
    const [set, add] = shapes;
    const m: IMatrixData = { a: c, b: n, c: -n, d: c, e: set!.x0 + 6, f: set!.y0 };
    set!.b.setTransform(m);
    add!.b.transform({ a: c, b: n, c: -n, d: c, e: 6, f: 0 }); // applied on top of the current matrix
    shapes.forEach((s, i) => (notes[i]!.text = `rotation ${Math.round(s.b.rotation!)}  x ${Math.round(s.b.x!)}`));
  };
  press();
  if (stage.bar) button(stage.bar, 'apply the matrix again', press);
  else stage.every(1100, () => (presses >= 4 ? reset() : press()));
  function reset(): void {
    presses = 0;
    for (const s of shapes) s.b.set({ x: s.x0, y: s.y0, rotation: 0 });
    press();
  }

  return stage.dispose;
};

export default mount;
