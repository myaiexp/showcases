// A child of a moved, turned, scaled parent: local and world values
import { PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick, v3 } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Slide the parent; or drag the child in world space with worldPosition.' });
  const { engine, root } = stage;
  lit(stage, [0, 4, 11]);
  const parent = solid(root, PrimitiveMesh.createCuboid(engine, 1.4, 1.4, 1.4), phong(engine, PALETTE.grey), [-2, 0, 0]);
  parent.transform.setRotation(0, 0, 25);
  parent.transform.setScale(1.6, 0.8, 1);
  const child = solid(parent, PrimitiveMesh.createSphere(engine, 0.45, 20), phong(engine, PALETTE.amber), [1.2, 0.8, 0]);
  const info = panel(stage);
  let worldX = 3;
  if (!stage.preview) {
    slider(stage.bar, 'parent rotation z', -90, 90, 1, 25, (v) => parent.transform.setRotation(0, 0, v));
    slider(stage.bar, 'parent scale x', 0.5, 2.5, 0.05, 1.6, (v) => parent.transform.setScale(v, 0.8, 1));
    slider(stage.bar, 'child worldPosition.x', -1, 5, 0.05, worldX, (v) => {
      worldX = v;
      child.transform.setWorldPosition(v, child.transform.worldPosition.y, 0);
    });
  }
  tick(root, (_dt, t) => {
    if (stage.preview) {
      parent.transform.setRotation(0, 0, 25 + Math.sin(t) * 35);
      parent.transform.setScale(1.6 + Math.sin(t * 0.8) * 0.5, 0.8, 1);
    }
    const w: Vector3 = child.transform.worldPosition;
    info.text(
      `child.position        ${v3(child.transform.position)}   (local)\n` +
        `child.worldPosition   ${v3(w)}\n` +
        `child.lossyWorldScale ${v3(child.transform.lossyWorldScale)}\n` +
        `child.worldRotation   ${v3(child.transform.worldRotation, 0)}`,
    );
  });
  return stage.dispose;
};

export default mount;
