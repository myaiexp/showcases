// main.simulationSpace: Local rides with the emitter, World stays
import { ParticleSimulationSpace } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1, 10], target: [0, 1, 0] });
  caption(stage, 'the emitters sweep left and right | top: Local | bottom: World');
  const rows = (['Local', 'World'] as const).map((space, i) => {
    const e = emitter(stage, root, { position: [0, i === 0 ? 1.4 : -1.8, 0], tint: i === 0 ? [1, 0.6, 0.4] : [0.5, 0.8, 1] });
    e.gen.main.simulationSpace = ParticleSimulationSpace[space];
    e.gen.main.startLifetime.constant = 1.6;
    e.gen.main.startSpeed.constant = 1.5;
    e.gen.emission.rateOverTime.constant = 18;
    return e;
  });
  tick(root, (_dt, t) => rows.forEach((r, i) => r.entity.transform.setPosition(Math.sin(t * 1.1 + i) * 2.8, r.entity.transform.position.y, 0)));
  if (!stage.preview) select(stage.bar, 'top row space', ['Local', 'World'] as const, (v) => (rows[0]!.gen.main.simulationSpace = ParticleSimulationSpace[v]));
  return stage.dispose;
};

export default mount;
