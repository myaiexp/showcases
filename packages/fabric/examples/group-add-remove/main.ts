// Groups: add, insertAt and remove re-fit the group around its members
import { Canvas, Circle, Group, Rect, Triangle, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { BLUE, GREEN, nameIt, RED, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'The tinted box is the group. add() puts an object on top, insertAt(0, …) under everything, remove() takes one out; the group grows or shrinks to fit. New objects keep the canvas position they were given.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const originals = [nameIt(new Rect({ left: 140, top: 120, width: 70, height: 70, fill: RED }), 'rect#1'), nameIt(new Circle({ left: 195, top: 130, radius: 32, fill: BLUE }), 'circle#2')];
  const group = new Group(originals, { backgroundColor: 'rgba(100, 100, 255, 0.14)' });
  canvas.add(group);
  const say = status(stage);
  let n = 2;

  const report = (): void =>
    say(
      stage.preview
        ? `size() ${group.size()} · ${Math.round(group.width)}×${Math.round(group.height)} px`
        : `size() ${group.size()} · group ${Math.round(group.width)}×${Math.round(group.height)}\nbottom → top: ${group.getObjects().map(who).join(', ')}`,
    );
  const fresh = (): FabricObject => {
    n++;
    const at = { left: 40 + ((n * 83) % 280), top: 50 + ((n * 47) % 150) };
    return nameIt(n % 2 ? new Triangle({ ...at, width: 50, height: 46, fill: GREEN }) : new Rect({ ...at, width: 40, height: 40, fill: GREEN }), `${n % 2 ? 'tri' : 'rect'}#${n}`);
  };
  const commit = (): void => {
    group.setCoords();
    canvas.requestRenderAll();
    report();
  };
  const addOne = (): void => (group.add(fresh()), commit());
  const insert = (): void => (group.insertAt(0, fresh()), commit());
  const removeLast = (): void => (group.remove(...group.getObjects().slice(-1)), commit());
  report();

  if (stage.bar) {
    button(stage.bar, 'add()', addOne);
    button(stage.bar, 'insertAt(0)', insert);
    button(stage.bar, 'remove()', removeLast);
  } else {
    let step = 0;
    stage.every(900, () => {
      step++;
      if (group.size() > 4) (group.remove(group.getObjects().find((o) => !originals.includes(o as (typeof originals)[number]))!), commit());
      else if (step % 3 === 0) insert();
      else addOne();
    });
  }

  return stage.dispose;
};

export default mount;
