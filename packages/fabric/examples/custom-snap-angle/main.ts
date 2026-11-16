// Customization: snapAngle and snapThreshold make the rotate handle stick to steps of an angle
import { Canvas, Point, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Rotate with the top handle. The angle snaps to multiples of snapAngle whenever it is within snapThreshold degrees of one (0 snapAngle turns snapping off).',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 180, top: 125, width: 130, height: 60, fill: '#3b7dd8', snapAngle: 45, snapThreshold: 10 });
  canvas.add(rect);
  canvas.setActiveObject(rect);

  const show = (): void =>
    say(stage.preview ? `angle ${rect.angle.toFixed(0)}° · snap ${rect.snapAngle}° ±${rect.snapThreshold}` : `angle ${rect.angle.toFixed(1)}° · snapAngle ${rect.snapAngle} · snapThreshold ${rect.snapThreshold}`);
  canvas.on('object:rotating', show);
  show();

  if (stage.bar) {
    slider(stage.bar, 'snapAngle', 0, 90, 5, 45, (v) => ((rect.snapAngle = v), show()));
    slider(stage.bar, 'snapThreshold', 0, 45, 1, 10, (v) => ((rect.snapThreshold = v), show()));
  } else {
    const ghost = stage.ghost(canvas);
    const settings = [
      { snapAngle: 45, snapThreshold: 12 },
      { snapAngle: 0, snapThreshold: 0 },
      { snapAngle: 30, snapThreshold: 30 },
    ];
    let n = 0;
    stage.repeat(async () => {
      Object.assign(rect, settings[n++ % settings.length]);
      rect.set({ angle: 0 });
      rect.setCoords();
      show();
      const handle = controlPoint(rect, 'mtr');
      const c = rect.getCenterPoint();
      // Sweep the handle a quarter turn clockwise: a drag to the right of the centre.
      await ghost.drag(handle, new Point(c.x + 95, c.y + 5), 1500);
      await stage.wait(800);
    }, 300);
  }

  return stage.dispose;
};

export default mount;
