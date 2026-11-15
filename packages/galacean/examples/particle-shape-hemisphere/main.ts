// HemisphereShape: particles start inside a half sphere
import { HemisphereShape } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 2, 8], target: [0, 0.4, 0] });
  const say = caption(stage, '');
  const e = emitter(stage, root, { tint: [0.6, 1, 0.8], position: [0, -1.4, 0] });
  const shape = new HemisphereShape();
  shape.radius = 1;
  e.gen.emission.shape = shape;
  e.gen.main.startSpeed.constant = 1.2;
  e.gen.main.startLifetime.constant = 1.6;
  e.gen.emission.rateOverTime.constant = 26;
  const note = (): void => say(`HemisphereShape.radius = ${shape.radius.toFixed(2)}`);
  if (stage.preview) tick(root, (_dt, t) => ((shape.radius = 0.8 + 0.7 * Math.sin(t * 0.9)), note()));
  else slider(stage.bar, 'radius', 0.1, 2.5, 0.05, 1, (v) => ((shape.radius = v), note()));
  return stage.dispose;
};

export default mount;
