// Events: object:added and object:removed, on the canvas and on the object
import { Canvas, Circle, Rect, Triangle, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { BLUE, eventLog, GOLD, GREEN, nameIt, RED, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    height: 330,
    hint: 'Each button changes the canvas; the log shows what fired, on the canvas and on the object.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const log = eventLog(stage, 9);
  let count = 0;

  canvas.on('object:added', ({ target }) => log.add('canvas object:added', who(target)));
  canvas.on('object:removed', ({ target }) => log.add('canvas object:removed', who(target)));
  canvas.on('canvas:cleared', () => log.add('canvas canvas:cleared'));

  const make = (): FabricObject => {
    const kind = count++ % 3;
    const at = { left: 50 + ((count * 67) % 260), top: 60 + ((count * 41) % 130) };
    const obj =
      kind === 0
        ? new Rect({ ...at, width: 56, height: 56, fill: RED })
        : kind === 1
          ? new Circle({ ...at, radius: 30, fill: BLUE })
          : new Triangle({ ...at, width: 60, height: 56, fill: GREEN });
    nameIt(obj, `${obj.type.toLowerCase()}#${count}`);
    // the object hears its own `added` and `removed` with the container as target
    obj.on('added', ({ target }) => log.add(`${who(obj)} added`, `to ${target === canvas ? 'canvas' : 'group'}`));
    obj.on('removed', () => log.add(`${who(obj)} removed`));
    return obj;
  };
  const add = (): void => void canvas.add(make());
  const removeLast = (): void => void canvas.remove(...canvas.getObjects().slice(-1));

  if (stage.bar) {
    button(stage.bar, 'add()', add);
    button(stage.bar, 'insertAt(0)', () => void canvas.insertAt(0, make()));
    button(stage.bar, 'remove()', removeLast);
    button(stage.bar, 'clear()', () => void canvas.clear());
  } else {
    const gold = new Circle({ left: 180, top: 120, radius: 22, fill: GOLD });
    canvas.add(gold);
    stage.every(800, () => (canvas.getObjects().length > 4 ? canvas.clear() : Math.random() < 0.25 ? removeLast() : add()));
  }

  return stage.dispose;
};

export default mount;
