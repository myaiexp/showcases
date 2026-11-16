// AligningGuidelines getObjectsByTarget and getPointMap hooks
import { Canvas, Circle, Rect, type FabricObject } from 'fabric';
import { AligningGuidelines } from 'fabric/extensions';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const BLUE = '#3b7dd8';
const RED = '#e94b3c';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 220],
    hint: 'getObjectsByTarget decides which objects a dragged shape aligns with; here only shapes of the same colour (the README warns to delete the target itself). getPointMap decides which of its points count: only the top-left corner in "tl only".',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const mk = (x: number, y: number, color: string, round = false): FabricObject =>
    round
      ? new Circle({ left: x, top: y, radius: 22, fill: color, opacity: 0.8, stroke: '#222', strokeWidth: 1 })
      : new Rect({ left: x, top: y, width: 60, height: 40, fill: color, opacity: 0.8, stroke: '#222', strokeWidth: 1 });
  const blueA = mk(70, 60, BLUE);
  const blueB = mk(240, 160, BLUE);
  const redA = mk(240, 60, RED, true);
  const redB = mk(80, 165, RED, true);
  canvas.add(blueA, blueB, redA, redB);

  const mode = { same: true, tlOnly: false };
  const guides = new AligningGuidelines(canvas, {
    getObjectsByTarget(target) {
      const set = new Set<FabricObject>();
      canvas.getObjects().forEach((o) => {
        if (!mode.same || o.fill === target.fill) set.add(o);
      });
      set.delete(target); // or the shape would align with itself
      return set;
    },
    getPointMap(target) {
      // v7 getCoords() is an array [tl, tr, br, bl] (the README's .tl is the old object form)
      const tl = target.getCoords()[0]!;
      return mode.tlOnly ? { tl } : AligningGuidelines.prototype.getPointMap.call(guides, target);
    },
  });
  stage.onDispose(() => guides.dispose());

  if (stage.bar) {
    select(stage.bar, 'aligns with', ['same colour only', 'every shape'] as const, (v) => (mode.same = v === 'same colour only'));
    select(stage.bar, 'points', ['default control points', 'tl only'] as const, (v) => (mode.tlOnly = v === 'tl only'));
  } else {
    const g = stage.ghost(canvas);
    stage.repeat(async () => {
      mode.same = !mode.same;
      redA.set({ left: 240, top: 60 });
      redA.setCoords();
      canvas.requestRenderAll();
      // red circle goes to blue's row and column: it only snaps when "every shape"
      await g.drag({ x: 240, y: 60 }, { x: 242, y: 120 }, 1100);
      await stage.wait(500);
      await g.dragTo({ x: 74, y: 128 }, 1100);
      await stage.wait(800);
    }, 300);
  }
  return stage.dispose;
};

export default mount;
