// A child's localMatrix and worldMatrix as 4x4 grids, built with Matrix.affineTransformation
import { Matrix, PrimitiveMesh, Quaternion, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const grid = (m: Matrix): string => {
  const e = m.elements;
  // Matrices are column-major: element [col * 4 + row].
  return [0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => (e[c * 4 + r] ?? 0).toFixed(2).padStart(6)).join(' ')).join('\n');
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'The child gets its localMatrix from affineTransformation(scale, rotation, translation); the parent turns.' });
  const { engine, root } = stage;
  lit(stage, [0, 2.5, 9], [-1.5, 0, 0]);
  const parent = solid(root, PrimitiveMesh.createCuboid(engine, 1.2, 1.2, 1.2), phong(engine, PALETTE.grey), [-2.8, 0, 0]);
  const child = solid(parent, PrimitiveMesh.createCuboid(engine, 0.6, 0.6, 0.6), phong(engine, PALETTE.amber));
  const local = new Matrix();
  const turn = new Quaternion();
  Quaternion.rotationEuler(0, 0.4, 0, turn);
  Matrix.affineTransformation(new Vector3(1, 2, 1), turn, new Vector3(1.4, 0.3, 0), local);
  child.transform.localMatrix = local;
  const info = panel(stage, 'tr');
  tick(root, (_dt, t) => {
    parent.transform.setRotation(0, t * 40, 0);
    info.text(`child.localMatrix\n${grid(child.transform.localMatrix)}\n\nchild.worldMatrix\n${grid(child.transform.worldMatrix)}`);
  });
  return stage.dispose;
};

export default mount;
