// SphereShape: particles start inside a sphere and fly outward
import { SphereShape } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1, 8], target: [0, 0.3, 0] });
  const say = caption(stage, '');
  const e = emitter(stage, root, { tint: [0.7, 0.8, 1], position: [0, 0.3, 0] });
  const shape = new SphereShape();
  shape.radius = 0.8;
  e.gen.emission.shape = shape;
  e.gen.main.startSpeed.constant = 1.4;
  e.gen.main.startLifetime.constant = 1.5;
  e.gen.emission.rateOverTime.constant = 30;
  const note = (): void => say(`SphereShape.radius = ${shape.radius.toFixed(2)}`);
  if (stage.preview) tick(root, (_dt, t) => ((shape.radius = 0.7 + 0.6 * Math.sin(t)), note()));
  else slider(stage.bar, 'radius', 0.05, 2.5, 0.05, 0.8, (v) => ((shape.radius = v), note()));
  return stage.dispose;
};

export default mount;
