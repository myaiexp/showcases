// One scene, one camera: isOrthographic flips between the two projections
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, pbr, steps } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [3, 3.2, 8], target: [0, 0, -4], hint: 'Toggle isOrthographic.' });
  const say = caption(stage);
  for (let i = 0; i < 8; i++) {
    for (const side of [-1, 1]) {
      add(root, PrimitiveMesh.createCuboid(engine, 1, 1 + 0.2 * (i % 3), 1), pbr(engine, [0.35 + 0.08 * i, 0.55, 0.9 - 0.08 * i], 0, 0.5), [side * 1.6, 0, -i * 2]);
    }
  }
  const apply = (ortho: boolean): void => {
    camera.isOrthographic = ortho;
    camera.orthographicSize = 5;
    say(ortho ? 'isOrthographic = true' : 'isOrthographic = false');
  };
  if (stage.preview) {
    steps(camera.entity, 2.5, 2, (i) => apply(i === 1));
  } else {
    apply(false);
    checkbox(stage.bar, 'isOrthographic', false, apply);
  }
  return stage.dispose;
};

export default mount;
