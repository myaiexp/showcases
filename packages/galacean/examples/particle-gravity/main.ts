// main.gravityModifier: scales gravity on each particle
import { constant } from '../../shared/particle-kit.ts';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 11] });
  const say = caption(stage, 'gravityModifier: 0.3 | 0.1 | -0.1');
  const mods = [0.3, 0.1, -0.1];
  const list = mods.map((g, i) => {
    const e = emitter(stage, root, { position: [-2.6 + i * 2.6, -0.8, 0], tint: [[1, 0.5, 0.4], [0.5, 1, 0.6], [0.5, 0.7, 1]][i] as [number, number, number] });
    e.gen.main.gravityModifier = constant(g);
    e.gen.main.startSpeed.constant = 4;
    e.gen.main.startLifetime.constant = 2.4;
    return e;
  });
  if (stage.preview) tick(root, (_dt, t) => (list[1]!.gen.main.gravityModifier.constant = 0.1 + 0.3 * Math.sin(t * 0.8)));
  else {
    slider(stage.bar, 'middle gravityModifier', -0.6, 0.6, 0.01, 0.1, (v) => ((list[1]!.gen.main.gravityModifier.constant = v), say(`middle gravityModifier = ${v}`)));
  }
  return stage.dispose;
};

export default mount;
