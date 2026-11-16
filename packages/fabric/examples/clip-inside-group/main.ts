// Clip paths: an object's own clipPath inside a clipped group, each one isolated from the other
import { Canvas, Circle } from 'fabric';
import type { Mount } from '@/types.ts';
import { quad } from '../../shared/clip.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 240], hint: 'The red square has its own small clip path; the group has a big one. Neither affects the other.' });
  const canvas = stage.own(new Canvas(stage.el));

  const group = quad(150, 120);
  const small = new Circle({ radius: 50 });
  const big = new Circle({ radius: 100 });
  const red = group.item(0);
  const set = (own: boolean, whole: boolean): void => {
    red.clipPath = own ? small : undefined;
    group.clipPath = whole ? big : undefined;
    red.set('dirty', true);
    group.set('dirty', true);
    canvas.requestRenderAll();
  };
  let own = true;
  let whole = true;
  set(own, whole);

  if (stage.bar) {
    checkbox(stage.bar, 'clip the red square', own, (v) => set((own = v), whole));
    checkbox(stage.bar, 'clip the group', whole, (v) => set(own, (whole = v)));
  } else {
    const states: [boolean, boolean][] = [[true, true], [false, true], [true, false], [false, false]];
    let i = 0;
    stage.every(1300, () => set(...states[++i % states.length]!));
  }
  canvas.add(group);
  return stage.dispose;
};

export default mount;
