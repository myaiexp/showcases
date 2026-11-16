// Animation: moving "by" an amount, since v7 has no '+=100' strings
import { Canvas, Rect, Triangle, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: "The old guide animates left to '+=100'. In v7 the end value is a plain number: add the offset to the current value yourself.",
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, '');

  const rect = new Rect({ left: 60, top: 70, width: 50, height: 50, fill: '#e94b3c' });
  const arrow = new Triangle({ left: 60, top: 170, width: 40, height: 40, fill: '#3b7dd8' });
  canvas.add(rect, arrow);

  // relative: endValue = current value + delta, read when the animation starts
  const by = (dx: number, dAngle: number): void => {
    const opts = { duration: 600, easing: util.ease.easeOutCubic, onChange: () => canvas.requestRenderAll() };
    rect.animate({ left: rect.left + dx }, opts);
    arrow.animate({ angle: arrow.angle + dAngle }, opts);
    say(`left ${rect.left.toFixed(0)} + ${dx}, angle ${arrow.angle.toFixed(0)} + ${dAngle}`);
  };

  if (stage.preview) {
    let dir = 1;
    stage.every(900, () => {
      if (rect.left > 250) dir = -1;
      if (rect.left < 100) dir = 1;
      by(60 * dir, 60 * dir);
    });
  } else {
    // a click twice quickly starts a second animation of the same property: the end is relative to where the
    // first one has got to, not to where it was going
    button(stage.bar!, 'left +60, angle +45', () => by(60, 45));
    button(stage.bar!, 'left -60, angle -45', () => by(-60, -45));
    button(stage.bar!, 'Reset', () => {
      rect.set('left', 60);
      arrow.set('angle', 0);
      canvas.requestRenderAll();
    });
  }

  return stage.dispose;
};

export default mount;
