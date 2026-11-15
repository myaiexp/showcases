// Snow: a wide box above the view, slow gravity, a gentle wind
import { BoxShape, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { between, constant, emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 0, 8], target: [0, 0, 0], background: [0.02, 0.03, 0.06, 1] });
  const say = caption(stage, '');
  const e = emitter(stage, root, { position: [0, 3.2, 0], rotation: [90, 0, 0], tint: [0.95, 0.97, 1] });
  const box = new BoxShape();
  box.size = new Vector3(9, 1, 1);
  e.gen.emission.shape = box;
  e.gen.main.startSpeed = constant(0.2);
  e.gen.main.startLifetime = constant(4);
  e.gen.main.startSize = between(0.08, 0.2);
  e.gen.main.gravityModifier = constant(0.07);
  e.gen.emission.rateOverTime.constant = 24;
  e.gen.forceOverLifetime.enabled = true;
  const wind = (v: number): void => {
    e.gen.forceOverLifetime.forceX = constant(v);
    say(`forceX (wind) = ${v.toFixed(2)}`);
  };
  if (stage.preview) tick(root, (_dt, t) => wind(0.6 * Math.sin(t * 0.6)));
  else slider(stage.bar, 'wind (forceX)', -2, 2, 0.05, 0, wind);
  return stage.dispose;
};

export default mount;
