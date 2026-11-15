// FreeControl: WASD and drag roaming, with a simulated floor
import { PrimitiveMesh } from '@galacean/engine';
import { FreeControl } from '@galacean/engine-toolkit-controls';
import type { Mount } from '@/types.ts';
import { add, demo, floor, orbit, pbr } from '../../shared/gfx-kit.ts';
import { checkbox, slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 1.6, 8], target: [0, 1.6, 0], hint: 'Click the canvas; W A S D and the arrow keys move, drag to look.' });
  floor(root, engine, 0, 60);
  for (let x = -3; x <= 3; x++) {
    for (let z = -3; z <= 1; z++) {
      add(root, PrimitiveMesh.createCylinder(engine, 0.35, 0.35, 1.5 + ((x * 7 + z * 3) & 3) * 0.8, 16), pbr(engine, [0.45 + 0.07 * x, 0.55, 0.9 - 0.06 * z], 0, 0.5), [x * 3, 1, z * 3 - 4]);
    }
  }
  if (stage.preview) {
    orbit(camera.entity, [0, 1.4, -4], 9, 2.2, 0.35);
  } else {
    const free = camera.entity.addComponent(FreeControl);
    free.movementSpeed = 6;
    free.floorY = 0.5;
    slider(stage.bar, 'movementSpeed', 1, 20, 0.5, free.movementSpeed, (v) => (free.movementSpeed = v));
    slider(stage.bar, 'rotateSpeed', 20, 300, 5, free.rotateSpeed, (v) => (free.rotateSpeed = v));
    slider(stage.bar, 'floorY', -2, 4, 0.1, free.floorY, (v) => (free.floorY = v));
    checkbox(stage.bar, 'floorMock', free.floorMock, (v) => (free.floorMock = v));
  }
  return stage.dispose;
};

export default mount;
