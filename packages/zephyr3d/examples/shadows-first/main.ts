// A shadow-casting directional light over boxes: castShadow, depthBias, static casters
import { Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  Application,
  BoxShape,
  DirectionalLight,
  getEngine,
  getInput,
  LambertMaterial,
  Mesh,
  OrbitCameraController,
  PerspectiveCamera,
  PlaneShape,
  Scene,
} from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();

  const scene = new Scene();
  // No ambient light, so the shadows show as pure black
  scene.env.light.type = 'none';

  const dirLight = new DirectionalLight(scene);
  dirLight.rotation.fromEulerAngle(-Math.PI / 4, Math.PI / 4, 0);
  dirLight.castShadow = true;
  // Too small leaves acne stripes; too large detaches the shadow (peter-panning).
  dirLight.shadow.depthBias = 0.001;

  const boxMaterial = new LambertMaterial();
  boxMaterial.albedoColor = new Vector4(1, 1, 0, 1);
  const boxShape = new BoxShape({ size: 6 });
  // A fixed layout instead of the docs' Math.random(), so every visit looks the same
  for (let i = 0; i < 16; i++) {
    const box = new Mesh(scene, boxShape, boxMaterial);
    const a = i * 2.4;
    const r = 6 + i * 1.3;
    box.position.setXYZ(Math.cos(a) * r, 3, Math.sin(a) * r);
    // castShadow defaults to true; boxes that never move can be cached as static casters.
    box.castShadow = true;
    dirLight.shadow.shadowRegion.addStaticCaster(box);
  }
  const floorMaterial = new LambertMaterial();
  floorMaterial.albedoColor = new Vector4(0, 1, 1, 1);
  new Mesh(scene, new PlaneShape({ size: 100 }), floorMaterial);

  scene.mainCamera = new PerspectiveCamera(scene, Math.PI / 3, 1, 600);
  scene.mainCamera.lookAt(new Vector3(0, 40, 60), Vector3.zero(), new Vector3(0, 1, 0));
  scene.mainCamera.controller = new OrbitCameraController();
  getInput().use(scene.mainCamera.handleEvent, scene.mainCamera);
  getEngine().setRenderable(scene, 0);

  let spinning = true;
  let angle = 0;
  myApp.on('tick', (dt) => {
    if (spinning) angle += dt * 0.0005;
    dirLight.rotation.fromEulerAngle(-Math.PI / 4, angle, 0);
  });
  if (stage.bar) {
    toggle(stage.bar, 'castShadow', true, (v) => (dirLight.castShadow = v));
    slider(stage.bar, 'depthBias', [0, 0.02, 0.0005], 0.001, (v) => (dirLight.shadow.depthBias = v));
    toggle(stage.bar, 'rotate light', true, (v) => (spinning = v));
  }
  myApp.run();
});
