// Animate: seek(time, true) counts the delay in the timeline
import { Leafer } from 'leafer-ui';
import { Animate } from '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { button, slider } from '../../shared/controls.ts';
import { readout, track } from '../../shared/animate-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the slider: the first second is the delay, the square only moves after it.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const t = track(stage, leafer);
  let animate: Animate | undefined;
  stage.onDispose(() => animate?.destroy());
  const make = (): Animate => {
    animate?.destroy();
    t.rect.x = t.from;
    return (animate = new Animate(t.rect, { x: t.to }, { duration: 2, delay: 1, autoplay: false, easing: 'linear' }));
  };
  readout(stage, () => `time ${(animate?.time ?? 0).toFixed(2)}   running ${!!animate?.running}   completed ${!!animate?.completed}   destroyed ${!!animate?.destroyed}`);
  make();
  if (stage.bar) slider(stage.bar, 'seek (s, with delay)', 0, 3, 0.05, 0, (v) => animate?.seek(v, true));
  else {
    script(stage, async () => {
      make();
      for (const s of [0.5, 2, 1, 2.5, 3]) {
        animate?.seek(s, true); // includeDelay
        await stage.wait(800);
      }
    });
  }
  return stage.dispose;
};

export default mount;
