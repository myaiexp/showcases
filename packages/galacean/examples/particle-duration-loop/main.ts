// main.duration and isLoop: a one-shot burst replays only on play()
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx);
  const say = caption(stage, '');
  const { gen } = emitter(stage, root, { tint: [1, 0.7, 0.3] });
  gen.main.isLoop = false;
  gen.main.duration = 1.5;
  gen.emission.rateOverTime.constant = 30;
  const show = (): void => say(`isLoop = ${gen.main.isLoop}, duration = ${gen.main.duration}s, ${gen.isAlive ? 'alive' : 'finished'}`);
  let idle = 0;
  tick(root, (dt) => {
    show();
    idle = gen.isAlive ? 0 : idle + dt;
    if (!gen.main.isLoop && idle > 1.2 && stage.preview) gen.play(); // the card replays the one-shot by itself
  });
  if (!stage.preview) {
    checkbox(stage.bar, 'isLoop', false, (v) => ((gen.main.isLoop = v), gen.play()));
    slider(stage.bar, 'duration', 0.5, 5, 0.1, 1.5, (v) => ((gen.main.duration = v), gen.play()));
    stage.bar.append('When looping is off the burst ends: press play again by moving a control.');
  }
  return stage.dispose;
};

export default mount;
