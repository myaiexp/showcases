// Animate: pause() freezes the animation in place
import { Leafer } from 'leafer-ui';
import { Animate } from '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { button, slider } from '../../shared/controls.ts';
import { readout, track } from '../../shared/animate-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'pause() and play() while the square slides.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const t = track(stage, leafer);
  let animate: Animate | undefined;
  stage.onDispose(() => animate?.destroy());
  const make = (): Animate => {
    animate?.destroy();
    t.rect.x = t.from;
    return (animate = new Animate(t.rect, { x: t.to }, { duration: 3 }));
  };
  readout(stage, () => `time ${(animate?.time ?? 0).toFixed(2)}   running ${!!animate?.running}   completed ${!!animate?.completed}   destroyed ${!!animate?.destroyed}`);
  make();
  if (stage.bar) {
    button(stage.bar, 'pause()', () => animate?.pause());
    button(stage.bar, 'play()', () => animate?.play());
    button(stage.bar, 'new Animate', make);
  } else {
    script(stage, async () => {
      make();
      await stage.wait(900);
      animate?.pause();
      await stage.wait(1000);
      animate?.play();
      await stage.wait(2600);
    });
  }
  return stage.dispose;
};

export default mount;
