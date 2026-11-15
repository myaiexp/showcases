// OrbitCameraController options: center, zoomSpeed, rotateSpeed, panSpeed and damping
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  Application,
  BoxShape,
  DirectionalLight,
  getEngine,
  getInput,
  Mesh,
  OrbitCameraController,
  PerspectiveCamera,
  Scene,
  SphereShape,
} from '@zephyr3d/scene';
import { select, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { floor, lambert } from '../../shared/light-world.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();

  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(Vector3.one(), Vector3.zero(), Vector3.axisPY());
  // Three landmarks to orbit around
  const targets: Record<string, Vector3> = { red: new Vector3(-10, 1.5, 0), green: new Vector3(0, 1.5, 6), blue: new Vector3(10, 1.5, 0) };
  const colors = [lambert(1, 0.3, 0.2), lambert(0.3, 0.9, 0.4), lambert(0.3, 0.5, 1)];
  Object.values(targets).forEach((p, i) => {
    const mesh = new Mesh(scene, i === 1 ? new SphereShape({ radius: 1.5 }) : new BoxShape({ size: 3 }), colors[i]);
    mesh.position.set(p);
  });
  floor(scene, lambert(0.5, 0.5, 0.55), 80);

  scene.mainCamera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 200);
  scene.mainCamera.lookAt(new Vector3(0, 12, 26), targets.green!, new Vector3(0, 1, 0));
  const controller = new OrbitCameraController({ center: targets.green!, zoomSpeed: 5, rotateSpeed: 1, panSpeed: 1, damping: 0.1 });
  scene.mainCamera.controller = controller;
  getInput().use(scene.mainCamera.handleEvent, scene.mainCamera);
  getEngine().setRenderable(scene, 0);

  const opts = { zoomSpeed: 5, rotateSpeed: 1, panSpeed: 1, damping: 0.1 };
  const apply = (center: Vector3): void => controller.setOptions({ center, ...opts });
  const aim = (name: string): void => {
    const c = targets[name]!;
    apply(c);
    controller.lookAt(new Vector3(c.x, 12, c.z + 20), c, new Vector3(0, 1, 0));
    stage.caption(`orbiting the ${name} landmark`);
  };
  aim('green');

  if (stage.bar) {
    select(stage.bar, 'center', ['red', 'green', 'blue'] as const, 'green', aim);
    slider(stage.bar, 'zoomSpeed', [1, 20, 1], opts.zoomSpeed, (v) => {
      opts.zoomSpeed = v;
      apply(controller.center as Vector3);
    });
    slider(stage.bar, 'rotateSpeed', [0.2, 4, 0.2], opts.rotateSpeed, (v) => {
      opts.rotateSpeed = v;
      apply(controller.center as Vector3);
    });
    slider(stage.bar, 'panSpeed', [0.2, 4, 0.2], opts.panSpeed, (v) => {
      opts.panSpeed = v;
      apply(controller.center as Vector3);
    });
    slider(stage.bar, 'damping', [0, 0.9, 0.05], opts.damping, (v) => {
      opts.damping = v;
      apply(controller.center as Vector3);
    });
  }
  if (stage.preview) {
    // A card gets no pointer: hop between the three centres.
    const names = ['red', 'green', 'blue'];
    stage.every(2200, (i) => aim(names[i % 3]!));
  }
  myApp.run();
});
