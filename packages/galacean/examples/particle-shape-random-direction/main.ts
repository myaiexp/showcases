// BaseShape.randomDirectionAmount and shape.enabled
import { BoxShape, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 9], target: [0, 1, 0] });
  const say = caption(stage, '');
  const e = emitter(stage, root, { tint: [0.8, 1, 0.6], position: [0, -1.5, 0] });
  const shape = new BoxShape();
  shape.size = new Vector3(1.2, 0.1, 0.1);
  e.gen.emission.shape = shape;
  e.gen.main.startSpeed.constant = 2.2;
  e.gen.emission.rateOverTime.constant = 26;
  const note = (): void => say(`randomDirectionAmount = ${shape.randomDirectionAmount.toFixed(2)}, shape.enabled = ${shape.enabled}`);
  if (stage.preview) tick(root, (_dt, t) => ((shape.randomDirectionAmount = 0.5 + 0.5 * Math.sin(t * 0.8)), (shape.enabled = Math.sin(t * 0.25) > -0.7), note()));
  else {
    slider(stage.bar, 'randomDirectionAmount', 0, 1, 0.01, 0, (v) => ((shape.randomDirectionAmount = v), note()));
    checkbox(stage.bar, 'shape.enabled', true, (v) => ((shape.enabled = v), note()));
    note();
  }
  return stage.dispose;
};

export default mount;
