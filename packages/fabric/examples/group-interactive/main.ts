// Groups: subTargetCheck plus interactive select members inside a group
import { Canvas, Circle, Group, Point, Rect, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { BLUE, GREEN, nameIt, RED, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Click a shape: with interactive on you select the member, not the group, and can drag it out; the group box follows. Turn it off to get the whole group again.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  let interactive = true;

  const build = (): Group => {
    const members = [
      nameIt(new Rect({ left: 105, top: 120, width: 76, height: 76, fill: RED }), 'red'),
      nameIt(new Circle({ left: 190, top: 120, radius: 38, fill: BLUE }), 'blue'),
      nameIt(new Triangle({ left: 265, top: 120, width: 76, height: 76, fill: GREEN }), 'green'),
    ];
    // both flags are needed: subTargetCheck finds members, interactive lets them be the target
    return nameIt(new Group(members, { subTargetCheck: true, interactive, backgroundColor: 'rgba(100, 100, 255, 0.13)' }), 'group');
  };
  let group = build();
  canvas.add(group);
  const say = status(stage, 'nothing selected');

  const report = (): void => {
    const a = canvas.getActiveObject();
    say(a ? `selected ${who(a)} · parent ${who(a.parent)}` : 'nothing selected');
  };
  canvas.on('selection:created', report);
  canvas.on('selection:updated', report);
  canvas.on('selection:cleared', report);

  if (stage.bar) {
    checkbox(stage.bar, 'interactive', true, (v) => {
      interactive = v;
      group.interactive = v;
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    });
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      canvas.remove(group);
      group = build();
      canvas.add(group);
      canvas.discardActiveObject();
      await ghost.click(new Point(190, 120));
      await stage.wait(500);
      await ghost.drag(new Point(190, 120), new Point(220, 40), 700);
      await stage.wait(900);
      await ghost.click(new Point(30, 215));
      await stage.wait(400);
    }, 200);
  }

  return stage.dispose;
};

export default mount;
