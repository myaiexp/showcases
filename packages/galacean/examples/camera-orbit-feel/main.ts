// OrbitControl enableDamping, dampingFactor, rotateSpeed and zoomSpeed
import { PrimitiveMesh } from '@galacean/engine';
import { OrbitControl } from '@galacean/engine-toolkit-controls';
import type { Mount } from '@/types.ts';
import { add, caption, demo, floor, pbr, tick } from '../../shared/gfx-kit.ts';
import { checkbox, slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [4, 2.5, 6], hint: 'Flick the scene and let go: damping keeps it turning.' });
  const say = caption(stage);
  floor(root, engine, -1);
  add(root, PrimitiveMesh.createCapsule(engine, 0.6, 1.4), pbr(engine, [0.9, 0.45, 0.4], 0, 0.4));
  const control = camera.entity.addComponent(OrbitControl);
  const readout = (): void => say(`damping ${control.enableDamping ? 'on' : 'off'}  dampingFactor ${control.dampingFactor.toFixed(2)}  rotateSpeed ${control.rotateSpeed.toFixed(1)}  zoomSpeed ${control.zoomSpeed.toFixed(1)}`);
  readout();
  if (stage.preview) {
    control.autoRotate = true;
    control.autoRotateSpeed = 0.6;
    tick(camera.entity, (_dt, t) => {
      control.dampingFactor = 0.05 + 0.2 * (0.5 + 0.5 * Math.sin(t));
      readout();
    });
  } else {
    checkbox(stage.bar, 'enableDamping', true, (v) => ((control.enableDamping = v), readout()));
    slider(stage.bar, 'dampingFactor', 0.01, 0.5, 0.01, control.dampingFactor, (v) => ((control.dampingFactor = v), readout()));
    slider(stage.bar, 'rotateSpeed', 0.2, 3, 0.1, 1, (v) => ((control.rotateSpeed = v), readout()));
    slider(stage.bar, 'zoomSpeed', 0.2, 3, 0.1, 1, (v) => ((control.zoomSpeed = v), readout()));
  }
  return stage.dispose;
};

export default mount;
