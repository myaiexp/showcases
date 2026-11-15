// A rect light's PCSS shadow: the penumbra follows the size of the rectangle
import { Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, BoxShape, getEngine, getInput, LambertMaterial, Mesh, OrbitCameraController, PerspectiveCamera, PlaneShape, RectLight, Scene, UnlitMaterial, type ShadowMode } from '@zephyr3d/scene';
import { select, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  scene.env.light.type = 'none';

  const rectLight = new RectLight(scene);
  rectLight.width = 6;
  rectLight.height = 6;
  rectLight.range = 80;
  rectLight.intensity = 30;
  rectLight.castShadow = true;
  // With PCSS the penumbra follows the size of the rectangle: the bigger the light, the softer
  // the shadow, and the wider it spreads with distance from the object casting it.
  rectLight.shadow.mode = 'pcss';
  rectLight.shadow.depthBias = 0.003;
  rectLight.shadow.normalBias = 2.5;

  // The panel shows where the light is; it must not cast a shadow of its own
  const panelMaterial = new UnlitMaterial();
  panelMaterial.albedoColor = new Vector4(1, 1, 1, 1);
  const panel = new Mesh(scene, new BoxShape({ size: 1, sizeY: 1, sizeZ: 0.05 }), panelMaterial);
  panel.castShadow = false;
  panel.parent = rectLight;

  const boxMaterial = new LambertMaterial();
  boxMaterial.albedoColor = new Vector4(1, 1, 0, 1);
  for (let i = 0; i < 9; i++) {
    const height = 4 + (i % 3) * 4;
    const box = new Mesh(scene, new BoxShape({ size: 3, sizeY: height, sizeZ: 3 }), boxMaterial);
    box.position.setXYZ(((i % 3) - 1) * 14, height / 2, (Math.floor(i / 3) - 1) * 14);
  }
  const floorMaterial = new LambertMaterial();
  floorMaterial.albedoColor = new Vector4(0, 1, 1, 1);
  new Mesh(scene, new PlaneShape({ size: 100 }), floorMaterial);

  scene.mainCamera = new PerspectiveCamera(scene, Math.PI / 3, 1, 600);
  scene.mainCamera.lookAt(new Vector3(0, 40, 60), Vector3.zero(), new Vector3(0, 1, 0));
  scene.mainCamera.controller = new OrbitCameraController();
  // PCSS samples are rotated over frames, and TAA accumulates them
  scene.mainCamera.TAA = true;
  getInput().use(scene.mainCamera.handleEvent, scene.mainCamera);
  getEngine().setRenderable(scene, 0);

  const resize = (size: number): void => {
    rectLight.width = size;
    rectLight.height = size;
    panel.scale.setXYZ(size, size, 1);
  };
  resize(6);
  myApp.on('tick', (_dt, ms) => {
    // Sweep back and forth above the pillars, facing down
    const x = 12 * Math.sin(ms * 0.0004);
    rectLight.lookAt(new Vector3(x, 22, 0), new Vector3(x, 0, 0), Vector3.axisNZ());
  });

  if (stage.bar) {
    slider(stage.bar, 'light size (m)', [1, 12, 0.5], 6, resize);
    select(stage.bar, 'shadow.mode', ['hard', 'pcf', 'pcss'] as ShadowMode[], 'pcss', (v) => (rectLight.shadow.mode = v));
    stage.caption('RectLight + pcss: bigger light, softer shadow');
  } else {
    stage.caption("rectLight.shadow.mode = 'pcss'");
    stage.every(3000, (i) => resize(i % 2 ? 2 : 10));
  }
  myApp.run();
});
