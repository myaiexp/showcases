// Dual depth peeling resolves two layers per pass; too few passes leave deep layers wrong
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, DualDepthPeelingOIT, getEngine, getInput, OrbitCameraController, PerspectiveCamera, Scene } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
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

  const out = stage.readout();
  const setPasses = (n: number): void => {
    // The argument is the number of peel iterations after the initialisation pass (default 8)
    const oit = new DualDepthPeelingOIT(n);
    camera.oit = oit;
    stage.caption(`camera.oit = new DualDepthPeelingOIT(${n})`);
    // Without the needed device features it silently falls back to sorted blending: say so
    if (out) out.textContent = oit.supportDevice(myApp.device.type) ? `${n} peel iterations` : 'dual depth peeling is not supported on this device: sorted blending is used';
  };
  myApp.on('tick', (_dt, elapsed) => update(elapsed / 1000));
  if (stage.bar) slider(stage.bar, 'peel iterations', [1, 8, 1], 1, setPasses);
  else stage.every(1500, (i) => setPasses(1 + (i % 4)));
  setPasses(1);
  myApp.run();
});
