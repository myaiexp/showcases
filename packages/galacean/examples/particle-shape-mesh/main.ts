// MeshShape: particles are born on the surface of a mesh
import { MeshShape, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 6], target: [0, 0.2, 0] });
  caption(stage, 'MeshShape.mesh = torus');
  const e = emitter(stage, root, { tint: [1, 0.7, 0.5], position: [0, 0, 0], rotation: [-30, 0, 0] });
  const meshes = { torus: PrimitiveMesh.createTorus(stage.engine, 1.2, 0.35, 24, 12), sphere: PrimitiveMesh.createSphere(stage.engine, 1, 16), capsule: PrimitiveMesh.createCapsule(stage.engine, 0.6, 2, 12, 1) };
  const shape = new MeshShape();
  shape.mesh = meshes.torus;
  e.gen.emission.shape = shape;
  e.gen.main.startSpeed.constant = 0.4;
  e.gen.main.startLifetime.constant = 1.6;
  e.gen.main.startSize.constant = 0.28;
  e.gen.emission.rateOverTime.constant = 36;
  tick(e.entity, (dt) => e.entity.transform.rotate(0, 0, 40 * dt));
  if (!stage.preview) select(stage.bar, 'mesh', ['torus', 'sphere', 'capsule'] as const, (v) => (shape.mesh = meshes[v]));
  return stage.dispose;
};

export default mount;
