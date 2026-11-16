// Selection: multiSelectionStacking orders the members of a selection
import { ActiveSelection, Canvas, Circle, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { BLUE, GOLD, nameIt, RED, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

type Stacking = 'canvas-stacking' | 'selection-order';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'The shapes overlap: red is lowest, gold highest. Add them to a selection in a different order and compare how the selection stacks its members.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const red = nameIt(new Rect({ left: 130, top: 120, width: 110, height: 110, fill: RED }), 'red');
  const blue = nameIt(new Circle({ left: 180, top: 120, radius: 55, fill: BLUE }), 'blue');
  const gold = nameIt(new Rect({ left: 230, top: 120, width: 110, height: 110, fill: GOLD, angle: 12 }), 'gold');
  canvas.add(red, blue, gold);
  const say = status(stage);

  let mode: Stacking = 'selection-order';
  let sel: ActiveSelection | undefined;
  const report = (): void => say(`${mode}\nstack bottom → top: ${sel ? sel.getObjects().map(who).join(', ') : '-'}`);
  const reset = (): void => {
    canvas.discardActiveObject();
    sel = undefined;
    canvas.requestRenderAll();
    report();
  };
  // multiSelectAdd places each added object by the chosen stacking rule
  const add = (o: Rect | Circle): void => {
    if (!sel) {
      sel = new ActiveSelection([], { canvas, multiSelectionStacking: mode });
      canvas.setActiveObject(sel);
    }
    if (!sel.getObjects().includes(o)) sel.multiSelectAdd(o);
    canvas.requestRenderAll();
    report();
  };
  report();

  if (stage.bar) {
    select(stage.bar, 'multiSelectionStacking', ['selection-order', 'canvas-stacking'], (v) => {
      mode = v;
      reset();
    });
    for (const o of [gold, blue, red]) button(stage.bar, `multiSelectAdd(${who(o)})`, () => add(o));
    button(stage.bar, 'reset', reset);
  } else {
    stage.repeat(async () => {
      for (const m of ['selection-order', 'canvas-stacking'] as const) {
        mode = m;
        reset();
        for (const o of [gold, blue, red]) {
          add(o);
          await stage.wait(500);
        }
        await stage.wait(500);
      }
    }, 200);
  }

  return stage.dispose;
};

export default mount;
