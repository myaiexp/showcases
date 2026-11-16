// Clip paths: a Group of three circles used as one clip path (the shapes are OR-ed together)
import { Canvas, Circle, Group } from 'fabric';
import type { Mount } from '@/types.ts';
import { quad } from '../../shared/clip.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 240], hint: 'Each object in a clip group is OR-ed with the others: there is no nonzero or evenodd rule.' });
  const canvas = stage.own(new Canvas(stage.el));

  const big = new Circle({ radius: 70, left: 0, top: 0 });
  const small1 = new Circle({ radius: 40, left: -55, top: -55 });
  const small2 = new Circle({ radius: 40, left: 55, top: 55 });
  const clipPath = new Group([big, small1, small2]);
  const group = quad(150, 120);
  group.clipPath = clipPath;
  canvas.add(group);

  const spread = (d: number): void => {
    small1.set({ left: -d, top: -d });
    small2.set({ left: d, top: d });
    clipPath.triggerLayout();
    group.set('dirty', true);
    canvas.requestRenderAll();
  };
  if (stage.bar) slider(stage.bar, 'spread', 0, 80, 1, 55, spread);
  else stage.loop((_dt, t) => spread(55 + Math.sin(t * 1.6) * 25));
  return stage.dispose;
};

export default mount;
