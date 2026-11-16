// Paths: after editing a Polyline's points, setDimensions() recomputes its size so controls and hit area match
import { Canvas, Polyline } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 220], hint: 'The slider moves the third point straight in polyline.points. Without setDimensions() the selection box keeps the old size; with it, the box follows the shape.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const line = new Polyline([{ x: 0, y: 100 }, { x: 60, y: 20 }, { x: 120, y: 100 }, { x: 180, y: 20 }, { x: 240, y: 100 }], { left: 160, top: 110, fill: 'rgba(59,125,216,0.25)', stroke: '#1d4a8c', strokeWidth: 3 });
  canvas.add(line);
  canvas.setActiveObject(line);

  let refresh = true;
  const lift = (dy: number): void => {
    line.points[2] = { x: 120, y: 100 - dy };
    line.set('dirty', true);
    if (refresh) line.setDimensions();
    line.setCoords();
    say(`point 3 y ${(100 - dy).toFixed(0)}\nbox ${line.width.toFixed(0)} × ${line.height.toFixed(0)}${refresh ? '' : ' (stale)'}`);
    canvas.requestRenderAll();
  };
  lift(0);
  if (stage.bar) {
    slider(stage.bar, 'raise point 3', -60, 140, 1, 0, lift);
    checkbox(stage.bar, 'call setDimensions()', true, (v) => (refresh = v));
  } else {
    stage.loop((_dt, t) => lift(60 + 70 * Math.sin(t * 1.4)));
  }

  return stage.dispose;
};

export default mount;
