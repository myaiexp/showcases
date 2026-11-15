// OrbitControl enableRotate, enableZoom, enablePan, enableKeys and keyPanSpeed
import { PrimitiveMesh } from '@galacean/engine';
import { OrbitControl } from '@galacean/engine-toolkit-controls';
import type { Mount } from '@/types.ts';
import { add, caption, demo, floor, pbr, steps } from '../../shared/gfx-kit.ts';
import { checkbox, slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [4, 3, 7], hint: 'Click the canvas, then try the arrow keys (enableKeys) with the other inputs off.' });
  const say = caption(stage);
  floor(root, engine, -1);
  for (let i = 0; i < 4; i++) add(root, PrimitiveMesh.createCuboid(engine, 1, 1 + i * 0.4, 1), pbr(engine, [0.4 + i * 0.15, 0.6, 0.95 - i * 0.2], 0, 0.5), [(i - 1.5) * 1.6, -0.5 + i * 0.2, 0]);
  const c = camera.entity.addComponent(OrbitControl);
  const flags = ['enableRotate', 'enableZoom', 'enablePan', 'enableKeys'] as const;
  if (stage.preview) {
    c.autoRotate = true;
    c.autoRotateSpeed = 0.5;
    steps(camera.entity, 1.6, flags.length, (i) => {
      for (const f of flags) c[f] = f === flags[i];
      say(`only ${flags[i]} = true`);
    });
  } else {
    for (const f of flags) checkbox(stage.bar, f, c[f], (v) => (c[f] = v));
    slider(stage.bar, 'keyPanSpeed', 1, 20, 1, c.keyPanSpeed, (v) => (c.keyPanSpeed = v));
  }
  return stage.dispose;
};

export default mount;
