// Animate: seek({ type: 'percent' }) jumps to a share of the duration
import { Leafer } from 'leafer-ui';
import { Animate } from '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { button, slider } from '../../shared/controls.ts';
import { readout, track } from '../../shared/animate-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the slider: the square follows the share of the duration.' });
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
  if (stage.bar) slider(stage.bar, 'seek %', 0, 100, 1, 0, (v) => animate?.seek({ type: 'percent', value: v / 100 }));
  else {
    script(stage, async () => {
      make();
      for (const v of [0.25, 0.75, 0.1, 0.5, 1]) {
        animate?.seek({ type: 'percent', value: v });
        await stage.wait(800);
      }
    });
  }
  return stage.dispose;
};

export default mount;
