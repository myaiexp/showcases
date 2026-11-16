// Animate: seek(seconds) jumps to a time in the animation
import { Leafer } from 'leafer-ui';
import { Animate } from '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { button, slider } from '../../shared/controls.ts';
import { readout, track } from '../../shared/animate-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the slider: seek(seconds) puts the square where it is at that time.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const t = track(stage, leafer);
  let animate: Animate | undefined;
  stage.onDispose(() => animate?.destroy());
  const make = (): Animate => {
    animate?.destroy();
    t.rect.x = t.from;
    return (animate = new Animate(t.rect, { x: t.to }, { duration: 2, autoplay: false, easing: 'linear' }));
  };
  readout(stage, () => `time ${(animate?.time ?? 0).toFixed(2)}   running ${!!animate?.running}   completed ${!!animate?.completed}   destroyed ${!!animate?.destroyed}`);
  make();
  if (stage.bar) slider(stage.bar, 'seek (s)', 0, 2, 0.05, 0, (v) => animate?.seek(v));
  else {
    script(stage, async () => {
      make();
      for (const s of [0.5, 1.5, 0.2, 1, 2]) {
        animate?.seek(s);
        await stage.wait(800);
      }
    });
  }
  return stage.dispose;
};

export default mount;
