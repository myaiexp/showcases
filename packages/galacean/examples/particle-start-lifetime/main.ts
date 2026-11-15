// main.startLifetime: a constant, a random range and a curve
import { ParticleCurveMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { between, constant, curve, emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 11] });
  caption(stage, 'startLifetime: constant 1 | two constants 0.5 to 3 | curve');
  const make = (x: number, tint: [number, number, number]) => emitter(stage, root, { position: [x, -1.8, 0], tint });
  const a = make(-2.5, [1, 0.5, 0.4]);
  a.gen.main.startLifetime = constant(1);
  const b = make(0, [0.5, 1, 0.5]);
  b.gen.main.startLifetime = between(0.5, 3);
  const c = make(2.5, [0.5, 0.7, 1]);
  c.gen.main.startLifetime = curve([0, 3], [1, 0.4]);
  for (const e of [a, b, c]) e.gen.main.startSpeed.constant = 2.4;
  if (!stage.preview) {
    slider(stage.bar, 'left constant', 0.2, 4, 0.1, 1, (v) => (a.gen.main.startLifetime.constant = v));
    slider(stage.bar, 'middle max', 0.6, 5, 0.1, 3, (v) => (b.gen.main.startLifetime.constantMax = v));
    stage.bar.append(`modes: ${ParticleCurveMode[a.gen.main.startLifetime.mode]}, ${ParticleCurveMode[b.gen.main.startLifetime.mode]}, ${ParticleCurveMode[c.gen.main.startLifetime.mode]}`);
  }
  return stage.dispose;
};

export default mount;
