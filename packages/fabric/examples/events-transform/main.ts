// Events: moving, scaling, rotating, skewing per step, modified at the end
import { Canvas, Point, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { eventLog, nameIt, RED, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    height: 330,
    hint: 'Drag the rectangle to move it, a corner to scale, the top handle to rotate. Shift-drag a side handle to skew it. Moving events repeat while you drag; modified comes once on release.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const rect = nameIt(new Rect({ left: 180, top: 120, width: 110, height: 70, fill: RED }), 'red');
  canvas.add(rect);
  canvas.setActiveObject(rect);
  const log = eventLog(stage, 9);

  // Every moving/scaling/... event has `transform` (action, corner, current scale and skew),
  // `pointer` and `target`.
  const f = (n: number): string => n.toFixed(2);
  canvas.on('object:moving', ({ target }) => log.add('object:moving', `left ${Math.round(target.left)} top ${Math.round(target.top)}`));
  canvas.on('object:scaling', ({ target, transform }) =>
    log.add('object:scaling', `${transform.corner} · scaleX ${f(target.scaleX)} scaleY ${f(target.scaleY)}`),
  );
  canvas.on('object:rotating', ({ target }) => log.add('object:rotating', `angle ${target.angle.toFixed(0)}°`));
  canvas.on('object:skewing', ({ target, transform }) =>
    log.add('object:skewing', `${transform.corner} · skewX ${target.skewX.toFixed(0)} skewY ${target.skewY.toFixed(0)}`),
  );
  // modified: `action` names the control that was used (drag, scale, rotate, skewX, ...)
  canvas.on('object:modified', ({ target, action }) => log.add('object:modified', `${who(target)} · action ${action ?? '-'}`));

  if (stage.preview) {
    const ghost = stage.ghost(canvas);
    const at = (name: string): Point => {
      rect.setCoords();
      return controlPoint(rect, name);
    };
    stage.repeat(async () => {
      await ghost.drag(rect.getCenterPoint(), new Point(150, 110), 500);
      await ghost.drag(at('br'), at('br').add(new Point(24, 14)), 500);
      await ghost.drag(at('mtr'), at('mtr').add(new Point(50, 10)), 500);
      await ghost.drag(at('mr'), at('mr').add(new Point(0, 25)), 500, { shiftKey: true });
      await stage.wait(300);
      rect.set({ left: 180, top: 120, scaleX: 1, scaleY: 1, angle: 0, skewX: 0, skewY: 0 });
      rect.setCoords();
      canvas.requestRenderAll();
    }, 300);
  }

  return stage.dispose;
};

export default mount;
