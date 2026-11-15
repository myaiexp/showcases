// The same rotation as Euler degrees and as a quaternion, each one writing the other
import { PrimitiveMesh, Quaternion } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Euler sliders write transform.rotation; the quaternion readout follows.' });
  const { engine, root } = stage;
  lit(stage, [0, 1.5, 8]);
  const cube = solid(root, PrimitiveMesh.createCuboid(engine, 1.2, 1.2, 1.8), phong(engine, PALETTE.cyan));
  const info = panel(stage);
  const euler = { x: 30, y: 40, z: 10 };
  cube.transform.setRotation(euler.x, euler.y, euler.z);
  if (!stage.preview) {
    for (const k of ['x', 'y', 'z'] as const) {
      slider(stage.bar, `rotation.${k}`, -180, 180, 1, euler[k], (v) => {
        euler[k] = v;
        cube.transform.setRotation(euler.x, euler.y, euler.z);
      });
    }
  }
  const q = new Quaternion();
  tick(root, (_dt, t) => {
    if (stage.preview) {
      // Half the time write Euler degrees, half the time write a quaternion.
      if (Math.floor(t / 3) % 2 === 0) cube.transform.rotation = cube.transform.rotation.set(t * 30, 40, 10);
      else {
        Quaternion.rotationEuler(0.7, t * 0.5, 0.2, q);
        cube.transform.rotationQuaternion = q;
      }
    }
    const { rotation, rotationQuaternion: r } = cube.transform;
    info.text(
      `rotation (deg)     ${rotation.x.toFixed(1)}, ${rotation.y.toFixed(1)}, ${rotation.z.toFixed(1)}\n` +
        `rotationQuaternion ${r.x.toFixed(3)}, ${r.y.toFixed(3)}, ${r.z.toFixed(3)}, ${r.w.toFixed(3)}` +
        (stage.preview ? `\nwriting ${Math.floor(t / 3) % 2 === 0 ? 'rotation' : 'rotationQuaternion'}` : ''),
    );
  });
  return stage.dispose;
};

export default mount;
