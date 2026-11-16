// uniformScaling keeps the aspect ratio when a corner is dragged
import { Canvas, Point, Rect, type TOptionalModifierKey } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, select } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'Drag a corner handle. With uniformScaling on the shape keeps its proportions; hold the uniScaleKey and the rule flips for that drag.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 95, top: 85, width: 90, height: 60, fill: '#8e5bd6', stroke: '#4e2a8c', strokeWidth: 2, strokeUniform: true });
  canvas.add(rect);
  canvas.setActiveObject(rect);

  const report = (extra = ''): void =>
    say(`uniformScaling ${canvas.uniformScaling}${extra}\nscaleX ${rect.scaleX.toFixed(2)} · scaleY ${rect.scaleY.toFixed(2)}`);
  canvas.on('object:scaling', () => report());
  report();

  if (stage.bar) {
    checkbox(stage.bar, 'uniformScaling', true, (v) => ((canvas.uniformScaling = v), report()));
    select(stage.bar, 'uniScaleKey', ['shiftKey', 'altKey', 'ctrlKey', 'metaKey'], (v) => ((canvas.uniScaleKey = v as TOptionalModifierKey), report()), 'shiftKey');
  } else {
    const ghost = stage.ghost(canvas);
    const runs = [
      { uniform: true, shift: false },
      { uniform: false, shift: false },
      { uniform: true, shift: true },
    ];
    let i = 0;
    stage.repeat(async () => {
      const run = runs[i++ % runs.length]!;
      canvas.uniformScaling = run.uniform;
      rect.set({ scaleX: 1, scaleY: 1 });
      rect.setCoords();
      canvas.requestRenderAll();
      report(run.shift ? ' + Shift' : '');
      const br = controlPoint(rect, 'br');
      await ghost.drag(br, br.add(new Point(45, 10)), 900, { shiftKey: run.shift });
      await stage.wait(800);
    }, 300);
  }

  return stage.dispose;
};

export default mount;
