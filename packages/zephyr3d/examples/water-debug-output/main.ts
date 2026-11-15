// debugOutput: look at the water's own intermediate terms (normals, foam, depth, fresnel, scattering…)
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene, type WaterDebugOutput } from '@zephyr3d/scene';
import { select, toggle } from '../../shared/controls.ts';
import { buildWorld, makeWater, swingCamera, waterFiles } from '../../shared/env-water.ts';
import { zephyrExample } from '../../shared/frame.ts';

const OUTPUTS: WaterDebugOutput[] = ['none', 'normal', 'foam', 'waterDepth', 'fresnel', 'reflection', 'refraction', 'absorption', 'scattering', 'sunScattering', 'subsurface', 'shadow', 'specular', 'depth'];

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await waterFiles();
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  const { camera } = await buildWorld(scene, { eye: new Vector3(0, 6, 14), depth: -3 });
  const water = makeWater(scene);

  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) {
      swingCamera(camera, ms, 14, 6);
      water.debugOutput = OUTPUTS[1 + (Math.floor(ms / 2200) % (OUTPUTS.length - 1))]!;
      stage.caption(`water.debugOutput = '${water.debugOutput}'`);
    }
  });
  if (stage.bar) {
    select(stage.bar, 'debugOutput', OUTPUTS, 'none', (v) => (water.debugOutput = v));
    toggle(stage.bar, 'wireframe', false, (v) => (water.wireframe = v));
  }
  myApp.run();
});
