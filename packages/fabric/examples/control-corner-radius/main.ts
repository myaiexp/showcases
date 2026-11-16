// Controls: a Control that edits a Rect's own rx/ry property instead of transforming it
import { Canvas, Control, Point, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [340, 240], hint: 'The yellow handle slides along the top edge and sets the corner radius.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 170, top: 125, width: 200, height: 120, rx: 20, ry: 20, fill: '#3b7dd8', cornerStyle: 'circle', cornerColor: '#9db8e8', transparentCorners: false });
  const radius = new Control({
    sizeX: 16,
    sizeY: 16,
    cursorStyle: 'ew-resize',
    actionName: 'cornerRadius',
    // the handle sits on the top edge, rx to the right of the top left corner (object units, then scaled)
    positionHandler: (dim, finalMatrix, obj) => {
      const r = obj as Rect;
      return new Point(-dim.x / 2 + r.rx * r.scaleX, -dim.y / 2).transform(finalMatrix);
    },
    actionHandler: (_e, transform, x, y) => {
      const r = transform.target as Rect;
      // pointer (scene plane) -> object plane: unscaled, unrotated, centre at (0, 0)
      const local = util.sendPointToPlane(new Point(x, y), undefined, r.calcTransformMatrix());
      const value = Math.round(Math.min(Math.max(local.x + r.width / 2, 0), Math.min(r.width, r.height) / 2));
      const changed = r.rx !== value;
      r.set({ rx: value, ry: value });
      return changed;
    },
  });
  rect.controls = { ...rect.controls, radius };
  canvas.add(rect);
  canvas.setActiveObject(rect);

  const show = (): void => {
    rect.setCoords();
    say(`rx = ry = ${rect.rx}`);
    canvas.requestRenderAll();
  };
  show();
  canvas.on('after:render', () => say(`rx = ry = ${rect.rx}`));

  if (stage.bar) slider(stage.bar, 'rx', 0, 60, 1, 20, (v) => { rect.set({ rx: v, ry: v }); show(); });
  else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      rect.set({ rx: 20, ry: 20 });
      show();
      const p = controlPoint(rect, 'radius');
      await ghost.drag(p, new Point(p.x + 45, p.y), 900);
      const q = controlPoint(rect, 'radius');
      await ghost.drag(q, new Point(q.x - 40, q.y), 900);
      await stage.wait(500);
    }, 200);
  }
  return stage.dispose;
};

export default mount;
