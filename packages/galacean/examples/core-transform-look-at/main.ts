// A cone keeps pointing at a moving target with lookAt(target, worldUp)
import { PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick, unlit } from '../../shared/core-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'The target circles the cone. The worldUp argument decides how the cone rolls about its forward axis.' });
  const { engine, root } = stage;
  lit(stage, [0, 3.5, 8]);
  const pivot = root.createChild('pivot');
  const cone = solid(pivot, PrimitiveMesh.createCone(engine, 0.5, 1.8, 24, 1), phong(engine, PALETTE.amber));
  cone.transform.setRotation(-90, 0, 0); // the cone's tip points along -Z, the forward axis lookAt aims
  const wing = solid(cone, PrimitiveMesh.createCuboid(engine, 1.8, 0.08, 0.5), phong(engine, PALETTE.violet), [0, -0.5, 0]);
  wing.transform.setRotation(0, 0, 0);
  const target = solid(root, PrimitiveMesh.createSphere(engine, 0.25, 16), unlit(engine, PALETTE.cyan));
  const ups: Record<string, Vector3> = { 'up (0,1,0)': new Vector3(0, 1, 0), 'right (1,0,0)': new Vector3(1, 0, 0), 'forward (0,0,1)': new Vector3(0, 0, 1) };
  let up = ups['up (0,1,0)']!;
  if (!stage.preview) select(stage.bar, 'worldUp', Object.keys(ups), (k) => (up = ups[k]!));
  tick(root, (_dt, t) => {
    target.transform.setPosition(Math.cos(t * 0.9) * 3.2, Math.sin(t * 1.3) * 1.6, Math.sin(t * 0.9) * 3.2);
    pivot.transform.lookAt(target.transform.worldPosition, up);
  });
  return stage.dispose;
};

export default mount;
