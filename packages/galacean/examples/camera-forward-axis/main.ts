// The camera's forward is -Z: a turntable camera and its worldForward vector
import { PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, pbr, tick, unlit } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 0, 0], target: [0, 0, -1], hint: 'Right-handed coordinates: the viewing direction is -Z.' });
  const say = caption(stage);
  const marks: [string, [number, number, number], [number, number, number]][] = [
    ['-Z (ahead)', [0, 0, -6], [0.9, 0.3, 0.3]],
    ['+X', [6, 0, 0], [0.3, 0.8, 0.4]],
    ['+Z (behind)', [0, 0, 6], [0.35, 0.5, 0.95]],
    ['-X', [-6, 0, 0], [0.95, 0.8, 0.3]],
  ];
  for (const [name, pos, color] of marks) add(root, PrimitiveMesh.createCuboid(engine, 1.6, 1.6, 1.6), pbr(engine, color, 0, 0.5), pos, name);
  add(root, PrimitiveMesh.createPlane(engine, 30, 30), unlit(engine, [0.08, 0.1, 0.16]), [0, -2, 0], 'floor');
  const fwd = new Vector3();
  tick(camera.entity, (_dt, t) => {
    camera.entity.transform.setRotation(0, t * 25, 0);
    fwd.copyFrom(camera.entity.transform.worldForward);
    say(`worldForward = (${fwd.x.toFixed(2)}, ${fwd.y.toFixed(2)}, ${fwd.z.toFixed(2)})`);
  });
  return stage.dispose;
};

export default mount;
