// Matrix.multiply(a, b) applies b first: T * R spins in place, R * T orbits the origin
import { Matrix, PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick, unlit } from '../../shared/core-kit.ts';
import { labels, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Both cubes use the same translation (3, 0, 0) and rotation matrices; only the multiplication order differs.' });
  const { engine, root } = stage;
  const camera = lit(stage, [0, 7, 8], [0, 0, 0]);
  const tag = labels(stage, camera);
  const mesh = PrimitiveMesh.createCuboid(engine, 1.1, 0.5, 0.5);
  const spin = solid(root, mesh, phong(engine, PALETTE.amber));
  const orbit = solid(root, mesh, phong(engine, PALETTE.cyan));
  solid(root, PrimitiveMesh.createSphere(engine, 0.12, 8), unlit(engine, PALETTE.white));
  const la = tag.add('multiply(translation, rotation)', '#ffc247');
  const lb = tag.add('multiply(rotation, translation)', '#7fe3f0');
  const info = panel(stage);
  const translation = new Matrix();
  Matrix.translation(new Vector3(3, 0, 0), translation);
  const rotation = new Matrix();
  const out = new Matrix();
  let speed = 70;
  if (!stage.preview) slider(stage.bar, 'degrees per second', 0, 180, 5, speed, (v) => (speed = v));
  let angle = 0;
  tick(root, (dt) => {
    angle += speed * dt;
    Matrix.rotationAxisAngle(new Vector3(0, 1, 0), (angle * Math.PI) / 180, rotation);
    Matrix.multiply(translation, rotation, out);
    spin.transform.localMatrix = out;
    Matrix.multiply(rotation, translation, out);
    orbit.transform.localMatrix = out;
    la.at(new Vector3(3, 0.6, 0));
    lb.at(orbit.transform.worldPosition.clone().set(orbit.transform.worldPosition.x, 0.6, orbit.transform.worldPosition.z));
    info.text('Matrix.multiply(viewMatrix, modelMatrix, mvMatrix)\nreads right to left: the model matrix goes first');
  });
  return stage.dispose;
};

export default mount;
