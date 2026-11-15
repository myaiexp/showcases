// main.startColor: a constant, two constants, or a gradient
import { Color, ParticleCompositeGradient } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { color } from '../../shared/controls.ts';
import { colorOf, emitter, fxStage, gradient } from '../../shared/particle-kit.ts';
import { lin } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 11] });
  caption(stage, 'startColor: constant | two constants | gradient');
  const make = (x: number) => emitter(stage, root, { position: [x, -1.8, 0] });
  const a = make(-2.6);
  a.gen.main.startColor = colorOf([1, 0.45, 0.35]);
  const b = make(0);
  b.gen.main.startColor = new ParticleCompositeGradient(new Color(...lin([1, 0.2, 0.2]), 1), new Color(...lin([0.2, 0.4, 1]), 1));
  const c = make(2.6);
  c.gen.main.startColor = gradient([[0, [1, 0.9, 0.2]], [0.5, [0.2, 1, 0.5]], [1, [0.4, 0.4, 1]]]);
  if (!stage.preview) color(stage.bar, 'left startColor', [1, 0.45, 0.35], ([r, g, bl]) => (a.gen.main.startColor.constant = new Color(r ** 2.2, g ** 2.2, bl ** 2.2, 1)));
  return stage.dispose;
};

export default mount;
