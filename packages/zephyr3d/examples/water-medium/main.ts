// The water medium: absorption and scattering coefficients, from clear pool to turbid sea
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene } from '@zephyr3d/scene';
import { select, slider } from '../../shared/controls.ts';
import { buildWorld, makeWater, swingCamera, waterFiles } from '../../shared/env-water.ts';
import { zephyrExample } from '../../shared/frame.ts';

const PRESETS = {
  // Low absorption and scattering: the floor stays visible
  'clear pool': { absorption: new Vector3(0.08, 0.03, 0.02), scattering: new Vector3(0.01, 0.02, 0.03) },
  // High scattering gives a milky blue body
  'turbid sea': { absorption: new Vector3(0.4, 0.14, 0.09), scattering: new Vector3(0.06, 0.12, 0.15) },
} as const;
type Preset = keyof typeof PRESETS;

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await waterFiles();
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  const { camera } = await buildWorld(scene, { eye: new Vector3(0, 9, 14), depth: -5 });
  const water = makeWater(scene);

  const apply = (p: Preset): void => {
    water.absorption = PRESETS[p].absorption.clone();
    water.scattering = PRESETS[p].scattering.clone();
  };
  apply('clear pool');

  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) {
      swingCamera(camera, ms, 14, 9);
      // Sweep the global multipliers: quick turbidity changes without touching the colour
      const k = 0.5 + 1.5 * (0.5 + 0.5 * Math.sin(ms * 0.0006));
      water.absorptionScale = k;
      water.scatteringScale = k;
    }
  });
  if (stage.bar) {
    select(stage.bar, 'preset', Object.keys(PRESETS) as Preset[], 'clear pool', apply);
    slider(stage.bar, 'absorptionScale', [0, 4, 0.1], water.absorptionScale, (v) => (water.absorptionScale = v));
    slider(stage.bar, 'scatteringScale', [0, 4, 0.1], water.scatteringScale, (v) => (water.scatteringScale = v));
  } else {
    stage.caption('absorption / scattering coefficients, scaled by absorptionScale and scatteringScale');
  }
  myApp.run();
});
