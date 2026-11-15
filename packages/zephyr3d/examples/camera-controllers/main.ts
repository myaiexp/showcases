// The two built-in camera controllers: FPSCameraController (WASD + mouse) and OrbitCameraController
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  Application,
  DirectionalLight,
  FPSCameraController,
  getEngine,
  getInput,
  OrbitCameraController,
  PerspectiveCamera,
  Scene,
} from '@zephyr3d/scene';
import { select, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { boxField, floor, lambert } from '../../shared/light-world.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();

  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(Vector3.one(), Vector3.zero(), Vector3.axisPY());
  boxField(scene, lambert(1, 0.85, 0.1), 14, 4, 1.6);
  floor(scene, lambert(0.1, 0.8, 0.9), 120);

  scene.mainCamera = new PerspectiveCamera(scene, Math.PI / 3, 0.5, 300);
  const eye = new Vector3(24, 14, 24);
  scene.mainCamera.lookAt(eye, Vector3.zero(), new Vector3(0, 1, 0));
  // Setting `controller` is not enough: the camera only hears the mouse and keys once its
  // handleEvent is in the input chain.
  getInput().use(scene.mainCamera.handleEvent, scene.mainCamera);
  getEngine().setRenderable(scene, 0);

  type Kind = 'OrbitCameraController' | 'FPSCameraController';
  let moveSpeed = 0.5;
  const choose = (kind: Kind): void => {
    scene.mainCamera!.controller =
      kind === 'OrbitCameraController' ? new OrbitCameraController({ center: Vector3.zero() }) : new FPSCameraController({ moveSpeed });
    stage.caption(kind === 'FPSCameraController' ? 'FPS: W/A/S/D move, drag to look' : 'Orbit: drag to rotate, wheel to zoom');
  };
  choose('OrbitCameraController');

  if (stage.bar) {
    select(stage.bar, 'controller', ['OrbitCameraController', 'FPSCameraController'] as const, 'OrbitCameraController', choose);
    slider(stage.bar, 'FPS moveSpeed', [0.1, 2, 0.1], moveSpeed, (v) => {
      moveSpeed = v;
      if (scene.mainCamera!.controller instanceof FPSCameraController) scene.mainCamera!.controller.setOptions({ moveSpeed });
    });
  }
  if (stage.preview) {
    // A card gets no pointer: swing the orbit controller by hand.
    myApp.on('tick', (_dt, ms) => {
      const a = ms * 0.0004;
      const c = scene.mainCamera!.controller;
      if (c instanceof OrbitCameraController) c.lookAt(new Vector3(Math.cos(a) * 30, 14, Math.sin(a) * 30), Vector3.zero(), new Vector3(0, 1, 0));
    });
  }
  myApp.run();
});
