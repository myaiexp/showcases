// Animation: grow an object on mouse over and shrink it on mouse out
import { Canvas, Circle, Rect, Triangle, runningAnimations, util, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Move the pointer over a shape. mouse:over starts an animation and mouse:out reverses it; a new animation replaces the running one.',
  });
  const canvas = stage.own(new Canvas(stage.el, { hoverCursor: 'pointer', selection: false }));
  const say = status(stage, 'hover a shape');

  const shapes: FabricObject[] = [
    new Rect({ left: 70, top: 120, width: 70, height: 70, fill: '#e94b3c' }),
    new Circle({ left: 180, top: 120, radius: 36, fill: '#3b7dd8' }),
    new Triangle({ left: 290, top: 120, width: 74, height: 70, fill: '#2e9e5b' }),
  ];
  for (const s of shapes) s.set({ selectable: false, hasControls: false });
  canvas.add(...shapes);

  // the guide's "animate on mouse over": one handler for every object, keyed on the event target
  const grow = (target: FabricObject, big: boolean): void => {
    runningAnimations.cancelByTarget(target); // drop the half-done opposite move first
    target.animate(
      { scaleX: big ? 1.4 : 1, scaleY: big ? 1.4 : 1, angle: big ? 15 : 0 },
      { duration: 350, easing: util.ease.easeOutBack, onChange: () => canvas.requestRenderAll() },
    );
  };
  canvas.on('mouse:over', (e) => {
    if (!e.target) return;
    grow(e.target, true);
    say(`over ${e.target.type}`);
  });
  canvas.on('mouse:out', (e) => {
    if (!e.target) return;
    grow(e.target, false);
    say('out');
  });

  if (stage.preview) {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      for (const s of shapes) {
        await ghost.move(s.getCenterPoint(), 500);
        await stage.wait(600);
      }
      ghost.leave();
    }, 400);
  }

  return stage.dispose;
};

export default mount;
