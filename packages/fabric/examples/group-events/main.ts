// Groups: a group fires mouse, selection and member events of its own
import { Canvas, Circle, Group, Rect, Triangle, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { BLUE, eventLog, GREEN, nameIt, RED, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    height: 330,
    hint: 'Click and drag the group, then add and remove members. The group hears pointer events with the member in subTargets; adding a member fires object:added on the group and added on the member.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const red = nameIt(new Rect({ left: 130, top: 105, width: 70, height: 70, fill: RED }), 'red');
  const blue = nameIt(new Circle({ left: 215, top: 105, radius: 36, fill: BLUE }), 'blue');
  const group = nameIt(new Group([red, blue], { subTargetCheck: true, backgroundColor: 'rgba(100, 100, 255, 0.12)' }), 'group');
  canvas.add(group);
  const log = eventLog(stage, 9);

  group.on('mousedown', ({ subTargets }) => log.add('group mousedown', `subTargets [${(subTargets ?? []).map(who).join(', ')}]`));
  group.on('selected', () => log.add('group selected'));
  group.on('deselected', () => log.add('group deselected'));
  group.on('moving', () => log.add('group moving'));
  group.on('modified', () => log.add('group modified'));
  // `object:added` / `object:removed` fire on the group, `added` / `removed` on the member
  group.on('object:added', ({ target }) => log.add('group object:added', who(target)));
  group.on('object:removed', ({ target }) => log.add('group object:removed', who(target)));
  const watch = (o: FabricObject): void => {
    o.on('added', ({ target }) => log.add(`${who(o)} added`, `to ${who(target as FabricObject)}`));
    o.on('removed', () => log.add(`${who(o)} removed`));
  };
  watch(red);
  watch(blue);

  let n = 0;
  const addOne = (): void => {
    const t = nameIt(new Triangle({ left: 120 + ((n * 61) % 120), top: 70 + ((n * 37) % 100), width: 40, height: 36, fill: GREEN }), `tri#${++n}`);
    watch(t);
    group.add(t);
    group.setCoords();
    canvas.requestRenderAll();
  };
  const removeOne = (): void => {
    const last = group.item(group.size() - 1);
    if (group.size() > 2 && last) group.remove(last);
    group.setCoords();
    canvas.requestRenderAll();
  };

  if (stage.bar) {
    button(stage.bar, 'add()', addOne);
    button(stage.bar, 'remove()', removeOne);
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      await ghost.click(blue.getCenterPoint());
      await ghost.drag(blue.getCenterPoint(), { x: 150, y: 90 }, 600);
      addOne();
      await stage.wait(700);
      removeOne();
      await stage.wait(700);
      canvas.discardActiveObject();
      group.set({ left: group.left, top: 120 });
      canvas.requestRenderAll();
    }, 300);
  }

  return stage.dispose;
};

export default mount;
