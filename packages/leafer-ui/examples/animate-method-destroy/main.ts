// Animate: destroy() ends the animation where it stands
import { Leafer } from 'leafer-ui';
import { Animate } from '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { button, slider } from '../../shared/controls.ts';
import { readout, track } from '../../shared/animate-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press destroy() while it slides: the square stays put.' });
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
    button(stage.bar, 'destroy()', () => animate?.destroy());
    button(stage.bar, 'new Animate', make);
  } else {
    script(stage, async () => {
      make();
      await stage.wait(1000);
      animate?.destroy();
      await stage.wait(1500);
    });
  }
  return stage.dispose;
};

export default mount;
