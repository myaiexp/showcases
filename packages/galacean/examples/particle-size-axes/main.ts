// sizeOverLifetime.separateAxes: sizeX, sizeY and sizeZ curves
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';
import { constant, curve, emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 10] });
  const say = caption(stage, 'separateAxes: sizeX shrinks 1 to 0.2 while sizeY grows 0.3 to 3');
  const e = emitter(stage, root, { tint: [0.7, 0.9, 1], position: [0, -1.8, 0] });
  const mod = e.gen.sizeOverLifetime;
  mod.enabled = true;
  mod.separateAxes = true;
  mod.sizeX = curve([0, 1], [1, 0.2]);
  mod.sizeY = curve([0, 0.3], [1, 3]);
  mod.sizeZ = constant(1);
  e.gen.main.startSize.constant = 0.5;
  e.gen.main.startLifetime.constant = 2.2;
  e.gen.main.startSpeed.constant = 1.8;
  if (!stage.preview) checkbox(stage.bar, 'separateAxes', true, (v) => ((mod.separateAxes = v), say(v ? 'sizeX / sizeY / sizeZ curves in use' : 'separateAxes off: the single size curve applies')));
  return stage.dispose;
};

export default mount;
