// lockRotation, lockSkewingX and lockSkewingY on rotate and skew handles
import { Canvas, Point, Rect, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { caption, rememberPose } from '../../shared/custom.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Rotate with the top handle; hold Shift on a side handle to skew instead of scale. Locked actions show a not-allowed cursor and do nothing.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, 'rotate or shift-drag a side handle');

  const base = { top: 110, width: 70, height: 70 };
  const a = new Rect({ ...base, left: 70, fill: '#e94b3c', lockRotation: true });
  const b = new Rect({ ...base, left: 180, fill: '#3b7dd8', lockSkewingX: true });
  const c = new Rect({ ...base, left: 290, fill: '#2e9e5b', lockSkewingY: true });
  canvas.add(a, b, c, caption('lockRotation', 70, 175), caption('lockSkewingX', 180, 175), caption('lockSkewingY', 290, 175));
  canvas.setActiveObject(b);
  const reset = rememberPose([a, b, c]);

  const report = ({ target }: { target: FabricObject }): void =>
    say(`angle ${target.angle.toFixed(0)}° · skewX ${target.skewX.toFixed(0)} · skewY ${target.skewY.toFixed(0)}`);
  canvas.on('object:rotating', report);
  canvas.on('object:skewing', report);

  if (stage.bar) {
    for (const [name, o] of [['red', a], ['blue', b], ['green', c]] as const) {
      checkbox(stage.bar, `${name} lockRotation`, o.lockRotation, (v) => (o.lockRotation = v));
      checkbox(stage.bar, `${name} lockSkewingX`, o.lockSkewingX, (v) => (o.lockSkewingX = v));
      checkbox(stage.bar, `${name} lockSkewingY`, o.lockSkewingY, (v) => (o.lockSkewingY = v));
    }
  } else {
    const ghost = stage.ghost(canvas);
    const shift = { shiftKey: true };
    stage.repeat(async () => {
      canvas.setActiveObject(a);
      a.setCoords();
      await ghost.drag(controlPoint(a, 'mtr'), controlPoint(a, 'mtr').add(new Point(50, 10)), 600);
      canvas.setActiveObject(b);
      b.setCoords();
      // lockSkewingX blocks the top/bottom handles; the side handles skew Y.
      await ghost.drag(controlPoint(b, 'mt'), controlPoint(b, 'mt').add(new Point(30, 0)), 500, shift);
      await ghost.drag(controlPoint(b, 'mr'), controlPoint(b, 'mr').add(new Point(0, 25)), 500, shift);
      canvas.setActiveObject(c);
      c.setCoords();
      await ghost.drag(controlPoint(c, 'mt'), controlPoint(c, 'mt').add(new Point(30, 0)), 600, shift);
      await stage.wait(800);
      reset();
    }, 300);
  }

  return stage.dispose;
};

export default mount;
