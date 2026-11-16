// Groups: the group transform and a member transform combine
import { Canvas, Circle, Group, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { BLUE, RED } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Scale or rotate the group and the red member: the member\'s own scaleX and angle stay what they were, while the transform it is drawn with (the product of both) changes.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const rect = new Rect({ left: 120, top: 120, width: 90, height: 50, fill: RED });
  const disc = new Circle({ left: 230, top: 120, radius: 36, fill: BLUE });
  const group = new Group([rect, disc], { left: 180, top: 120, backgroundColor: 'rgba(0,0,0,0.06)' });
  canvas.add(group);
  const say = status(stage);

  const report = (): void => {
    // calcTransformMatrix() multiplies the group's matrix in; qrDecompose reads the result back
    const drawn = util.qrDecompose(rect.calcTransformMatrix());
    say(
      `group  scaleX ${group.scaleX.toFixed(2)} · angle ${group.angle.toFixed(0)}°\nmember scaleX ${rect.scaleX.toFixed(2)} · angle ${rect.angle.toFixed(0)}°\ndrawn  scaleX ${drawn.scaleX.toFixed(2)} · angle ${drawn.angle.toFixed(0)}°`,
    );
  };
  const touch = (): void => {
    group.setCoords();
    canvas.requestRenderAll();
    report();
  };
  canvas.on('object:scaling', report);
  canvas.on('object:rotating', report);
  report();

  if (stage.bar) {
    slider(stage.bar, 'group scaleX', 0.5, 1.6, 0.05, 1, (v) => (group.set('scaleX', v), touch()), (v) => v.toFixed(2));
    slider(stage.bar, 'group angle', -90, 90, 1, 0, (v) => (group.set('angle', v), touch()), (v) => `${v}°`);
    slider(stage.bar, 'member scaleX', 0.5, 1.6, 0.05, 1, (v) => (rect.set('scaleX', v), group.triggerLayout(), touch()), (v) => v.toFixed(2));
    slider(stage.bar, 'member angle', -90, 90, 1, 0, (v) => (rect.set('angle', v), group.triggerLayout(), touch()), (v) => `${v}°`);
  } else {
    stage.loop((_dt, t) => {
      group.set({ scaleX: 1 + Math.sin(t * 1.2) * 0.3, angle: Math.sin(t * 0.7) * 35 });
      rect.set('angle', Math.sin(t * 1.9) * 25);
      group.triggerLayout();
      touch();
    });
  }

  return stage.dispose;
};

export default mount;
