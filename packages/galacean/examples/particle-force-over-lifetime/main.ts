// forceOverLifetime: a steady push (wind) that speeds particles up
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { constant, curve, emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 11] });
  const say = caption(stage, '');
  const make = (x: number, tint: [number, number, number]) => {
    const e = emitter(stage, root, { position: [x, -1.8, 0], tint });
    e.gen.forceOverLifetime.enabled = true;
    e.gen.main.startSpeed.constant = 2.6;
    e.gen.main.startLifetime.constant = 2;
    return e;
  };
  make(-2.6, [1, 0.55, 0.45]);
  const wind = make(0, [0.5, 1, 0.55]);
  wind.gen.forceOverLifetime.forceX = constant(2);
  const gust = make(2.6, [0.5, 0.75, 1]);
  gust.gen.forceOverLifetime.forceX = curve([0, -3], [1, 3]);
  const note = (): void => say(`forceX: 0 | ${wind.gen.forceOverLifetime.forceX.constant.toFixed(1)} | curve -3 to 3`);
  if (stage.preview) tick(root, (_dt, t) => ((wind.gen.forceOverLifetime.forceX.constant = 2 * Math.sin(t * 0.8)), note()));
  else {
    slider(stage.bar, 'middle forceX', -4, 4, 0.1, 2, (v) => ((wind.gen.forceOverLifetime.forceX.constant = v), note()));
    slider(stage.bar, 'middle forceZ', -4, 4, 0.1, 0, (v) => (wind.gen.forceOverLifetime.forceZ = constant(v)));
    note();
  }
  return stage.dispose;
};

export default mount;
