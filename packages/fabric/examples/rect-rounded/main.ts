// Rect rx and ry round the corners with a horizontal and a vertical radius
import { Canvas, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'rx rounds the corners sideways, ry up and down; unequal values give elliptical corners.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 150, top: 100, width: 190, height: 120, fill: '#2e9e5b', stroke: '#1a6638', strokeWidth: 3 });
  canvas.add(rect);

  const apply = (rx: number, ry: number): void => {
    rect.set({ rx, ry });
    say(`rx ${rx.toFixed(0)} · ry ${ry.toFixed(0)}`);
    canvas.requestRenderAll();
  };
  apply(20, 20);
  if (stage.bar) {
    slider(stage.bar, 'rx', 0, 95, 1, 20, (rx) => apply(rx, rect.ry));
    slider(stage.bar, 'ry', 0, 60, 1, 20, (ry) => apply(rect.rx, ry));
  } else {
    stage.loop((_dt, t) => apply(47 + 47 * Math.sin(t * 1.4), 30 + 30 * Math.sin(t * 1.4 + 2)));
  }

  return stage.dispose;
};

export default mount;
