// main.startDelay: the generator waits before emitting
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { constant, emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx);
  const say = caption(stage, '');
  const { gen } = emitter(stage, root, { tint: [0.6, 1, 0.6] });
  gen.main.isLoop = false;
  gen.main.duration = 2;
  gen.main.startDelay = constant(1.5);
  gen.emission.rateOverTime.constant = 25;
  let clock = 0;
  tick(root, (dt) => {
    clock += dt;
    say(`startDelay = ${gen.main.startDelay.constant}s | ${clock < gen.main.startDelay.constant ? 'waiting' : 'emitting'} (t = ${clock.toFixed(1)}s)`);
    if (clock > 5.5) {
      clock = 0;
      gen.play();
    }
  });
  if (!stage.preview) slider(stage.bar, 'startDelay', 0, 4, 0.1, 1.5, (v) => ((gen.main.startDelay = constant(v)), (clock = 0), gen.play()));
  return stage.dispose;
};

export default mount;
