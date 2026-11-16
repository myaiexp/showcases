// Customization: lockScalingX, lockScalingY and lockScalingFlip limit what the scale handles do
import { Canvas, Point, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { caption, rememberPose } from '../../shared/custom.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Drag the side handles: the left shape refuses to widen, the middle one to grow taller, the right one will not flip when you pull a handle across it.',
  });
  // uniformScaling off so corner handles scale each axis on its own too.
  const canvas = stage.own(new Canvas(stage.el, { uniformScaling: false }));
  const say = status(stage, 'drag a side handle');

  const base = { top: 105, width: 70, height: 70 };
  const a = new Rect({ ...base, left: 70, fill: '#e94b3c', lockScalingX: true });
  const b = new Rect({ ...base, left: 180, fill: '#3b7dd8', lockScalingY: true });
  const c = new Rect({ ...base, left: 290, fill: '#2e9e5b', lockScalingFlip: true });
  canvas.add(a, b, c, caption('lockScalingX', 70, 170), caption('lockScalingY', 180, 170), caption('lockScalingFlip', 290, 170));
  canvas.setActiveObject(c);
  const reset = rememberPose([a, b, c]);

  canvas.on('object:scaling', ({ target }) => say(`scaleX ${target.scaleX.toFixed(2)} · scaleY ${target.scaleY.toFixed(2)}${stage.preview ? '' : ` · flipX ${target.flipX}`}`));

  if (stage.bar) {
    for (const [name, o] of [['red', a], ['blue', b], ['green', c]] as const) {
      checkbox(stage.bar, `${name} lockScalingX`, o.lockScalingX, (v) => (o.lockScalingX = v));
      checkbox(stage.bar, `${name} lockScalingY`, o.lockScalingY, (v) => (o.lockScalingY = v));
      checkbox(stage.bar, `${name} lockScalingFlip`, o.lockScalingFlip, (v) => (o.lockScalingFlip = v));
    }
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      canvas.setActiveObject(a);
      a.setCoords();
      await ghost.drag(controlPoint(a, 'mr'), controlPoint(a, 'mr').add(new Point(30, 0)), 600);
      canvas.setActiveObject(b);
      b.setCoords();
      await ghost.drag(controlPoint(b, 'mb'), controlPoint(b, 'mb').add(new Point(0, 30)), 600);
      canvas.setActiveObject(c);
      c.setCoords();
      // Pull the right handle past the left edge: unlocked would flip, locked stops at the edge.
      await ghost.drag(controlPoint(c, 'mr'), controlPoint(c, 'ml').add(new Point(-30, 0)), 800);
      await stage.wait(900);
      reset();
    }, 300);
  }

  return stage.dispose;
};

export default mount;
