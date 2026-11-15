// Fireworks: bursts from a SphereShape with gravity and a fading colour
import { Burst, SphereShape } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { button } from '../../shared/controls.ts';
import { between, constant, curve, emitter, fxStage, gradient } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1, 10], target: [0, 1, 0] });
  caption(stage, 'startDelay + a burst of 60 from a SphereShape, gravity, colour over lifetime');
  const shells = [[-2, 0.8, [1, 0.6, 0.3]], [2, 1.6, [0.4, 0.8, 1]]] as const;
  const list = shells.map(([x, y, tint], i) => {
    const e = emitter(stage, root, { position: [x, y, 0], tint: [...tint] });
    const sphere = new SphereShape();
    sphere.radius = 0.05;
    e.gen.emission.shape = sphere;
    e.gen.main.duration = 3;
    e.gen.main.startDelay = constant(i * 1.4);
    e.gen.main.startSpeed = between(1.6, 2.4);
    e.gen.main.startLifetime = constant(1.5);
    e.gen.main.startSize = constant(0.18);
    e.gen.main.gravityModifier = constant(0.12);
    e.gen.emission.rateOverTime = constant(0);
    e.gen.emission.addBurst(new Burst(0, constant(60)));
    e.gen.sizeOverLifetime.enabled = true;
    e.gen.sizeOverLifetime.size = curve([0, 1], [1, 0.3]);
    e.gen.colorOverLifetime.enabled = true;
    e.gen.colorOverLifetime.color = gradient([[0, [1, 1, 1]], [0.3, tint as [number, number, number]], [1, [0.6, 0.2, 0.2]]], [[0, 1], [0.7, 1], [1, 0]]);
    return e;
  });
  if (!stage.preview) button(stage.bar, 'launch again', () => list.forEach((e) => e.gen.play()));
  return stage.dispose;
};

export default mount;
