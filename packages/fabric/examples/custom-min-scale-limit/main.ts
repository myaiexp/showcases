// Customization: minScaleLimit stops scaleX and scaleY from shrinking past a value
import { Canvas, Point, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { caption, rememberPose } from '../../shared/custom.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Pull a corner of each rectangle towards its middle. The left one shrinks to almost nothing; the right one stops at minScaleLimit.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const free = new Rect({ left: 100, top: 105, width: 100, height: 100, fill: '#e94b3c' });
  const limited = new Rect({ left: 260, top: 105, width: 100, height: 100, fill: '#2e9e5b', minScaleLimit: 0.5 });
  canvas.add(free, limited, caption('minScaleLimit 0', 100, 190), caption('minScaleLimit 0.5', 260, 190));
  canvas.setActiveObject(limited);
  const reset = rememberPose([free, limited]);

  const show = (): void => say(stage.preview ? `free ${free.scaleX.toFixed(2)} · limited ${limited.scaleX.toFixed(2)}` : `free scale ${free.scaleX.toFixed(2)} · limited scale ${limited.scaleX.toFixed(2)} (min ${limited.minScaleLimit})`);
  canvas.on('object:scaling', show);
  show();

  if (stage.bar) {
    slider(stage.bar, 'minScaleLimit', 0, 1.5, 0.05, 0.5, (v) => {
      limited.set('minScaleLimit', v);
      // The limit applies whenever scaleX/scaleY is set, so re-set the current scale to enforce it.
      limited.set({ scaleX: limited.scaleX, scaleY: limited.scaleY });
      limited.setCoords();
      canvas.requestRenderAll();
      show();
    }, (v) => v.toFixed(2));
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      for (const r of [free, limited]) {
        canvas.setActiveObject(r);
        r.setCoords();
        const br = controlPoint(r, 'br');
        await ghost.drag(br, r.getCenterPoint().add(new Point(4, 4)), 800);
      }
      await stage.wait(900);
      reset();
    }, 300);
  }

  return stage.dispose;
};

export default mount;
