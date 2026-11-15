// TAA: jittered frames accumulated over time, with the TAADebug views of its inputs
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  Application,
  BoxShape,
  Mesh,
  Scene,
  TAA_DEBUG_ALAPH,
  TAA_DEBUG_CURRENT_COLOR,
  TAA_DEBUG_EDGE,
  TAA_DEBUG_HISTORY_COLOR,
  TAA_DEBUG_NONE,
  TAA_DEBUG_STRENGTH,
  TAA_DEBUG_VELOCITY,
  TorusShape,
} from '@zephyr3d/scene';
import { select, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera, pbr, sunAndFloor } from '../../shared/post-scene.ts';

const VIEWS = {
  none: TAA_DEBUG_NONE,
  currentColor: TAA_DEBUG_CURRENT_COLOR,
  historyColor: TAA_DEBUG_HISTORY_COLOR,
  velocity: TAA_DEBUG_VELOCITY,
  edge: TAA_DEBUG_EDGE,
  alpha: TAA_DEBUG_ALAPH,
  strength: TAA_DEBUG_STRENGTH,
};

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: 1 });
  await myApp.ready();
  const scene = new Scene();
  scene.env.light.type = 'constant';
  scene.env.light.strength = 0.5;
  sunAndFloor(scene, 0.6);

  // A spinning torus (it has velocity) and a still lattice of thin bars (all edges)
  const torus = new Mesh(scene, new TorusShape({ outerRadius: 1.5, innerRadius: 0.45 }), pbr(0.9, 0.3, 0.2, 0, 0.4));
  torus.position.setXYZ(0, 1.8, 0);
  const slat = new BoxShape({ sizeX: 0.08, sizeY: 2.6, sizeZ: 0.08 });
  for (let i = 0; i < 9; i++) new Mesh(scene, slat, pbr(0.9, 0.9, 0.95, 0, 0.5)).position.setXYZ(-5 + i * 0.4, 1.3, -2);

  const camera = orbitCamera(scene, new Vector3(0, 3, 8), new Vector3(0, 1.4, 0), false);
  camera.TAA = true;

  myApp.on('tick', (_dt, ms) => {
    torus.rotation.fromEulerAngle(ms * 0.0007, ms * 0.0011, 0);
  });
  if (stage.bar) {
    toggle(stage.bar, 'TAA', true, (v) => (camera.TAA = v));
    select(stage.bar, 'TAADebug', Object.keys(VIEWS) as (keyof typeof VIEWS)[], 'none', (v) => (camera.TAADebug = VIEWS[v]));
  } else {
    stage.caption('camera.TAA accumulating jittered frames');
  }
  myApp.run();
});
