// Clip paths: a Group of four coloured squares clipped by one Circle
import { Canvas, Circle } from 'fabric';
import type { Mount } from '@/types.ts';
import { quad } from '../../shared/clip.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 240], hint: 'The clip path belongs to the group, so it moves, scales and rotates with it. Drag the group.' });
  const canvas = stage.own(new Canvas(stage.el));

  const group = quad(150, 120);
  const clipPath = new Circle({ radius: 100 });
  group.clipPath = clipPath;
  canvas.add(group);

  const resize = (r: number): void => {
    clipPath.set('radius', r);
    group.set('dirty', true);
    canvas.requestRenderAll();
  };
  if (stage.bar) slider(stage.bar, 'radius', 20, 140, 1, 100, resize);
  else stage.loop((_dt, t) => { resize(80 + Math.sin(t * 1.5) * 30); group.rotate((t * 20) % 360); });
  return stage.dispose;
};

export default mount;
