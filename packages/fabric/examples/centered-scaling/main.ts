// centeredScaling scales around the centre; centeredRotation picks the pivot
import { Canvas, Point, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [300, 200],
    hint: 'The square is anchored at its top-left corner. Scale from a corner, or turn it with the top handle, with each switch on and off.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  // Origin top-left so that "around the centre" and "around the corner" look different.
  const rect = new Rect({ left: 110, top: 60, width: 90, height: 90, originX: 'left', originY: 'top', fill: '#2e9e5b', stroke: '#1a6638', strokeWidth: 2 });
  canvas.add(rect);
  canvas.setActiveObject(rect);

  // The canvas flag is OR-ed with each object's own centeredRotation (true by default),
  // so for a visible change the object's flag is set too.
  const setRotation = (v: boolean): void => {
    canvas.centeredRotation = v;
    rect.centeredRotation = v;
  };
  setRotation(false);
  canvas.centeredScaling = false;
  const report = (): void => say(`centeredScaling ${canvas.centeredScaling}\ncenteredRotation ${canvas.centeredRotation}`);
  report();

  if (stage.bar) {
    checkbox(stage.bar, 'centeredScaling', false, (v) => ((canvas.centeredScaling = v), report()));
    checkbox(stage.bar, 'centeredRotation', false, (v) => (setRotation(v), report()));
  } else {
    const ghost = stage.ghost(canvas);
    let on = false;
    stage.repeat(async () => {
      canvas.centeredScaling = on;
      setRotation(on);
      rect.set({ left: 110, top: 60, scaleX: 1, scaleY: 1, angle: 0 });
      rect.setCoords();
      canvas.requestRenderAll();
      report();
      const br = controlPoint(rect, 'br');
      await ghost.drag(br, br.add(new Point(40, 30)), 800);
      const mtr = controlPoint(rect, 'mtr');
      await ghost.drag(mtr, mtr.add(new Point(70, 30)), 800);
      await stage.wait(700);
      on = !on;
    }, 300);
  }

  return stage.dispose;
};

export default mount;
