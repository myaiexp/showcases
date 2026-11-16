// Events: mouse:over and mouse:out highlight the shape under the pointer
import { Canvas, Shadow, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { trio, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: 'Move the pointer over the shapes: they light up on mouse:over and settle on mouse:out.' });
  const canvas = stage.own(new Canvas(stage.el));
  const { all, red, blue, green } = trio();
  canvas.add(...all);
  const say = status(stage, 'pointer outside');
  const base = new Map<FabricObject, string>(all.map((o) => [o, String(o.fill)]));

  // the guide's pattern: over → highlight, out → restore. `target` is the object entered or left.
  const light = (o: FabricObject, on: boolean): void => {
    o.set({ fill: on ? '#ffc53d' : base.get(o), scaleX: on ? 1.12 : 1, scaleY: on ? 1.12 : 1, shadow: on ? new Shadow({ color: 'rgba(0,0,0,0.35)', blur: 14, offsetX: 4, offsetY: 6 }) : null });
    canvas.requestRenderAll();
  };
  canvas.on('mouse:over', ({ target }) => {
    if (!target) return;
    light(target, true);
    say(`over ${who(target)}`);
  });
  canvas.on('mouse:out', ({ target }) => {
    if (!target) return;
    light(target, false);
    say('pointer outside');
  });

  if (stage.bar) {
    // the cursor shown over objects is an option too
    select(stage.bar, 'hoverCursor', ['move', 'pointer', 'crosshair', 'grab', 'not-allowed'], (v) => (canvas.hoverCursor = v));
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      for (const o of [red, blue, green]) await ghost.move(o.getCenterPoint(), 700);
      await ghost.move({ x: 180, y: 215 }, 500);
      await stage.wait(300);
    }, 200);
  }

  return stage.dispose;
};

export default mount;
