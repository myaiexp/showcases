// Renderer.bounds: a world-space box that follows the transform
import { BoundingBox, PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, caption, demo, spin, tick, unlit } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [3, 3, 7], target: [0, 0, 0] });
  const say = caption(stage);
  const bar = add(root, PrimitiveMesh.createCuboid(engine, 3, 0.4, 0.4), blinn(engine, [0.9, 0.6, 0.3], 40), [0, 0, 0], 'bar');
  spin(bar.entity, [20, 35, 25]);
  const box = unlit(engine, [0.4, 0.8, 1]);
  box.baseColor.a = 0.18;
  box.isTransparent = true;
  const gizmo = add(root, PrimitiveMesh.createCuboid(engine, 1, 1, 1), box, [0, 0, 0], 'bounds');
  const bounds: BoundingBox = bar.renderer.bounds;
  const size = new Vector3();
  const center = new Vector3();
  tick(root, () => {
    bounds.getExtent(size);
    bounds.getCenter(center);
    gizmo.entity.transform.setScale(size.x * 2, size.y * 2, size.z * 2);
    gizmo.entity.transform.setPosition(center.x, center.y, center.z);
    say(`bounds min (${bounds.min.x.toFixed(1)}, ${bounds.min.y.toFixed(1)}, ${bounds.min.z.toFixed(1)}) max (${bounds.max.x.toFixed(1)}, ${bounds.max.y.toFixed(1)}, ${bounds.max.z.toFixed(1)})`);
  });
  return stage.dispose;
};

export default mount;
