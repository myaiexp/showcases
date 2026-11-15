// onUpdate(deltaTime): a fixed step per frame versus a step scaled by deltaTime, as the frame rate halves
import { PrimitiveMesh, Script, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { labels, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

class PerFrame extends Script {
  override onUpdate(): void {
    this.entity.transform.rotate(0, 1.5, 0); // degrees per frame: depends on the frame rate
  }
}
class PerSecond extends Script {
  override onUpdate(deltaTime: number): void {
    this.entity.transform.rotate(0, 90 * deltaTime, 0); // degrees per second: does not
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'At vSyncCount 2 the engine renders every second display refresh.' });
  const { engine, root } = stage;
  const camera = lit(stage, [0, 1.5, 8]);
  const tag = labels(stage, camera);
  const mesh = PrimitiveMesh.createCuboid(engine, 1.6, 0.5, 0.8);
  const a = solid(root, mesh, phong(engine, PALETTE.amber), [-2.2, 0, 0]);
  const b = solid(root, mesh, phong(engine, PALETTE.cyan), [2.2, 0, 0]);
  a.addComponent(PerFrame);
  b.addComponent(PerSecond);
  const la = tag.add('rotate(0, 1.5, 0)', '#ffc247');
  const lb = tag.add('rotate(0, 90 * deltaTime, 0)', '#7fe3f0');
  const info = panel(stage, 'bl');
  let slow = false;
  if (!stage.preview) checkbox(stage.bar, 'vSyncCount = 2', false, (v) => (slow = v));
  tick(root, (_dt, t) => {
    if (stage.preview) slow = Math.floor(t / 3.5) % 2 === 1;
    engine.vSyncCount = slow ? 2 : 1;
    la.at(new Vector3(-2.2, 1, 0));
    lb.at(new Vector3(2.2, 1, 0));
    info.text(`vSyncCount ${engine.vSyncCount}   deltaTime ${engine.time.deltaTime.toFixed(4)} s`);
  });
  return stage.dispose;
};

export default mount;
