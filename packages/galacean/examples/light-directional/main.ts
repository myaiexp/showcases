// DirectLight: color.set and the entity's rotation aim parallel light
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, caption, demo, floor, spin, tick } from '../../shared/gfx-kit.ts';
import { color, slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, light } = await demo(el, ctx, { camera: [0, 3, 7], target: [0, 0.5, 0] });
  const say = caption(stage);
  floor(root, engine, -1);
  const mesh = [PrimitiveMesh.createSphere(engine, 0.9), PrimitiveMesh.createCuboid(engine, 1.4, 1.4, 1.4), PrimitiveMesh.createCone(engine, 0.8, 1.6)];
  mesh.forEach((m, i) => spin(add(root, m, blinn(engine, [0.9, 0.9, 0.9], 50), [(i - 1) * 2.4, 0, 0]).entity, [0, 25, 0]));
  const aim = (pitch: number, yaw: number): void => light.entity.transform.setRotation(pitch, yaw, 0);
  if (stage.preview) {
    tick(light.entity, (_dt, t) => {
      aim(-40, t * 50);
      light.color.set(0.6 + 0.4 * Math.sin(t * 0.8), 0.7 + 0.3 * Math.sin(t * 0.8 + 2), 0.8 + 0.2 * Math.sin(t * 0.8 + 4), 1);
      say('DirectLight.color + transform.setRotation');
    });
  } else {
    aim(-45, -45);
    slider(stage.bar, 'pitch', -90, 0, 1, -45, (v) => aim(v, light.entity.transform.rotation.y));
    slider(stage.bar, 'yaw', -180, 180, 1, -45, (v) => aim(light.entity.transform.rotation.x, v));
    color(stage.bar, 'color', [1, 1, 1], (c) => light.color.set(c[0] ** 2.2, c[1] ** 2.2, c[2] ** 2.2, 1));
  }
  return stage.dispose;
};

export default mount;
