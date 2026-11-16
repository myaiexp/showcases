// Objects: a Triangle is an isosceles shape that fills its width by height box
import { Canvas, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'Only width and height are needed: the apex sits at the top middle, the base along the bottom.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const triangle = new Triangle({ left: 150, top: 100, width: 120, height: 130, fill: '#e94b3c', stroke: '#8c2418', strokeWidth: 3 });
  canvas.add(triangle);

  const apply = (width: number, height: number): void => {
    triangle.set({ width, height });
    triangle.setCoords();
    say(`width ${width.toFixed(0)} · height ${height.toFixed(0)}`);
    canvas.requestRenderAll();
  };
  apply(120, 130);
  if (stage.bar) {
    slider(stage.bar, 'width', 20, 260, 1, 120, (w) => apply(w, triangle.height));
    slider(stage.bar, 'height', 20, 180, 1, 130, (h) => apply(triangle.width, h));
  } else {
    stage.loop((_dt, t) => apply(130 + 70 * Math.sin(t * 1.5), 120 + 40 * Math.cos(t * 1.5)));
  }

  return stage.dispose;
};

export default mount;
