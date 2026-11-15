// Caustics: focused sunlight on the bed, from a shadow-casting directional light
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { buildWorld, makeWater, swingCamera, waterFiles } from '../../shared/env-water.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await waterFiles();
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  // Caustics need a shadow-casting directional light
  const { camera } = await buildWorld(scene, { eye: new Vector3(0, 7, 12), depth: -4, sunElevation: 55, shadows: true });
  const water = makeWater(scene);
  water.absorption = new Vector3(0.08, 0.03, 0.02);
  water.scattering = new Vector3(0.01, 0.02, 0.03);

  water.causticsEnabled = true;
  // The bed sits 4 m down, where the pattern is sharpest
  water.causticsDepth = 4;
  water.causticsRange = 60;
  water.causticsIntensity = 1;

  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) {
      swingCamera(camera, ms, 12, 7);
      water.causticsIntensity = 1.5 + 1.5 * Math.sin(ms * 0.0008);
    }
  });
  const out = stage.readout();
  if (stage.bar) {
    toggle(stage.bar, 'causticsEnabled', true, (v) => (water.causticsEnabled = v));
    slider(stage.bar, 'causticsIntensity', [0, 4, 0.1], 1, (v) => (water.causticsIntensity = v));
    slider(stage.bar, 'causticsDepth (m)', [0.5, 10, 0.25], 4, (v) => (water.causticsDepth = v));
    slider(stage.bar, 'causticsRange (m)', [10, 150, 5], 60, (v) => (water.causticsRange = v));
    slider(stage.bar, 'causticsFadeDistance (m)', [0, 40, 1], water.causticsFadeDistance, (v) => (water.causticsFadeDistance = v));
    toggle(stage.bar, 'causticsSceneDepth', water.causticsSceneDepth, (v) => (water.causticsSceneDepth = v));
    if (out) out.textContent = 'On WebGL2 causticsSceneDepth degrades to a flat plane: causticsDepth is the receiver depth,\nso the bed shows the pattern sharpest when causticsDepth matches its depth (4 m).';
  } else {
    stage.caption('causticsEnabled, causticsDepth 4: the pattern follows the sun through the waves');
  }
  myApp.run();
});
