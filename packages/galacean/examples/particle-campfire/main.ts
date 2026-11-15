// A campfire from three renderers: flames, smoke and embers
import { BlendMode, ConeShape, SphereShape } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';
import { between, constant, curve, emitter, fxStage, gradient } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1, 8], target: [0, 1, 0], background: [0.02, 0.025, 0.04, 1] });
  caption(stage, 'flames (additive) + smoke (normal) + embers (gravity)');
  const flames = emitter(stage, root, { position: [0, -1.6, 0] });
  const flameCone = new ConeShape();
  flameCone.angle = 10;
  flameCone.radius = 0.4;
  flames.gen.emission.shape = flameCone;
  flames.gen.main.startLifetime = between(0.7, 1.3);
  flames.gen.main.startSpeed = between(1, 1.8);
  flames.gen.main.startSize = between(0.7, 1.1);
  flames.gen.emission.rateOverTime.constant = 22;
  flames.gen.sizeOverLifetime.enabled = true;
  flames.gen.sizeOverLifetime.size = curve([0, 1], [1, 0.1]);
  flames.gen.colorOverLifetime.enabled = true;
  flames.gen.colorOverLifetime.color = gradient([[0, [1, 0.95, 0.5]], [0.4, [1, 0.45, 0.1]], [1, [0.7, 0.1, 0.05]]], [[0, 0], [0.1, 0.9], [1, 0]]);

  const smoke = emitter(stage, root, { position: [0, -0.7, -0.2], additive: false, tint: [0.55, 0.57, 0.6] });
  smoke.material.blendMode = BlendMode.Normal;
  smoke.gen.main.startLifetime = between(2.2, 3);
  smoke.gen.main.startSpeed = between(0.5, 0.9);
  smoke.gen.main.startSize = constant(0.8);
  smoke.gen.emission.rateOverTime.constant = 5;
  smoke.gen.sizeOverLifetime.enabled = true;
  smoke.gen.sizeOverLifetime.size = curve([0, 0.5], [1, 2]);
  smoke.gen.colorOverLifetime.enabled = true;
  smoke.gen.colorOverLifetime.color = gradient([[0, [1, 1, 1]], [1, [1, 1, 1]]], [[0, 0], [0.25, 0.35], [1, 0]]);

  const embers = emitter(stage, root, { position: [0, -1.4, 0], tint: [1, 0.7, 0.3] });
  const sphere = new SphereShape();
  sphere.radius = 0.3;
  embers.gen.emission.shape = sphere;
  embers.gen.main.startSpeed = between(1.5, 3);
  embers.gen.main.startLifetime = between(1, 2);
  embers.gen.main.startSize = constant(0.07);
  embers.gen.main.gravityModifier = constant(-0.05);
  embers.gen.emission.rateOverTime.constant = 6;
  if (!stage.preview) checkbox(stage.bar, 'smoke', true, (v) => (smoke.entity.isActive = v));
  return stage.dispose;
};

export default mount;
