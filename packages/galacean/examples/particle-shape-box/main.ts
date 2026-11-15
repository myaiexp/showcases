// BoxShape: particles appear inside a box and leave along local +Z
import { BoxShape, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 2, 10], target: [0, 0.5, 0] });
  const say = caption(stage, '');
  const e = emitter(stage, root, { tint: [0.6, 0.9, 1], position: [0, -1.2, 0] });
  const shape = new BoxShape();
  shape.size = new Vector3(4, 0.2, 1.5);
  e.gen.emission.shape = shape;
  e.gen.main.startSpeed.constant = 1.4;
  e.gen.emission.rateOverTime.constant = 22;
  const size = (x: number, z: number): void => {
    shape.size = new Vector3(x, 0.2, z);
    say(`BoxShape.size = (${x.toFixed(1)}, 0.2, ${z.toFixed(1)})`);
  };
  if (stage.preview) tick(root, (_dt, t) => size(3.2 + 1.8 * Math.sin(t * 1.1), 1.2 + 0.9 * Math.sin(t * 0.7)));
  else {
    let x = 4;
    let z = 1.5;
    slider(stage.bar, 'size.x', 0.2, 6, 0.1, x, (v) => size((x = v), z));
    slider(stage.bar, 'size.z', 0.2, 4, 0.1, z, (v) => size(x, (z = v)));
    size(x, z);
  }
  return stage.dispose;
};

export default mount;
