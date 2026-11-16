// Objects: opacity fades an object and visible hides it completely, taking it out of hit testing
import { Canvas, Circle, Rect, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'opacity (0 to 1) applies to the middle circle; visible switches the triangle off. Both objects stay in the canvas either way.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 110, top: 100, width: 120, height: 120, fill: '#3b7dd8' });
  const circle = new Circle({ left: 170, top: 100, radius: 50, fill: '#e94b3c' });
  const triangle = new Triangle({ left: 215, top: 135, width: 70, height: 60, fill: '#2e9e5b' });
  canvas.add(rect, circle, triangle);

  const apply = (): void => {
    say(`circle.opacity ${circle.opacity.toFixed(2)}\ntriangle.visible ${triangle.visible}`);
    canvas.requestRenderAll();
  };
  apply();
  if (stage.bar) {
    slider(stage.bar, 'opacity', 0, 1, 0.05, 1, (v) => (circle.set('opacity', v), apply()), (v) => v.toFixed(2));
    checkbox(stage.bar, 'triangle visible', true, (v) => (triangle.set('visible', v), apply()));
  } else {
    stage.loop((_dt, t) => {
      circle.set('opacity', 0.55 + 0.45 * Math.sin(t * 1.8));
      triangle.set('visible', Math.sin(t * 0.9) > -0.3);
      apply();
    });
  }

  return stage.dispose;
};

export default mount;
