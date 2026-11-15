// A fire from modules: cone, colour over lifetime, size over lifetime
import { ConeShape } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { between, curve, emitter, fxStage, gradient } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1, 8], target: [0, 1, 0] });
  caption(stage, 'cone + colorOverLifetime + sizeOverLifetime');
  const e = emitter(stage, root, { position: [0, -1.5, 0] });
  const cone = new ConeShape();
  cone.angle = 12;
  cone.radius = 0.35;
  e.gen.emission.shape = cone;
  e.gen.main.startLifetime = between(0.8, 1.6);
  e.gen.main.startSpeed = between(1, 2);
  e.gen.main.startSize = between(0.7, 1.2);
  e.gen.emission.rateOverTime.constant = 24;
  e.gen.sizeOverLifetime.enabled = true;
  e.gen.sizeOverLifetime.size = curve([0, 1], [1, 0.1]);
  e.gen.colorOverLifetime.enabled = true;
  e.gen.colorOverLifetime.color = gradient(
    [[0, [1, 0.95, 0.5]], [0.35, [1, 0.5, 0.1]], [1, [0.8, 0.1, 0.05]]],
    [[0, 0], [0.1, 0.9], [1, 0]],
  );
  if (!stage.preview) slider(stage.bar, 'cone angle', 0, 45, 1, 12, (v) => (cone.angle = v));
  return stage.dispose;
};

export default mount;
