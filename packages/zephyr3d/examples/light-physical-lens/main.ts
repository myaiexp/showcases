// A physical camera lens: projectionMode 'physical' with focalLengthMm, sensor size and sensorFit
import { Vector3 } from '@zephyr3d/base';
import type { CameraSensorFit } from '@zephyr3d/scene';
import { DirectionalLight } from '@zephyr3d/scene';
import { button, select, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lightDemo } from '../../shared/light-demo.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const { myApp, scene, camera } = await lightDemo(stage, { ambient: true, boxColor: [0.85, 0.6, 0.3], floorColor: [0.55, 0.6, 0.65], eye: new Vector3(30, 26, 30) });
  scene.lightingMode = 'physical';
  const sun = new DirectionalLight(scene);
  sun.rotation.fromEulerAngle(-Math.PI / 4, Math.PI / 4, 0);
  sun.illuminance = 100000;
  sun.sunLight = true;

  // Field of view from real lens parameters instead of fovY
  camera.projectionMode = 'physical';
  camera.focalLengthMm = 35;
  camera.sensorWidthMm = 36;
  camera.sensorHeightMm = 24;
  camera.sensorFit = 'horizontal';

  const report = (): void => {
    const fov = (camera.effectiveFovY * 180) / Math.PI;
    stage.caption(`${camera.focalLengthMm.toFixed(0)} mm, sensor ${camera.sensorWidthMm} x ${camera.sensorHeightMm} mm, fovY ${fov.toFixed(1)} deg`);
    const out = stage.readout();
    if (out) out.textContent = `projectionMode '${camera.projectionMode}'   sensorFit '${camera.sensorFit}'   effectiveFovY ${fov.toFixed(1)} deg`;
  };
  report();

  if (stage.bar) {
    slider(stage.bar, 'focalLengthMm', [10, 200, 1], camera.focalLengthMm, (v) => {
      camera.focalLengthMm = v;
      report();
    });
    select(stage.bar, 'sensorFit', ['horizontal', 'vertical'] as CameraSensorFit[], 'horizontal', (v) => {
      camera.sensorFit = v;
      report();
    });
    button(stage.bar, 'full frame 36 x 24', () => {
      camera.sensorWidthMm = 36;
      camera.sensorHeightMm = 24;
      report();
    });
    button(stage.bar, 'APS-C 23.5 x 15.6', () => {
      camera.sensorWidthMm = 23.5;
      camera.sensorHeightMm = 15.6;
      report();
    });
    button(stage.bar, 'back to fov', () => {
      camera.projectionMode = 'fov';
      report();
    });
    button(stage.bar, 'projectionMode physical', () => {
      camera.projectionMode = 'physical';
      report();
    });
  } else {
    // A card zooms the lens
    myApp.on('tick', (_dt, ms) => {
      camera.focalLengthMm = 30 + 25 * Math.sin(ms * 0.0007);
      report();
    });
  }
  myApp.run();
});
