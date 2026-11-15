// Transparent instances share one draw call, so they cannot be sorted: OIT blends them right
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
  WeightedBlendedOIT,
} from '@zephyr3d/scene';
import { toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  scene.env.light.type = 'hemisphere';
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 2, 1), Vector3.zero(), Vector3.axisPY());

  const bubble = new SphereShape({ radius: 0.6 });
  const material = new LambertMaterial();
  material.blendMode = 'blend';
  const bubbles: Mesh[] = [];
  for (let i = 0; i < 125; i++) {
    const m = material.createInstance();
    m.albedoColor = new Vector4((i % 5) / 4, ((i / 5) % 5) / 4, Math.floor(i / 25) / 4, 0.35);
    const b = new Mesh(scene, bubble, m);
    bubbles.push(b);
  }

  const camera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 100);
  scene.mainCamera = camera;
  camera.lookAt(new Vector3(0, 3, 9), Vector3.zero(), Vector3.axisPY());
  camera.controller = new OrbitCameraController();
  getInput().use(camera.handleEvent, camera);
  getEngine().setRenderable(scene, 0);

  const setOit = (on: boolean): void => {
    camera.oit = on ? new WeightedBlendedOIT() : null;
    stage.caption(on ? 'camera.oit = new WeightedBlendedOIT()' : 'camera.oit = null: unsorted instances');
  };
  myApp.on('tick', (_dt, elapsed) => {
    const t = elapsed * 0.0004;
    bubbles.forEach((b, i) => {
      const x = (i % 5) - 2;
      const y = ((i / 5) | 0) % 5;
      const z = ((i / 25) | 0) - 2;
      b.position.setXYZ(x * 0.9, (y - 2) * 0.9 + Math.sin(t * 3 + i) * 0.2, z * 0.9);
    });
    scene.rootNode.rotation.fromEulerAngle(0, t, 0);
  });
  setOit(true);
  if (stage.bar) toggle(stage.bar, 'Weighted Blended OIT', true, setOit);
  else stage.every(2500, (i) => setOit(i % 2 === 0));
  myApp.run();
});
