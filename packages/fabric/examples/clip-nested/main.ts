// Clip paths: a clip path with its own clipPath, so two shapes intersect
import { Canvas, Circle } from 'fabric';
import type { Mount } from '@/types.ts';
import { quad } from '../../shared/clip.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 240], hint: 'The inner circle clips the outer one; what is left clips the group. Slide the inner circle.' });
  const canvas = stage.own(new Canvas(stage.el));

  const group = quad(150, 120);
  const clipPath = new Circle({ radius: 70, left: 20, top: 20 });
  // a clip path is an object, so it can have a clipPath too; this one is measured from clipPath's centre
  const innerClipPath = new Circle({ radius: 70, left: -20, top: -20 });
  clipPath.clipPath = innerClipPath;
  group.clipPath = clipPath;
  canvas.add(group);

  const move = (d: number): void => {
    innerClipPath.set({ left: -d, top: -d });
    group.set('dirty', true);
    canvas.requestRenderAll();
  };
  if (stage.bar) slider(stage.bar, 'inner offset', -70, 70, 1, 20, move);
  else stage.loop((_dt, t) => move(Math.sin(t * 1.5) * 50));
  return stage.dispose;
};

export default mount;
