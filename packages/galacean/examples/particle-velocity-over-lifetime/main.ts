// velocityOverLifetime: sideways motion, constant or on a curve
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { constant, curve, emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 11] });
  caption(stage, 'velocityX: none | constant 1.5 | curve 0 to -3 across the life');
  const make = (x: number, tint: [number, number, number]) => {
    const e = emitter(stage, root, { position: [x, -1.8, 0], tint });
    e.gen.velocityOverLifetime.enabled = true;
    e.gen.main.startSpeed.constant = 2.2;
    e.gen.main.startLifetime.constant = 2;
    return e;
  };
  make(-2.6, [1, 0.55, 0.45]);
  const b = make(0, [0.5, 1, 0.55]);
  b.gen.velocityOverLifetime.velocityX = constant(1.5);
  const c = make(2.6, [0.5, 0.75, 1]);
  c.gen.velocityOverLifetime.velocityX = curve([0, 0], [1, -3]);
  if (!stage.preview) slider(stage.bar, 'middle velocityX', -4, 4, 0.1, 1.5, (v) => (b.gen.velocityOverLifetime.velocityX.constant = v));
  return stage.dispose;
};

export default mount;
