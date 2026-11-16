// Animation: an endless animation loop that you can stop cleanly
import { Canvas, Circle, runningAnimations, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'The loop restarts itself from onComplete until a flag says stop. Stopping also aborts the running step, so nothing is left in runningAnimations.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, '');

  const orb = new Circle({ left: 70, top: 120, radius: 28, fill: '#8e6bd8' });
  canvas.add(orb);

  let looping = false;
  let current: ReturnType<typeof util.animate> | undefined;
  const mine = (): number => runningAnimations.filter((a) => a.target === orb).length;

  const swing = (): void => {
    if (!looping) return;
    const to = orb.left < 180 ? 290 : 70;
    current = orb.animate(
      { left: to },
      {
        duration: 900,
        easing: util.ease.easeInOutCubic,
        onChange: () => canvas.requestRenderAll(),
        onComplete: swing, // the loop: the end of one trip starts the next
      },
    ).left;
  };
  const toggle = (on: boolean): void => {
    if (on === looping) return;
    looping = on;
    if (on) swing();
    else {
      current?.abort(); // the flag stops the loop, abort() stops the trip in flight
      runningAnimations.cancelByTarget(orb);
    }
  };

  toggle(true);
  stage.every(150, () => say(`${looping ? 'looping' : 'stopped'}   animations on the orb: ${mine()}`));
  if (stage.preview) stage.every(2800, () => toggle(!looping));
  else {
    button(stage.bar!, 'Start', () => toggle(true));
    button(stage.bar!, 'Stop', () => toggle(false));
  }
  stage.onDispose(() => toggle(false));

  return stage.dispose;
};

export default mount;
