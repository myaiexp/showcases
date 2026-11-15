// Smoke puffs: normal blending, growing size, fading alpha, drift
import { BlendMode, ConeShape } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { between, constant, curve, emitter, fxStage, gradient } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1, 8], target: [0, 1, 0], background: [0.05, 0.07, 0.1, 1] });
  caption(stage, 'normal blend, size 0.5 > 2.4, alpha 0 > 0.5 > 0, velocityX drift');
  const e = emitter(stage, root, { position: [0, -1.8, 0], additive: false, tint: [0.7, 0.72, 0.76] });
  e.material.blendMode = BlendMode.Normal;
  const cone = new ConeShape();
  cone.angle = 10;
  cone.radius = 0.3;
  e.gen.emission.shape = cone;
  e.gen.main.startLifetime = between(2.4, 3.4);
  e.gen.main.startSpeed = between(0.6, 1);
  e.gen.main.startSize = constant(1);
  e.gen.main.startRotationZ = between(0, 360);
  e.gen.emission.rateOverTime.constant = 8;
  e.gen.sizeOverLifetime.enabled = true;
  e.gen.sizeOverLifetime.size = curve([0, 0.5], [1, 2.4]);
  e.gen.colorOverLifetime.enabled = true;
  e.gen.colorOverLifetime.color = gradient([[0, [1, 1, 1]], [1, [0.8, 0.8, 0.85]]], [[0, 0], [0.2, 0.5], [1, 0]]);
  e.gen.rotationOverLifetime.enabled = true;
  e.gen.rotationOverLifetime.rotationZ = between(-30, 30);
  e.gen.velocityOverLifetime.enabled = true;
  e.gen.velocityOverLifetime.velocityX = constant(0.5);
  if (!stage.preview) slider(stage.bar, 'drift (velocityX)', -2, 2, 0.1, 0.5, (v) => (e.gen.velocityOverLifetime.velocityX.constant = v));
  return stage.dispose;
};

export default mount;
