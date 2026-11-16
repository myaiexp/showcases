// Selection: setActiveObject, getActiveObject and discardActiveObject
import { Canvas } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { trio, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'The buttons select from code; none of these calls repaint, so each is followed by requestRenderAll(). Clicking a shape works as well.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const { red, blue, green, all } = trio();
  canvas.add(...all);
  const say = status(stage);

  const report = (): void => {
    const active = canvas.getActiveObject();
    say(`getActiveObject() → ${who(active)}\ngetActiveObjects() → [${canvas.getActiveObjects().map(who).join(', ')}]`);
  };
  canvas.on('selection:created', report);
  canvas.on('selection:updated', report);
  canvas.on('selection:cleared', report);
  report();

  const pick = (o: (typeof all)[number]): void => {
    canvas.setActiveObject(o);
    canvas.requestRenderAll();
    report();
  };
  const drop = (): void => {
    canvas.discardActiveObject();
    canvas.requestRenderAll();
    report();
  };

  if (stage.bar) {
    for (const o of all) button(stage.bar, `setActiveObject(${who(o)})`, () => pick(o));
    button(stage.bar, 'discardActiveObject()', drop);
  } else {
    let i = 0;
    const steps = [red, blue, green, null] as const;
    stage.every(900, () => {
      const o = steps[i++ % steps.length];
      if (o) pick(o);
      else drop();
    });
  }

  return stage.dispose;
};

export default mount;
