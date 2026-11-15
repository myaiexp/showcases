// Order-independent transparency: switch camera.oitMode and watch the blend-order errors go
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  ABufferOIT,
  Application,
  DualDepthPeelingOIT,
  getEngine,
  getInput,
  OrbitCameraController,
  PerspectiveCamera,
  Scene,
  WeightedBlendedOIT,
} from '@zephyr3d/scene';
import { select } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { glassScene } from './glass.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  scene.env.light.type = 'hemisphere';
  const update = glassScene(scene);

  const camera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 100);
  scene.mainCamera = camera;
  camera.lookAt(new Vector3(0, 1.5, 5), Vector3.zero(), Vector3.axisPY());
  camera.controller = new OrbitCameraController();
  getInput().use(camera.handleEvent, camera);
  getEngine().setRenderable(scene, 0);

  // Which techniques this device can run: ABuffer needs WebGPU, dual depth needs MRT, min/max blending
  // and blendable float targets. An unsupported mode silently falls back to sorted blending.
  const deviceType = myApp.device.type;
  const supported = {
    none: true,
    weighted: new WeightedBlendedOIT().supportDevice(deviceType),
    'dual-depth': new DualDepthPeelingOIT(8).supportDevice(deviceType),
    abuffer: new ABufferOIT(16).supportDevice(deviceType),
  } as const;
  type Mode = keyof typeof supported;
  const modes = (Object.keys(supported) as Mode[]).filter((m) => supported[m]);
  const out = stage.readout();
  const setMode = (mode: Mode): void => {
    // The string form; camera.oit = new WeightedBlendedOIT() etc. does the same with an object
    camera.oitMode = mode;
    stage.caption(`camera.oitMode = '${mode}'`);
  };
  if (out) out.textContent = `device: ${deviceType}\n` + (Object.keys(supported) as Mode[]).map((m) => `${m}: ${supported[m] ? 'supported' : 'not supported here'}`).join('\n');

  myApp.on('tick', (_dt, elapsed) => update(elapsed / 1000));
  if (stage.bar) select(stage.bar, 'oitMode', modes, 'weighted', setMode);
  else stage.every(2500, (i) => setMode(i % 2 ? 'none' : 'weighted'));
  setMode('weighted');
  myApp.run();
});
