// OrbitControl.target: re-centre the orbit on different objects
import { PrimitiveMesh } from '@galacean/engine';
import { OrbitControl } from '@galacean/engine-toolkit-controls';
import type { Mount } from '@/types.ts';
import { add, caption, demo, floor, pbr, steps } from '../../shared/gfx-kit.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 3, 9], hint: 'Pick a shape to orbit.' });
  const say = caption(stage);
  floor(root, engine, -1, 24);
  const spots: [string, [number, number, number]][] = [['cube', [-5, 0, 0]], ['sphere', [0, 0, 0]], ['cone', [5, 0, 0]]];
  const meshes = [PrimitiveMesh.createCuboid(engine, 1.6, 1.6, 1.6), PrimitiveMesh.createSphere(engine, 1), PrimitiveMesh.createCone(engine, 1, 2)];
  spots.forEach(([name, pos], i) => add(root, meshes[i]!, pbr(engine, [0.9 - i * 0.25, 0.45 + i * 0.15, 0.3 + i * 0.3], 0, 0.5), pos, name));
  const control = camera.entity.addComponent(OrbitControl);
  control.autoRotate = true;
  control.autoRotateSpeed = 0.4;
  const focus = (i: number): void => {
    control.target.set(...spots[i]![1]);
    say(`target = ${spots[i]![0]} (${spots[i]![1].join(', ')})`);
  };
  if (stage.preview) steps(camera.entity, 3, spots.length, focus);
  else {
    focus(1);
    spots.forEach(([name], i) => button(stage.bar, name, () => focus(i)));
  }
  return stage.dispose;
};

export default mount;
