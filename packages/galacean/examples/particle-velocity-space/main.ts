// velocityOverLifetime.space: Local turns with the emitter, World not
import { ParticleSimulationSpace } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { constant, emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 0, 10], target: [0, 0, 0] });
  caption(stage, 'both add velocityX = 2 while the emitters turn | left Local, right World');
  const list = (['Local', 'World'] as const).map((space, i) => {
    const e = emitter(stage, root, { position: [-2.5 + i * 5, 0, 0], tint: i ? [0.5, 0.8, 1] : [1, 0.6, 0.4], rotation: [0, 0, 0] });
    e.gen.velocityOverLifetime.enabled = true;
    e.gen.velocityOverLifetime.velocityX = constant(2);
    e.gen.velocityOverLifetime.space = ParticleSimulationSpace[space];
    e.gen.main.startSpeed.constant = 0;
    e.gen.main.startLifetime.constant = 1.6;
    e.gen.main.simulationSpace = ParticleSimulationSpace.World;
    e.gen.emission.rateOverTime.constant = 14;
    return e;
  });
  for (const e of list) tick(e.entity, (dt) => e.entity.transform.rotate(0, 0, 55 * dt));
  if (!stage.preview) select(stage.bar, 'left space', ['Local', 'World'] as const, (v) => (list[0]!.gen.velocityOverLifetime.space = ParticleSimulationSpace[v]));
  return stage.dispose;
};

export default mount;
