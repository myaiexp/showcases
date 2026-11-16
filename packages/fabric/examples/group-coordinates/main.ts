// Groups: member left/top are measured from the group centre
import { Canvas, Circle, Group } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { BLUE, GREEN, RED } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Three circles were given left 0, 80 and 160. Inside the group their left is measured from the group centre; getCenterPoint() gives the scene position. Move or rotate the group: the first never changes, the second follows.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const circles = [
    new Circle({ radius: 28, fill: RED, left: 0 }),
    new Circle({ radius: 28, fill: GREEN, left: 80 }),
    new Circle({ radius: 28, fill: BLUE, left: 160 }),
  ];
  const group = new Group(circles, { left: 180, top: 120 });
  canvas.add(group);
  const say = status(stage);

  const report = (): void => {
    const rel = circles.map((c) => `${Math.round(c.left)}`).join(', ');
    const abs = circles.map((c) => `${Math.round(c.getCenterPoint().x)}`).join(', ');
    say(
      stage.preview
        ? `inside the group: ${rel}\non the canvas: ${abs}`
        : `group centre (${Math.round(group.left)}, ${Math.round(group.top)}) · angle ${Math.round(group.angle)}°\nmember left inside the group: ${rel}\nmember centre x on the canvas: ${abs}`,
    );
  };
  canvas.on('object:moving', report);
  canvas.on('object:rotating', report);
  report();

  if (stage.bar) {
    slider(stage.bar, 'group left', 60, 300, 1, 180, (v) => (group.set('left', v), group.setCoords(), canvas.requestRenderAll(), report()));
    slider(stage.bar, 'group angle', -90, 90, 1, 0, (v) => (group.rotate(v), group.setCoords(), canvas.requestRenderAll(), report()), (v) => `${v}°`);
  } else {
    stage.loop((_dt, t) => {
      group.set({ left: 180 + Math.sin(t) * 50, angle: Math.sin(t * 0.8) * 40 });
      group.setCoords();
      canvas.requestRenderAll();
      report();
    });
  }

  return stage.dispose;
};

export default mount;
