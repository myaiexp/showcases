// ParticleCompositeGradient from two gradients: a random blend each
import { ParticleCompositeGradient } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { emitter, fxStage, gradient } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 10] });
  caption(stage, 'gradientMin red to orange, gradientMax cyan to green; each particle lies in between');
  const e = emitter(stage, root, { position: [0, -1.8, 0] });
  const lo = gradient([[0, [1, 0.2, 0.2]], [1, [1, 0.7, 0.2]]], [[0, 1], [1, 0]]).gradient;
  const hi = gradient([[0, [0.2, 1, 1]], [1, [0.3, 1, 0.4]]], [[0, 1], [1, 0]]).gradient;
  e.gen.colorOverLifetime.enabled = true;
  e.gen.colorOverLifetime.color = new ParticleCompositeGradient(lo, hi);
  e.gen.main.startSize.constant = 0.5;
  e.gen.main.startLifetime.constant = 2.2;
  e.gen.emission.rateOverTime.constant = 22;
  return stage.dispose;
};

export default mount;
