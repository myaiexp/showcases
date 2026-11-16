// Layout managers: FixedLayout keeps the width and height it was given
import { Canvas, Circle, FixedLayout, Group, LayoutManager, Point, Rect, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { BLUE, GREEN, nameIt, RED } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'The tinted box is a fixed 220 × 110 whatever the members do. Drag a member out and the box stays; the sliders resize it directly.',
  });
  const canvas = stage.own(new Canvas(stage.el));

  const build = (): Group => {
    const members = [
      nameIt(new Rect({ left: 115, top: 120, width: 70, height: 70, fill: RED }), 'red'),
      nameIt(new Circle({ left: 195, top: 120, radius: 34, fill: BLUE }), 'blue'),
      nameIt(new Triangle({ left: 270, top: 120, width: 64, height: 64, fill: GREEN }), 'green'),
    ];
    // width and height given here are kept by FixedLayout; the other strategies would overwrite them
    return new Group(members, {
      layoutManager: new LayoutManager(new FixedLayout()),
      width: 220,
      height: 110,
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

  if (stage.bar) {
    slider(stage.bar, 'width', 60, 340, 1, 220, (v) => (group.set('width', v), group.setCoords(), canvas.requestRenderAll()), (v) => `${v}px`);
    slider(stage.bar, 'height', 40, 220, 1, 110, (v) => (group.set('height', v), group.setCoords(), canvas.requestRenderAll()), (v) => `${v}px`);
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      canvas.remove(group);
      group = build();
      canvas.add(group);
      canvas.discardActiveObject();
      await stage.wait(600);
      await ghost.drag(new Point(115, 120), new Point(80, 210), 800);
      await stage.wait(800);
      for (const w of [150, 300, 220]) {
        group.set('width', w);
        group.setCoords();
        canvas.requestRenderAll();
        await stage.wait(600);
      }
      canvas.discardActiveObject();
    }, 200);
  }

  return stage.dispose;
};

export default mount;
