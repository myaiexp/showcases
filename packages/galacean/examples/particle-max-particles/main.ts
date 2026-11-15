// main.maxParticles caps how many particles live at once
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 11] });
  caption(stage, 'rate 30 per second, maxParticles: 4 | 12 | 100');
  const caps = [4, 12, 100];
  const list = caps.map((cap, i) => {
    const e = emitter(stage, root, { position: [-2.6 + i * 2.6, -1.8, 0], tint: [[1, 0.5, 0.4], [0.5, 1, 0.5], [0.5, 0.7, 1]][i] as [number, number, number] });
    e.gen.main.maxParticles = cap;
    e.gen.emission.rateOverTime.constant = 30;
    e.gen.main.startLifetime.constant = 1.8;
    return e;
  });
  if (!stage.preview) slider(stage.bar, 'left maxParticles', 1, 60, 1, 4, (v) => (list[0]!.gen.main.maxParticles = v));
  return stage.dispose;
};

export default mount;
