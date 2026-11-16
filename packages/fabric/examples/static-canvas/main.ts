// StaticCanvas draws the same objects as Canvas but has no selection
import { Canvas, Circle, Point, Rect, StaticCanvas } from 'fabric';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['Canvas', 'StaticCanvas'],
    hint: 'Same objects, same API. Try to drag a shape on each side: only the Canvas on the left answers.',
  });
  const [left, right] = stage.panes as [(typeof stage.panes)[0], (typeof stage.panes)[0]];
  const interactive = stage.own(new Canvas(left.el), left);
  const fixed = stage.own(new StaticCanvas(right.el), right);
  const say = status(stage, '', right);

  const scene = (c: Canvas | StaticCanvas, w: number, h: number): Rect => {
    const rect = new Rect({ left: w * 0.38, top: h * 0.5, width: w * 0.3, height: h * 0.3, fill: '#3b7dd8', angle: 15 });
    c.add(rect, new Circle({ left: w * 0.66, top: h * 0.6, radius: w * 0.14, fill: '#e94b3c' }));
    return rect;
  };
  const a = scene(interactive, left.width, left.height);
  const b = scene(fixed, right.width, right.height);

  // Both canvases share one object model, so the same set() works on either; only events differ.
  stage.loop((_dt, t) => {
    b.set({ angle: 15 + 25 * Math.sin(t * 1.5) });
    fixed.requestRenderAll();
  });
  say('no events');
  interactive.setActiveObject(a);
  if (stage.preview) {
    const ghost = stage.ghost(interactive);
    stage.repeat(async () => {
      await ghost.drag(a.getCenterPoint(), a.getCenterPoint().add(new Point(14, -26)), 700);
      await ghost.drag(a.getCenterPoint(), new Point(left.width * 0.38, left.height * 0.5), 700);
    }, 500);
  }

  return stage.dispose;
};

export default mount;
