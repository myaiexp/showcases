// Animation: one animate() call moves four properties together
import { Canvas, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Every key in the map gets its own animation, all sharing the options. The last onChange is enough to redraw.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, '');

  const rect = new Rect({ left: 70, top: 60, width: 60, height: 60, fill: '#3b7dd8', opacity: 1 });
  canvas.add(rect);

  const poses = [
    { left: 290, top: 60, angle: 180, opacity: 0.3 },
    { left: 290, top: 180, angle: 360, opacity: 1 },
    { left: 70, top: 180, angle: 540, opacity: 0.3 },
    { left: 70, top: 60, angle: 720, opacity: 1 },
  ];
  let i = 0;
  const next = (): void => {
    const pose = poses[i++ % poses.length]!;
    // the returned map has one context per key
    const contexts = rect.animate(pose, {
      duration: 1000,
      easing: util.ease.easeInOutQuad,
      onChange: () => {
        canvas.requestRenderAll();
        say(`left ${rect.left.toFixed(0)}  angle ${rect.angle.toFixed(0)}${stage.preview ? '' : `  top ${rect.top.toFixed(0)}  opacity ${rect.opacity.toFixed(2)}`}`);
      },
    });
    if (i === 1 && !stage.preview) say(`animations: ${Object.keys(contexts).join(', ')}`);
  };

  next();
  if (stage.preview) stage.every(1200, next);
  else button(stage.bar!, 'Next move', next);

  return stage.dispose;
};

export default mount;
