// registerWorldChangeFlag: a flag that turns true when the world matrix changes, so work can be cached
import { Matrix, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick, unlit } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'The cube moves in bursts. The cached inverse is only recomputed while the flag says the world matrix changed.' });
  const { engine, root } = stage;
  lit(stage, [0, 1.5, 8]);
  const cube = solid(root, PrimitiveMesh.createCuboid(engine, 1.2, 1.2, 1.2), phong(engine, PALETTE.blue));
  const lampMaterial = unlit(engine, [0.3, 0.3, 0.3]);
  const lamp = solid(root, PrimitiveMesh.createSphere(engine, 0.3, 16), lampMaterial, [0, 2.2, 0]);
  const flag = cube.transform.registerWorldChangeFlag();
  const cachedInverse = new Matrix();
  let recomputed = 0;
  let paused = false;
  if (!stage.preview) button(stage.bar, 'Hold still / move', () => (paused = !paused));
  const info = panel(stage);
  tick(root, (_dt, t) => {
    // Move during the first half of every 4 s cycle, rest in the second half.
    const moving = !paused && t % 4 < 2;
    if (moving) cube.transform.setPosition(Math.sin(t * 3) * 2, 0, 0);
    const dirty = flag.flag;
    if (dirty) {
      flag.flag = false;
      Matrix.invert(cube.transform.worldMatrix, cachedInverse);
      recomputed++;
    }
    lampMaterial.baseColor.set(dirty ? 1 : 0.25, dirty ? 0.75 : 0.25, dirty ? 0.2 : 0.28, 1);
    lamp.transform.setScale(dirty ? 1.3 : 0.8, dirty ? 1.3 : 0.8, dirty ? 1.3 : 0.8);
    info.text(`flag.flag was ${dirty}\ninverse recomputed ${recomputed} times\n${moving ? 'moving' : 'resting'}`);
  });
  return stage.dispose;
};

export default mount;
