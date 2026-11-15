// PBRMaterial.refractionMode: Sphere or Planar approximation of the surface
import { PBRMaterial, PrimitiveMesh, RefractionMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, lin, spin } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { backdrop, matDemo } from '../../shared/mat-demo.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await matDemo(el, ctx, { hint: 'Top row Sphere, bottom row Planar; left a ball, right a slab.' });
  camera.opaqueTextureEnabled = true;
  caption(stage, 'Sphere (top) | Planar (bottom)');
  backdrop(root, engine, 16, 8);
  const glass = (mode: RefractionMode): PBRMaterial => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.95, 0.97, 1]), 1);
    m.metallic = 0;
    m.roughness = 0.03;
    m.transmission = 1;
    m.thickness = 1.5;
    m.refractionMode = mode;
    return m;
  };
  const sphere = PrimitiveMesh.createSphere(engine, 0.9, 48);
  const slab = PrimitiveMesh.createCuboid(engine, 1.6, 1.6, 0.5);
  const parts = [
    add(root, sphere, glass(RefractionMode.Sphere), [-2, 1, 0]),
    add(root, slab, glass(RefractionMode.Sphere), [2, 1, 0]),
    add(root, sphere, glass(RefractionMode.Planar), [-2, -1.2, 0]),
    add(root, slab, glass(RefractionMode.Planar), [2, -1.2, 0]),
  ];
  parts.forEach((p, i) => spin(p.entity, [10, i % 2 ? 20 : 0, 0]));
  if (!stage.preview) slider(stage.bar, 'thickness', 0, 3, 0.05, 1.5, (v) => parts.forEach((p) => ((p.renderer.getMaterial() as PBRMaterial).thickness = v)));
  return stage.dispose;
};

export default mount;
