// Camera.lodDistanceScale: one quality setting that moves every mesh's switch distance
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, DirectionalLight, Scene, TorusShape } from '@zephyr3d/scene';
import { select, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lodReport, lodRow } from '../../shared/basic-lod.ts';
import { lambert, orbitCamera } from '../../shared/light-world.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();

  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 1, 1.5), Vector3.zero(), Vector3.axisPY());

  const torus = new TorusShape({ lod: { lodMinTriangles: 100, lodReduction: 0.5, lodPixelError: 1 } });
  const row = lodRow(scene, torus, lambert(0.4, 0.8, 0.9), 6, 4);
  const camera = orbitCamera(scene, new Vector3(0, 1.5, 8), 300, new Vector3(0, 0, -20));

  const out = stage.readout();
  let scale = 1;
  myApp.on('tick', (_dt, ms) => {
    row.forEach((m, i) => m.rotation.fromEulerAngle(ms * 0.0005, ms * 0.0007 + i, 0));
    if (stage.preview) {
      // Cards: sweep the scale up and down instead of dragging a slider
      scale = 1.5 + 1.4 * Math.sin(ms * 0.0007);
      stage.caption(`camera.lodDistanceScale = ${scale.toFixed(1)}`);
    }
    // Above 1, meshes switch to simpler levels closer to the camera; below 1 they keep detail farther away
    camera.lodDistanceScale = scale;
    if (out) out.textContent = lodReport(row, camera);
  });

  if (stage.bar) {
    slider(stage.bar, 'lodDistanceScale', [0.25, 4, 0.25], 1, (v) => (scale = v));
    select(stage.bar, 'quality preset', ['high (1)', 'low (2)'] as const, 'high (1)', (v) => (scale = v.startsWith('low') ? 2 : 1));
  }
  myApp.run();
});
