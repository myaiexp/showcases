// Canvas: per-object selectable false and evented false opt single objects out of interaction
import { Canvas, Circle, Rect, Triangle, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [300, 200],
    hint: 'Red: normal. Blue: selectable false, so it is not picked but still hears events. Green: evented false, so the pointer passes through it. Click each one.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, 'click a shape');

  const red = new Rect({ left: 70, top: 100, width: 70, height: 70, fill: '#e94b3c' });
  const blue = new Circle({ left: 150, top: 100, radius: 36, fill: '#3b7dd8', selectable: false });
  const green = new Triangle({ left: 235, top: 100, width: 70, height: 70, fill: '#2e9e5b', evented: false });
  canvas.add(red, blue, green);
  const names = new Map<FabricObject, string>([[red, 'red'], [blue, 'blue'], [green, 'green']]);

  canvas.on('mouse:down', ({ target }) => {
    const name = target ? names.get(target) : undefined;
    const picked = canvas.getActiveObject();
    say(`mouse:down on ${name ?? 'nothing'}\nselected: ${picked ? names.get(picked) : 'nothing'}`);
  });
  canvas.on('mouse:over', ({ target }) => target && say(`mouse:over ${names.get(target)}`));

  if (stage.preview) {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      for (const o of [red, blue, green]) {
        await ghost.click(o.getCenterPoint());
        await stage.wait(500);
      }
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }, 400);
  }

  return stage.dispose;
};

export default mount;
