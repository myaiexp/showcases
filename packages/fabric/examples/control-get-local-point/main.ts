// getLocalPoint turns the pointer into the object's own axes in a handler
import { Canvas, Control, Point, Rect, controlsUtils } from 'fabric';
import type { Mount } from '@/types.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [340, 240], hint: 'The rectangle is rotated and scaled, yet the bottom handle measures the pointer along the rectangle\'s own vertical axis.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 170, top: 120, width: 150, height: 80, scaleX: 1.2, scaleY: 1.2, angle: 20, fill: '#2e9e5b', cornerStyle: 'circle', cornerColor: '#e94b3c', transparentCorners: false });
  let last = new Point(0, 0);
  const height = new Control({
    x: 0,
    y: 0.5,
    sizeX: 16,
    sizeY: 16,
    cursorStyle: 'ns-resize',
    actionName: 'resizing',
    // this is changeHeight written out: local y = distance below the transform origin (the top edge), in scaled px
    actionHandler: controlsUtils.wrapWithFixedAnchor((_e, transform, x, y) => {
      const local = controlsUtils.getLocalPoint(transform, transform.originX, transform.originY, x, y);
      last = local;
      const target = transform.target;
      const next = Math.max(10, Math.abs(local.y / target.scaleY));
      const changed = next !== target.height;
      target.set('height', next);
      return changed;
    }),
  });
  rect.controls = { height, mtr: rect.controls.mtr! };
  canvas.add(rect);
  canvas.setActiveObject(rect);

  const show = (): void => {
    say(stage.preview ? `local (${last.x.toFixed(0)}, ${last.y.toFixed(0)}) -> h ${rect.height.toFixed(0)}` : `local pointer (${last.x.toFixed(0)}, ${last.y.toFixed(0)})  ->  height ${rect.height.toFixed(0)}`);
    canvas.requestRenderAll();
  };
  show();
  canvas.on('object:resizing', show);
  canvas.on('mouse:move', show);

  if (stage.preview) {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      rect.set({ height: 80 });
      rect.setCoords();
      const p = controlPoint(rect, 'height');
      await ghost.drag(p, p.add(new Point(-18, 40)), 900);
      const q = controlPoint(rect, 'height');
      await ghost.drag(q, q.add(new Point(15, -45)), 900);
      await stage.wait(500);
    }, 200);
  }
  return stage.dispose;
};

export default mount;
