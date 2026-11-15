// rotationOverLifetime: z spin as a constant or a curve
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { arrowTexture, constant, curve, emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 11] });
  caption(stage, 'rotationZ: none | 180 deg/s | curve 0 to 540');
  const make = (x: number, tint: [number, number, number]) => {
    const e = emitter(stage, root, { position: [x, -1.8, 0], texture: arrowTexture(stage), tint });
    e.gen.rotationOverLifetime.enabled = true;
    e.gen.main.startSize.constant = 0.6;
    e.gen.main.startSpeed.constant = 1.6;
    e.gen.main.startLifetime.constant = 2.2;
    e.gen.emission.rateOverTime.constant = 6;
    return e;
  };
  make(-2.6, [1, 0.6, 0.5]);
  const b = make(0, [0.55, 1, 0.55]);
  b.gen.rotationOverLifetime.rotationZ = constant(180);
  const c = make(2.6, [0.55, 0.75, 1]);
  c.gen.rotationOverLifetime.rotationZ = curve([0, 0], [1, 540]);
  if (!stage.preview) slider(stage.bar, 'middle rotationZ', -720, 720, 10, 180, (v) => (b.gen.rotationOverLifetime.rotationZ.constant = v));
  return stage.dispose;
};

export default mount;
