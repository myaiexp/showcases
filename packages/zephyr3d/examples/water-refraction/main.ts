// Refraction: march or offset mode, how strong it bends, how much reflects, and how it blurs
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene, type WaterRefractionMode } from '@zephyr3d/scene';
import { select, slider } from '../../shared/controls.ts';
import { buildWorld, makeWater, swingCamera, waterFiles } from '../../shared/env-water.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await waterFiles();
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  const { camera } = await buildWorld(scene, { eye: new Vector3(0, 8, 12), depth: -3 });
  const water = makeWater(scene);
  // Pool-clear water so the bed shows through
  water.absorption = new Vector3(0.08, 0.03, 0.02);
  water.scattering = new Vector3(0.01, 0.02, 0.03);

  // march finds the submerged surface with ~24 depth reads per pixel; offset skips the search
  water.refractionMode = 'march';
  water.cheapRefractionDepth = 1;

  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) {
      swingCamera(camera, ms, 12, 8);
      water.refractionScale = 1 + 2 * (0.5 + 0.5 * Math.sin(ms * 0.0007));
    }
  });
  if (stage.bar) {
    select(stage.bar, 'refractionMode', ['march', 'offset'] as WaterRefractionMode[], 'march', (v) => (water.refractionMode = v));
    slider(stage.bar, 'cheapRefractionDepth (offset)', [0.2, 6, 0.1], 1, (v) => (water.cheapRefractionDepth = v));
    slider(stage.bar, 'refractionScale', [0, 3, 0.1], 1, (v) => (water.refractionScale = v));
    slider(stage.bar, 'reflectionStrength', [0, 1, 0.05], 1, (v) => (water.reflectionStrength = v));
    slider(stage.bar, 'refractionBlur', [0, 3, 0.1], 1, (v) => (water.refractionBlur = v));
  } else {
    stage.caption('refractionScale sweeps 1 to 3: the bed bends further');
  }
  myApp.run();
});
