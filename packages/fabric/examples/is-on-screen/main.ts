// isOnScreen() and isPartiallyOnScreen() check against the visible area
import { Canvas, Circle } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the circle past the edge of the canvas. It stays in the scene; only the on-screen answers change.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const ball = new Circle({ left: 0, top: stage.height / 2, radius: 34, fill: '#e94b3c', stroke: '#8c2418', strokeWidth: 3 });
  canvas.add(ball);

  const place = (x: number): void => {
    ball.set('left', x);
    ball.setCoords();
    ball.set('fill', ball.isOnScreen() ? '#e94b3c' : '#9aa3b2');
    say(`x ${x.toFixed(0)} · isOnScreen ${ball.isOnScreen()}\nisPartiallyOnScreen ${ball.isPartiallyOnScreen()}`);
    canvas.requestRenderAll();
  };
  const w = stage.width;
  place(w / 2);
  if (stage.bar) slider(stage.bar, 'left', -60, w + 60, 1, w / 2, place);
  else stage.loop((_dt, t) => place(w / 2 + (w / 2 + 40) * Math.sin(t * 1.1)));

  return stage.dispose;
};

export default mount;
