// A fountain: a narrow fast cone pulled down by gravityModifier
import { ConeShape } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { between, constant, emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1, 9], target: [0, 1, 0] });
  caption(stage, 'cone angle 12, startSpeed 5 to 6, gravityModifier 0.5');
  const e = emitter(stage, root, { position: [0, -1.8, 0], tint: [0.55, 0.8, 1] });
  const cone = new ConeShape();
  cone.angle = 12;
  cone.radius = 0.08;
  e.gen.emission.shape = cone;
  e.gen.main.startSpeed = between(4.6, 5.6);
  e.gen.main.startLifetime = constant(2.2);
  e.gen.main.startSize = constant(0.22);
  e.gen.main.gravityModifier = constant(0.5);
  e.gen.emission.rateOverTime.constant = 36;
  if (!stage.preview) {
    slider(stage.bar, 'gravityModifier', 0.1, 1.2, 0.05, 0.5, (v) => (e.gen.main.gravityModifier.constant = v));
    slider(stage.bar, 'cone angle', 0, 40, 1, 12, (v) => (cone.angle = v));
  }
  return stage.dispose;
};

export default mount;
