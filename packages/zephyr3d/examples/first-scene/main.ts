// The first scene: a red Lambert sphere, a directional light and an orbit camera
import { Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  Application,
  DirectionalLight,
  getEngine,
  getInput,
  LambertMaterial,
  Mesh,
  OrbitCameraController,
  PerspectiveCamera,
  Scene,
  SphereShape,
} from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();

  // Create scene and light
  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(Vector3.one(), Vector3.zero(), Vector3.axisPY());

  // A Lambert material on a sphere: without the light above it would render black
  const material = new LambertMaterial();
  material.albedoColor = new Vector4(1, 0, 0, 1);
  new Mesh(scene, new SphereShape(), material);

  scene.mainCamera = new PerspectiveCamera(scene, Math.PI / 3, 1, 100);
  scene.mainCamera.lookAt(new Vector3(0, 0, 4), Vector3.zero(), new Vector3(0, 1, 0));
  scene.mainCamera.controller = new OrbitCameraController();
  getInput().use(scene.mainCamera.handleEvent, scene.mainCamera);
  getEngine().setRenderable(scene, 0);

  // Swing the light around the sphere so the shading moves (a card gets no pointer input)
  myApp.on('tick', (_dt, elapsed) => {
    const t = elapsed * 0.0006;
    light.lookAt(new Vector3(Math.cos(t), 0.8, Math.sin(t)), Vector3.zero(), Vector3.axisPY());
  });
  stage.caption(stage.preview ? 'LambertMaterial + DirectionalLight' : 'Drag to orbit, wheel to zoom');
  myApp.run();
});
