// A second camera's clearFlags keep or erase what the first camera rendered
import { Camera, CameraClearFlags, Layer, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, pbr, spin, steps } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';

const FLAGS = ['All', 'None', 'Depth', 'Color'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 1.5, 7], target: [0, 0, 0] });
  const say = caption(stage);
  camera.cullingMask = Layer.Layer0;
  const wall = add(root, PrimitiveMesh.createCuboid(engine, 5, 3, 0.3), pbr(engine, [0.3, 0.55, 0.95], 0, 0.5), [0, 0, 0], 'wall');
  wall.entity.transform.setRotation(0, 20, 0);
  add(root, PrimitiveMesh.createPlane(engine, 14, 14), pbr(engine, [0.35, 0.4, 0.5], 0, 0.9), [0, -1.5, 0], 'floor');
  const cube = add(root, PrimitiveMesh.createCuboid(engine, 1.6, 1.6, 1.6), pbr(engine, [0.95, 0.5, 0.2], 0, 0.4), [0, 0, 0], 'cube');
  cube.entity.layer = Layer.Layer1;
  spin(cube.entity, [20, 40, 0]);
  const overlay = root.createChild('overlay camera');
  overlay.transform.setPosition(0, 1.5, 7);
  overlay.transform.lookAt(camera.entity.transform.position.clone().set(0, 0, 0));
  const second = overlay.addComponent(Camera);
  second.priority = 1;
  second.cullingMask = Layer.Layer1;
  const apply = (name: (typeof FLAGS)[number]): void => {
    second.clearFlags = CameraClearFlags[name];
    say(`second camera clearFlags = ${name}`);
  };
  if (stage.preview) steps(overlay, 2.5, FLAGS.length, (i) => apply(FLAGS[i]!));
  else {
    apply('All');
    select(stage.bar, 'clearFlags', FLAGS, apply);
  }
  return stage.dispose;
};

export default mount;
