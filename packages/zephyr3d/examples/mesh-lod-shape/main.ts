// Levels of detail from a shape's `lod` option, with forcedLod and minLod to override the choice
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, DirectionalLight, Scene, SphereShape } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lodReport, lodRow } from '../../shared/basic-lod.ts';
import { lambert, orbitCamera } from '../../shared/light-world.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();

  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 1, 1.5), Vector3.zero(), Vector3.axisPY());

  // The shape generates its own levels (once the simplifier's WebAssembly has loaded)
  const lod = { lodMinTriangles: 100, lodReduction: 0.5, lodPixelError: 1 };
  const sphere = new SphereShape({
    radius: 1.5,
    verticalDetail: 40,
    horizonalDetail: 80,
    lod: { ...lod },
  });
  const row = lodRow(scene, sphere, lambert(0.9, 0.7, 0.25));
  const camera = orbitCamera(scene, new Vector3(0, 1.5, 8), 300, new Vector3(0, 0, -20));

  const out = stage.readout();
  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) {
      // A card has no pointer: dolly the camera along the row
      const z = 8 + 10 * (1 + Math.sin(ms * 0.0006));
      camera.lookAt(new Vector3(0, 1.5, z), new Vector3(0, 0, z - 30), Vector3.axisPY());
    }
    if (out) out.textContent = lodReport(row, camera);
  });

  if (stage.bar) {
    // -1 chooses by projected size; 0 is the finest level
    slider(stage.bar, 'forcedLod', [-1, 6, 1], -1, (v) => row.forEach((m) => (m.forcedLod = v)));
    slider(stage.bar, 'minLod', [0, 6, 1], 0, (v) => row.forEach((m) => (m.minLod = v)));
    // Changing the options regenerates the shape, and its levels with it
    const regenerate = (): void => {
      sphere.options = { lod: { ...lod } };
    };
    slider(stage.bar, 'lodPixelError', [0.5, 16, 0.5], lod.lodPixelError, (v) => {
      lod.lodPixelError = v;
      regenerate();
    });
    slider(stage.bar, 'lodReduction', [0.2, 0.8, 0.05], lod.lodReduction, (v) => {
      lod.lodReduction = v;
      regenerate();
    });
    slider(stage.bar, 'lodMinTriangles', [20, 1000, 20], lod.lodMinTriangles, (v) => {
      lod.lodMinTriangles = v;
      regenerate();
    });
  } else {
    stage.caption('SphereShape({ lod }): farther spheres draw fewer triangles');
  }
  myApp.run();
});
