// Events: the same interaction heard by the object and by the canvas
import { Canvas } from 'fabric';
import type { Mount } from '@/types.ts';
import { eventLog, trio, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    height: 300,
    hint: 'Only the red and blue shapes have their own listeners, so the canvas lines are the only ones that appear for green.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const { red, blue, green, all } = trio();
  canvas.add(...all);
  const log = eventLog(stage, 9);

  // On the canvas the names are prefixed ("object:moving", "mouse:down") and carry `target`.
  canvas.on('mouse:down', ({ target }) => log.add('canvas mouse:down', `target ${who(target)}`));
  canvas.on('selection:created', ({ selected }) => log.add('canvas selection:created', `selected ${selected.map(who).join(', ')}`));
  canvas.on('object:moving', ({ target }) => log.add('canvas object:moving', `target ${who(target)}`));
  canvas.on('object:modified', ({ target }) => log.add('canvas object:modified', `target ${who(target)}`));

  // On an object the same events have no prefix and the handler already knows its target.
  for (const obj of [red, blue]) {
    obj.on('mousedown', () => log.add(`${who(obj)} mousedown`));
    obj.on('selected', () => log.add(`${who(obj)} selected`));
    obj.on('moving', () => log.add(`${who(obj)} moving`));
    obj.on('modified', () => log.add(`${who(obj)} modified`));
  }

  if (stage.preview) {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      await ghost.click(red.getCenterPoint());
      await ghost.drag(red.getCenterPoint(), { x: 110, y: 80 }, 500);
      await ghost.click(green.getCenterPoint());
      await ghost.click({ x: 30, y: 30 });
      await stage.wait(400);
      red.set({ left: 80, top: 110 });
      red.setCoords();
      canvas.requestRenderAll();
    }, 300);
  }

  return stage.dispose;
};

export default mount;
