// Objects: an Ellipse takes a horizontal radius rx and a vertical radius ry
import { Canvas, Ellipse } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'rx and ry are the two radii; the object is still one selectable shape.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const ellipse = new Ellipse({ left: 150, top: 100, rx: 90, ry: 40, fill: '#8e5bd6', stroke: '#4e2a8c', strokeWidth: 3 });
  canvas.add(ellipse);

  const apply = (rx: number, ry: number): void => {
    ellipse.set({ rx, ry });
    ellipse.setCoords();
    say(`rx ${rx.toFixed(0)} · ry ${ry.toFixed(0)}`);
    canvas.requestRenderAll();
  };
  apply(90, 40);
  if (stage.bar) {
    slider(stage.bar, 'rx', 10, 140, 1, 90, (rx) => apply(rx, ellipse.ry));
    slider(stage.bar, 'ry', 10, 90, 1, 40, (ry) => apply(ellipse.rx, ry));
  } else {
    stage.loop((_dt, t) => apply(75 + 50 * Math.sin(t * 1.5), 50 + 30 * Math.cos(t * 1.5)));
  }

  return stage.dispose;
};

export default mount;
