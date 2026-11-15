// StretchBillboard with velocityScale and lengthScale
import { ParticleRenderMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 10] });
  const say = caption(stage, '');
  const e = emitter(stage, root, { tint: [0.7, 0.9, 1], position: [0, -1.8, 0] });
  e.renderer.renderMode = ParticleRenderMode.StretchBillboard;
  e.gen.main.startSpeed.constant = 4;
  e.gen.main.startLifetime.constant = 1.4;
  e.gen.main.startSize.constant = 0.15;
  e.gen.main.gravityModifier.constant = 0.15;
  e.gen.emission.rateOverTime.constant = 24;
  const apply = (velocity: number, length: number): void => {
    e.renderer.velocityScale = velocity;
    e.renderer.lengthScale = length;
    say(`velocityScale = ${velocity.toFixed(2)}, lengthScale = ${length.toFixed(2)}`);
  };
  if (stage.preview) tick(root, (_dt, t) => apply(0.1 + 0.4 * (0.5 + 0.5 * Math.sin(t * 0.9)), 1 + 3 * (0.5 + 0.5 * Math.sin(t * 0.6 + 1))));
  else {
    let v = 0.3;
    let l = 2;
    slider(stage.bar, 'velocityScale', 0, 1, 0.01, v, (x) => apply((v = x), l));
    slider(stage.bar, 'lengthScale', 0.5, 6, 0.05, l, (x) => apply(v, (l = x)));
    apply(v, l);
  }
  return stage.dispose;
};

export default mount;
