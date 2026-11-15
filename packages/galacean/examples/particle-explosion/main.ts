// An explosion: one burst from a sphere, shaped by size and colour curves
import { Burst, SphereShape } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { button } from '../../shared/controls.ts';
import { between, constant, curve, emitter, fxStage, gradient } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 0, 9], target: [0, 0, 0] });
  caption(stage, 'Burst(0, 80) from a SphereShape, loop of 2.5 s');
  const e = emitter(stage, root, { position: [0, 0, 0] });
  const sphere = new SphereShape();
  sphere.radius = 0.1;
  e.gen.emission.shape = sphere;
  e.gen.main.duration = 2.5;
  e.gen.main.startSpeed = between(1.5, 4);
  e.gen.main.startLifetime = between(0.6, 1.3);
  e.gen.main.startSize = between(0.6, 1.2);
  e.gen.emission.rateOverTime = constant(0);
  e.gen.emission.addBurst(new Burst(0, constant(80)));
  e.gen.sizeOverLifetime.enabled = true;
  e.gen.sizeOverLifetime.size = curve([0, 0.3], [0.2, 1], [1, 0.4]);
  e.gen.colorOverLifetime.enabled = true;
  e.gen.colorOverLifetime.color = gradient([[0, [1, 1, 0.8]], [0.25, [1, 0.6, 0.15]], [1, [0.3, 0.1, 0.1]]], [[0, 1], [0.6, 0.8], [1, 0]]);
  if (!stage.preview) button(stage.bar, 'play()', () => e.gen.play());
  return stage.dispose;
};

export default mount;
