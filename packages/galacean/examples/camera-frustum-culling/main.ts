// enableFrustumCulling: renderers outside the view frustum report isCulled
import { type MeshRenderer, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, pbr, steps, tick } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 2, 9], hint: 'isCulled is read from each renderer after the frame.' });
  const say = caption(stage);
  const row = Array.from({ length: 9 }, (_v, i) => add(root, PrimitiveMesh.createCuboid(engine, 1, 1, 1), pbr(engine, [0.35 + i * 0.06, 0.6, 0.9 - i * 0.07], 0, 0.5), [i * 2 - 8, 0, 0]));
  const group = root.createChild('row');
  for (const r of row) r.entity.parent = group;
  const count = (): void => {
    const n = row.filter((r) => (r.renderer as MeshRenderer).isCulled).length;
    say(`enableFrustumCulling = ${camera.enableFrustumCulling}  culled ${n} of ${row.length}`);
  };
  tick(group, (_dt, t) => {
    group.transform.setPosition(Math.sin(t * 0.5) * 6, 0, 0);
    count();
  });
  if (stage.preview) steps(group, 5, 2, (i) => (camera.enableFrustumCulling = i === 0));
  else checkbox(stage.bar, 'enableFrustumCulling', true, (v) => (camera.enableFrustumCulling = v));
  return stage.dispose;
};

export default mount;
