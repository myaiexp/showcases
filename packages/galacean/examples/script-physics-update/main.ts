// onPhysicsUpdate runs at the physics rate; the counters compare it with onUpdate
import { DynamicCollider, PrimitiveMesh, Script, StaticCollider } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { boxShape, lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const counts = { update: 0, physics: 0 };

class Counter extends Script {
  override onUpdate(): void {
    counts.update++;
  }
  override onPhysicsUpdate(): void {
    counts.physics++;
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { physics: true, hint: 'Physics steps are fixed-length, so their count per rendered frame varies.' });
  const { engine, root } = stage;
  lit(stage, [0, 4, 11], [0, 1.5, 0]);
  counts.update = counts.physics = 0;
  const floor = solid(root, PrimitiveMesh.createCuboid(engine, 12, 0.4, 6), phong(engine, PALETTE.grey), [0, -0.2, 0], 'floor');
  floor.addComponent(StaticCollider).addShape(boxShape(12, 0.4, 6));
  root.addComponent(Counter);
  const mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);
  const spawn = (i: number): void => {
    const b = solid(root, mesh, phong(engine, [PALETTE.amber, PALETTE.cyan, PALETTE.violet][i % 3]!), [(i % 5) * 1.6 - 3.2, 5 + (i % 3) * 2, (i % 2) * 0.4]);
    b.transform.setRotation(i * 20, i * 33, 0);
    const body = b.addComponent(DynamicCollider);
    body.addShape(boxShape(1, 1, 1));
  };
  let spawned = 0;
  const info = panel(stage);
  let last = 0;
  tick(root, (_dt, t) => {
    if (t - last > 0.8 && spawned < 15) {
      last = t;
      spawn(spawned++);
    }
    info.text(`onUpdate         ${counts.update}\nonPhysicsUpdate  ${counts.physics}\nphysics per frame ${(counts.physics / Math.max(1, counts.update)).toFixed(2)}`);
  });
  return stage.dispose;
};

export default mount;
