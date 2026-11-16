// Objects: a Circle is a radius around a centre; the slider changes it with set('radius')
import { Canvas, Circle } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'A circle has one size option, radius; width and height follow from it.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const circle = new Circle({ left: 150, top: 100, radius: 50, fill: '#3b7dd8', stroke: '#1d4a8c', strokeWidth: 3 });
  canvas.add(circle);

  const setRadius = (radius: number): void => {
    circle.set('radius', radius);
    circle.setCoords();
    say(`radius ${radius.toFixed(0)} · width ${circle.width.toFixed(0)}`);
    canvas.requestRenderAll();
  };
  setRadius(50);
  if (stage.bar) slider(stage.bar, 'radius', 5, 95, 1, 50, setRadius);
  else stage.loop((_dt, t) => setRadius(50 + 38 * Math.sin(t * 1.6)));

  return stage.dispose;
};

export default mount;
