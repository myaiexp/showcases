// Layout managers: FitContentLayout re-fits as members move
import { Canvas, Circle, FitContentLayout, Group, LayoutManager, Point, Rect, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { BLUE, GREEN, nameIt, RED } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Drag a member out of the group: the tinted box follows it. Changing a member from code does not re-fit by itself; triggerLayout() does.',
  });
  const canvas = stage.own(new Canvas(stage.el));

  const build = (): Group => {
    const red = nameIt(new Rect({ left: 115, top: 120, width: 70, height: 70, fill: RED }), 'red');
    const blue = nameIt(new Circle({ left: 195, top: 120, radius: 34, fill: BLUE }), 'blue');
    const green = nameIt(new Triangle({ left: 270, top: 120, width: 64, height: 64, fill: GREEN }), 'green');
    // FitContentLayout is what `new LayoutManager()` uses when no strategy is given
    return new Group([red, blue, green], {
      layoutManager: new LayoutManager(new FitContentLayout()),
      subTargetCheck: true,
      interactive: true,
      backgroundColor: 'rgba(100, 100, 255, 0.14)',
    });
  };
  let group = build();
  canvas.add(group);
  const say = status(stage);
  const report = (): void => say(`group ${Math.round(group.width)} × ${Math.round(group.height)}`);
  canvas.on('after:render', report);

  const nudge = (): void => {
    // a programmatic change: the box stays as it was until a layout is requested
    group.item(0).set('top', group.item(0).top - 40);
    group.item(0).setCoords();
    canvas.requestRenderAll();
  };
  const refit = (): void => {
    group.triggerLayout();
    group.setCoords();
    canvas.requestRenderAll();
  };

  if (stage.bar) {
    button(stage.bar, 'move red up with set()', nudge);
    button(stage.bar, 'triggerLayout()', refit);
    button(stage.bar, 'reset', () => {
      canvas.remove(group);
      group = build();
      canvas.add(group);
    });
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      canvas.remove(group);
      group = build();
      canvas.add(group);
      canvas.discardActiveObject();
      await stage.wait(600);
      await ghost.drag(new Point(115, 120), new Point(95, 205), 800);
      await stage.wait(700);
      await ghost.drag(new Point(270, 120), new Point(300, 40), 800);
      await stage.wait(1200);
      canvas.discardActiveObject();
    }, 200);
  }

  return stage.dispose;
};

export default mount;
