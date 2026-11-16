// Animation: util.animate with arrays tweens several numbers in one animation
import { Canvas, Circle, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'startValue and endValue are arrays: one animation, one onChange, [x, y, radius] move together. Animating left and radius separately would need two.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, '');

  const ball = new Circle({ left: 60, top: 60, radius: 14, fill: '#3b7dd8' });
  canvas.add(ball);

  const stops = [
    [300, 60, 14],
    [300, 180, 40],
    [60, 180, 14],
    [60, 60, 30],
  ];
  let at = [60, 60, 14];
  let k = 0;
  const next = (): void => {
    const to = stops[k++ % stops.length]!;
    util.animate({
      startValue: at,
      endValue: to,
      duration: 900,
      easing: util.ease.easeInOutQuad, // array easings also receive the index of the value
      target: ball, // ties the animation to the object: it is cancelled with it
      onChange: ([x, y, r]) => {
        at = [x!, y!, r!];
        ball.set({ left: x, top: y, radius: r });
        canvas.requestRenderAll();
        say(`[${at.map((n) => n.toFixed(0)).join(', ')}]`);
      },
    });
  };

  next();
  if (stage.preview) stage.every(1100, next);
  else button(stage.bar!, 'Next stop', next);

  return stage.dispose;
};

export default mount;
