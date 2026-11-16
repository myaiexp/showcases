// Layout: transformWorld applies a matrix in canvas space
import { Box, Group, Leafer, Rect, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { caption, size } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { panes: ['transform({ e: 20 })', 'transformWorld({ e: 20 })'], hint: 'Both move by 20 along x of the matrix. The rect sits in a group rotated 35 degrees, so local x is tilted and world x is not.' });
  const S = size(stage) * 0.3;
  const items = stage.panes.map((pane) => {
    const leafer = stage.own(new Leafer({ view: pane.view }), pane);
    const g = new Group({ x: pane.width * 0.2, y: pane.height * 0.25, rotation: 35 });
    const b = new Box({ x: 0, y: 0, width: S, height: S });
    b.add(new Rect({ width: S, height: S, fill: '#32cd79', cornerRadius: 6 }));
    b.add(new Text({ x: S * 0.1, y: S * 0.2, width: S * 0.8, text: 'F', fontSize: S * 0.55, fill: '#fff', textAlign: 'center', hittable: false }));
    g.add(b);
    leafer.add(new Rect({ x: pane.width * 0.2 + 0, y: pane.height * 0.25, width: S, height: S, rotation: 35, stroke: '#bbb', dashPattern: [5, 4], hittable: false }));
    leafer.add(g);
    return { leafer, b };
  });
  const notes = items.map((s) => caption(stage, s.leafer));
  const m = { a: 1, b: 0, c: 0, d: 1, e: 20, f: 0 };
  const step = (): void => {
    items[0]!.b.transform(m);
    items[1]!.b.transformWorld(m);
    items.forEach((s, i) => (notes[i]!.text = `x ${Math.round(s.b.x!)}  y ${Math.round(s.b.y!)}`));
  };
  const reset = (): void => {
    for (const s of items) s.b.set({ x: 0, y: 0 });
    step();
  };
  reset();
  if (stage.bar) {
    button(stage.bar, 'apply the matrix', step);
    button(stage.bar, 'reset', reset);
  } else {
    let n = 0;
    stage.every(1000, () => (n++ % 4 === 3 ? reset() : step()));
  }

  return stage.dispose;
};

export default mount;
