// affineTransformation versus T * R * S built by hand, and decompose() reading the parts back
import { Matrix, PrimitiveMesh, Quaternion, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick, v3 } from '../../shared/core-kit.ts';
import { labels, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Left: the matrix from affineTransformation. Right: the same pose from three matrices multiplied.' });
  const { engine, root } = stage;
  const camera = lit(stage, [0, 2, 10]);
  const tag = labels(stage, camera);
  const mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);
  const left = solid(root, mesh, phong(engine, PALETTE.amber), [-3, 0, 0]);
  const right = solid(root, mesh, phong(engine, PALETTE.cyan), [3, 0, 0]);
  const ta = tag.add('affineTransformation', '#ffc247');
  const tb = tag.add('translation * rotation * scaling', '#7fe3f0');
  const info = panel(stage, 'bl');
  let spin = 0;
  if (!stage.preview) slider(stage.bar, 'rotation', 0, 360, 1, 0, (v) => (spin = v));
  const m = new Matrix();
  const mT = new Matrix();
  const mR = new Matrix();
  const mS = new Matrix();
  const mTR = new Matrix();
  const mTRS = new Matrix();
  const q = new Quaternion();
  const scale = new Vector3();
  const shift = new Vector3();
  const readQ = new Quaternion();
  const readS = new Vector3();
  const readT = new Vector3();
  tick(root, (_dt, t) => {
    if (stage.preview) spin = (t * 50) % 360;
    scale.set(1 + 0.5 * Math.sin(t), 1, 1.4);
    Quaternion.rotationEuler(0.3, (spin * Math.PI) / 180, 0.2, q);
    shift.set(-3, 0.3 * Math.sin(t * 2), 0);
    Matrix.affineTransformation(scale, q, shift, m);
    left.transform.localMatrix = m;

    Matrix.translation(shift.clone().set(3, 0.3 * Math.sin(t * 2), 0), mT);
    Matrix.rotationQuaternion(q, mR);
    Matrix.scaling(scale, mS);
    Matrix.multiply(mT, mR, mTR);
    Matrix.multiply(mTR, mS, mTRS);
    right.transform.localMatrix = mTRS;

    m.decompose(readT, readQ, readS);
    info.text(`decompose(): translation ${v3(readT)}\n            scale       ${v3(readS)}\n            rotation    ${readQ.x.toFixed(2)}, ${readQ.y.toFixed(2)}, ${readQ.z.toFixed(2)}, ${readQ.w.toFixed(2)}\ndeterminant ${m.determinant().toFixed(3)}`);
    ta.at(new Vector3(-3, 1.4, 0));
    tb.at(new Vector3(3, 1.4, 0));
  });
  return stage.dispose;
};

export default mount;
