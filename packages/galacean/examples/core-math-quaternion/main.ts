// One set of Euler angles made into quaternions three ways, applied to three cubes
import { type Entity, MathUtil, PrimitiveMesh, Quaternion, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { labels, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Angles are in degrees on the sliders and converted with MathUtil.degreeToRadian.' });
  const { engine, root } = stage;
  const camera = lit(stage, [0, 2, 10]);
  const tag = labels(stage, camera);
  const body = (x: number, rgb: readonly [number, number, number]): Entity => {
    const e = solid(root, PrimitiveMesh.createCuboid(engine, 1.5, 0.5, 0.9), phong(engine, rgb), [x, 0, 0]);
    solid(e, PrimitiveMesh.createSphere(engine, 0.28, 12), phong(engine, PALETTE.white), [0.85, 0, 0]);
    return e;
  };
  const a = body(-3.2, PALETTE.amber);
  const b = body(0, PALETTE.cyan);
  const c = body(3.2, PALETTE.green);
  const tags = ['rotationYawPitchRoll', 'rotationEuler', 'rotateX().rotateY().rotateZ()'].map((n, i) => tag.add(n, ['#ffc247', '#7fe3f0', '#7be28f'][i]));
  const info = panel(stage, 'bl');
  const deg = { x: 35, y: 50, z: 20 };
  if (!stage.preview) for (const k of ['x', 'y', 'z'] as const) slider(stage.bar, `${k} (deg)`, -180, 180, 1, deg[k], (v) => (deg[k] = v));
  const q1 = new Quaternion();
  const q2 = new Quaternion();
  const q3 = new Quaternion();
  const euler = new Vector3();
  tick(root, (_dt, t) => {
    if (stage.preview) {
      deg.x = 35 + Math.sin(t) * 30;
      deg.y = t * 40;
      deg.z = 20;
    }
    const x = MathUtil.degreeToRadian(deg.x);
    const y = MathUtil.degreeToRadian(deg.y);
    const z = MathUtil.degreeToRadian(deg.z);
    Quaternion.rotationYawPitchRoll(y, x, z, q1);
    Quaternion.rotationEuler(x, y, z, q2);
    q3.set(0, 0, 0, 1).rotateX(x).rotateY(y).rotateZ(z);
    a.transform.rotationQuaternion = q1;
    b.transform.rotationQuaternion = q2;
    c.transform.rotationQuaternion = q3;
    [a, b, c].forEach((e, i) => tags[i]!.at(e.transform.worldPosition.clone().set(e.transform.worldPosition.x, 1.4, 0)));
    q3.toEuler(euler);
    euler.scale(MathUtil.radToDegreeFactor);
    info.text(`equals(q1, q2) ${Quaternion.equals(q1, q2)}   equals(q1, q3) ${Quaternion.equals(q1, q3)}\nq3.toEuler() in degrees: ${euler.x.toFixed(1)}, ${euler.y.toFixed(1)}, ${euler.z.toFixed(1)}`);
  });
  return stage.dispose;
};

export default mount;
