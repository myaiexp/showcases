// Dynamic batching: meshes sharing a primitive and instances of one material draw together
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
  Scene,
} from '@zephyr3d/scene';
import { toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 2, 1), Vector3.zero(), Vector3.axisPY());

  const side = stage.preview ? 16 : 30;
  const boxShape = new BoxShape({ size: 0.7 });
  const material = new LambertMaterial();
  const colorOf = (i: number, j: number): Vector4 => new Vector4(0.3 + 0.7 * (i / side), 0.4, 1 - 0.7 * (j / side), 1);
  const boxes: Mesh[] = [];
  const build = (instanced: boolean): void => {
    for (const b of boxes.splice(0)) b.remove();
    for (let i = 0; i < side; i++) {
      for (let j = 0; j < side; j++) {
        const box = new Mesh(scene);
        // Share the same geometry
        box.primitive = boxShape;
        // An instance of the shared material batches; a material of its own draws alone
        let m: LambertMaterial;
        if (instanced) m = material.createInstance();
        else m = new LambertMaterial();
        // Per-instance values do not break the batch
        m.albedoColor = colorOf(i, j);
        box.material = m;
        box.position.setXYZ(i - side / 2, 0, j - side / 2);
        boxes.push(box);
      }
    }
  };
  build(true);

  const camera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 200);
  scene.mainCamera = camera;
  camera.lookAt(new Vector3(side * 0.6, side * 0.55, side * 0.6), Vector3.zero(), Vector3.axisPY());
  camera.controller = new OrbitCameraController();
  getInput().use(camera.handleEvent, camera);
  getEngine().setRenderable(scene, 0);

  myApp.on('tick', (_dt, elapsed) => {
    const t = elapsed * 0.002;
    // Transforms are per instance too: a wave runs through the grid
    for (const [k, b] of boxes.entries()) b.position.y = Math.sin(t + (k % side) * 0.4 + Math.floor(k / side) * 0.3) * 0.6;
    const info = myApp.device.frameInfo;
    stage.caption(`${boxes.length} meshes, ${info.drawCalls} draw calls, ${info.FPS.toFixed(0)} fps`);
  });
  if (stage.bar) toggle(stage.bar, 'material.createInstance()', true, build);
  myApp.run();
});
