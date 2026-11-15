// main.startSize and startSize3D: one size or one per axis
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { between, constant, emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 11] });
  const say = caption(stage, 'startSize 0.2 to 0.8 | startSize3D, x 0.15, y 0.9');
  const a = emitter(stage, root, { position: [-2.2, -1.8, 0], tint: [1, 0.7, 0.4] });
  a.gen.main.startSize = between(0.2, 0.8);
  const b = emitter(stage, root, { position: [2.2, -1.8, 0], tint: [0.5, 0.8, 1] });
  b.gen.main.startSize3D = true;
  b.gen.main.startSizeX = constant(0.15);
  b.gen.main.startSizeY = constant(0.9);
  if (stage.preview) tick(root, (_dt, t) => (b.gen.main.startSizeX.constant = 0.1 + 0.3 * (0.5 + 0.5 * Math.sin(t))));
  else {
    slider(stage.bar, 'right startSizeX', 0.05, 1.2, 0.01, 0.15, (v) => (b.gen.main.startSizeX = constant(v)));
    slider(stage.bar, 'right startSizeY', 0.05, 1.2, 0.01, 0.9, (v) => (b.gen.main.startSizeY = constant(v)));
    say('startSize3D = true uses startSizeX / Y / Z instead of startSize');
  }
  return stage.dispose;
};

export default mount;
