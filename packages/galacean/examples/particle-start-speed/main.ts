// main.startSpeed: the launch speed, constant or random
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { between, constant, emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 11] });
  caption(stage, 'startSpeed: 0.8 | 2.5 | random 1 to 4');
  const speeds = [constant(0.8), constant(2.5), between(1, 4)];
  const emitters = speeds.map((s, i) => {
    const e = emitter(stage, root, { position: [-2.5 + i * 2.5, -1.8, 0], tint: [[1, 0.5, 0.4], [0.5, 1, 0.5], [0.5, 0.7, 1]][i] as [number, number, number] });
    e.gen.main.startSpeed = s;
    return e;
  });
  if (!stage.preview) slider(stage.bar, 'middle startSpeed', 0.2, 5, 0.1, 2.5, (v) => (emitters[1]!.gen.main.startSpeed.constant = v));
  return stage.dispose;
};

export default mount;
