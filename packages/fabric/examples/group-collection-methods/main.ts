// Groups: getObjects, item, size, contains and forEachObject
import { Canvas, Circle, Group, Rect, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { BLUE, GOLD, GREEN, nameIt, RED, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'The group has four members. Each button runs one of its collection methods and the readout shows what the others return.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const red = nameIt(new Rect({ left: 90, top: 120, width: 60, height: 60, fill: RED }), 'red');
  const blue = nameIt(new Circle({ left: 160, top: 120, radius: 30, fill: BLUE }), 'blue');
  const green = nameIt(new Triangle({ left: 230, top: 120, width: 60, height: 60, fill: GREEN }), 'green');
  const gold = nameIt(new Circle({ left: 295, top: 120, radius: 30, fill: GOLD }), 'gold');
  const group = new Group([red, blue, green, gold], { backgroundColor: 'rgba(0,0,0,0.05)' });
  canvas.add(group);
  const say = status(stage);

  const report = (): void => {
    say(
      stage.preview
        ? `size() ${group.size()} · item(1) ${who(group.item(1))}\ngetObjects('circle') ${group.getObjects('circle').map(who).join(', ') || '-'}`
        : `size() ${group.size()} · isEmpty() ${group.isEmpty()} · item(1) → ${who(group.item(1))}\ncontains(green) ${group.contains(green)} · getObjects('circle') → [${group.getObjects('circle').map(who).join(', ')}]`,
    );
  };
  const redraw = (): void => {
    group.setCoords();
    canvas.requestRenderAll();
    report();
  };
  const dim = (): void => {
    // forEachObject visits every member with its index
    group.forEachObject((o, i) => o.set('opacity', i % 2 ? 0.35 : 1));
    redraw();
  };
  const restore = (): void => {
    group.forEachObject((o) => o.set('opacity', 1));
    redraw();
  };
  const drop = (): void => {
    if (group.contains(green)) group.remove(green);
    else group.insertAt(2, green);
    redraw();
  };
  report();

  if (stage.bar) {
    button(stage.bar, 'forEachObject: dim odd members', dim);
    button(stage.bar, 'restore', restore);
    button(stage.bar, 'item(1).set(fill)', () => (group.item(1).set('fill', group.item(1).fill === BLUE ? RED : BLUE), redraw()));
    button(stage.bar, 'remove or insertAt(2) green', drop);
  } else {
    let i = 0;
    const steps = [dim, drop, restore, drop];
    stage.every(1000, () => steps[i++ % steps.length]!());
  }

  return stage.dispose;
};

export default mount;
