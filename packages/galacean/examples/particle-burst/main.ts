// emission.addBurst(new Burst(time, count)): counts released at set times
import { Burst } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { button } from '../../shared/controls.ts';
import { constant, emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 10] });
  const say = caption(stage, 'rate 0; bursts at 0 s (6), 1 s (14), 2 s (30) in a 3 s loop');
  const e = emitter(stage, root, { tint: [1, 0.75, 0.35], position: [0, -1.8, 0] });
  e.gen.main.duration = 3;
  e.gen.emission.rateOverTime = constant(0);
  e.gen.main.startSpeed.constant = 3;
  e.gen.main.startLifetime.constant = 1.4;
  e.gen.main.gravityModifier.constant = 0.1;
  const bursts = [new Burst(0, constant(6)), new Burst(1, constant(14)), new Burst(2, constant(30))];
  for (const b of bursts) e.gen.emission.addBurst(b);
  if (!stage.preview) {
    button(stage.bar, 'clearBurst()', () => (e.gen.emission.clearBurst(), say('bursts cleared')));
    button(stage.bar, 'removeBurstByIndex(0)', () => (e.gen.emission.bursts.length && e.gen.emission.removeBurstByIndex(0), say(`${e.gen.emission.bursts.length} bursts left`)));
    button(stage.bar, 'addBurst(0.5 s, 20)', () => (e.gen.emission.addBurst(new Burst(0.5, constant(20))), say(`${e.gen.emission.bursts.length} bursts`)));
  }
  return stage.dispose;
};

export default mount;
