// emission.rateOverTime: constants and a curve over the duration
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { constant, curve, emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 11] });
  caption(stage, 'rateOverTime: 6 | 30 | curve 0 to 40 over a 4 s duration');
  const make = (x: number, tint: [number, number, number]) => emitter(stage, root, { position: [x, -1.8, 0], tint });
  const a = make(-2.6, [1, 0.5, 0.4]);
  a.gen.emission.rateOverTime = constant(6);
  const b = make(0, [0.5, 1, 0.5]);
  b.gen.emission.rateOverTime = constant(30);
  const c = make(2.6, [0.5, 0.7, 1]);
  c.gen.main.duration = 4;
  c.gen.emission.rateOverTime = curve([0, 0], [1, 40]);
  if (!stage.preview) slider(stage.bar, 'middle rateOverTime', 0, 60, 1, 30, (v) => (b.gen.emission.rateOverTime.constant = v));
  return stage.dispose;
};

export default mount;
