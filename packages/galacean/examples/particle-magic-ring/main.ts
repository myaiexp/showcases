// A magic ring: CircleShape with arcMode Loop sweeping round
import { CircleShape, ParticleShapeArcMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { between, constant, curve, emitter, fxStage, gradient } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 3, 8], target: [0, 0, 0] });
  caption(stage, 'CircleShape arcMode = Loop, arcSpeed 1.5, speed 0.6 up');
  const e = emitter(stage, root, { position: [0, -0.8, 0], tint: [0.8, 0.6, 1] });
  const ring = new CircleShape();
  ring.radius = 1.8;
  ring.arc = 360;
  ring.arcMode = ParticleShapeArcMode.Loop;
  ring.arcSpeed = 1.5;
  e.gen.emission.shape = ring;
  e.gen.main.startSpeed = constant(0.6);
  e.gen.main.startLifetime = between(1.2, 1.8);
  e.gen.main.startSize = constant(0.4);
  e.gen.emission.rateOverTime.constant = 40;
  e.gen.sizeOverLifetime.enabled = true;
  e.gen.sizeOverLifetime.size = curve([0, 0.4], [0.3, 1], [1, 0]);
  e.gen.colorOverLifetime.enabled = true;
  e.gen.colorOverLifetime.color = gradient([[0, [0.9, 0.7, 1]], [1, [0.3, 0.5, 1]]], [[0, 1], [1, 0]]);
  if (!stage.preview) slider(stage.bar, 'arcSpeed', 0, 4, 0.1, 1.5, (v) => (ring.arcSpeed = v));
  return stage.dispose;
};

export default mount;
