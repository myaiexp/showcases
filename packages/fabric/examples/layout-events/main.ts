// Layout managers: layout:before and layout:after with their context
import { Canvas, Circle, Group, Point, Rect, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { BLUE, eventLog, GREEN, nameIt, RED } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    height: 340,
    hint: 'Add or remove members, call triggerLayout(), or drag a member inside the interactive group. Each layout fires before and after events whose context names the trigger.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const log = eventLog(stage, 9);

  const build = (): Group => {
    const red = nameIt(new Rect({ left: 130, top: 105, width: 70, height: 70, fill: RED }), 'red');
    const blue = nameIt(new Circle({ left: 215, top: 105, radius: 36, fill: BLUE }), 'blue');
    const g = new Group([red, blue], { subTargetCheck: true, interactive: true, backgroundColor: 'rgba(100, 100, 255, 0.14)' });
    // the event carries `context`: `type` is why the layout ran, `trigger` the event behind it
    g.on('layout:before', ({ context }) => log.add('layout:before', `type ${context.type}${'trigger' in context ? ` · trigger ${context.trigger}` : ''}`));
    g.on('layout:after', ({ context, result }) => log.add('layout:after', `type ${context.type} · ${result ? `size ${Math.round(result.result?.size.x ?? 0)}×${Math.round(result.result?.size.y ?? 0)}` : 'skipped'}`));
    return g;
  };
  let group = build();
  canvas.add(group);

  let n = 0;
  const add = (): void => {
    group.add(nameIt(new Triangle({ left: 110 + ((n++ * 53) % 150), top: 150 + ((n * 17) % 40), width: 36, height: 34, fill: GREEN }), `tri#${n}`));
    group.setCoords();
    canvas.requestRenderAll();
  };
  const remove = (): void => {
    if (group.size() > 2) group.remove(group.item(group.size() - 1)!);
    group.setCoords();
    canvas.requestRenderAll();
  };
  const trigger = (): void => {
    group.triggerLayout();
    group.setCoords();
    canvas.requestRenderAll();
  };

  if (stage.bar) {
    button(stage.bar, 'add()', add);
    button(stage.bar, 'remove()', remove);
    button(stage.bar, 'triggerLayout()', trigger);
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      canvas.remove(group);
      log.clear();
      group = build();
      canvas.add(group);
      canvas.discardActiveObject();
      add();
      await stage.wait(800);
      trigger();
      await stage.wait(800);
      await ghost.drag(new Point(215, 105), new Point(250, 70), 600);
      await stage.wait(600);
      remove();
      await stage.wait(900);
      canvas.discardActiveObject();
    }, 300);
  }

  return stage.dispose;
};

export default mount;
