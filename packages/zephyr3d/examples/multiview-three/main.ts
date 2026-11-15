// A three-view layout: a perspective camera on the right, top and side ortho views on the left
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, getInput, OrbitCameraController, OrthoCamera, PerspectiveCamera } from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';
import { sampleScene } from './scene.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const { scene, update } = sampleScene();

  // Three cameras sharing one scene
  const camMain = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 100);
  camMain.lookAt(new Vector3(9, 7, 9), Vector3.zero(), Vector3.axisPY());
  camMain.controller = new OrbitCameraController();
  getInput().use(camMain.handleEvent, camMain);
  const camTop = new OrthoCamera(scene, -7, 7, -7, 7, 0.1, 50);
  camTop.lookAt(new Vector3(0, 20, 0), Vector3.zero(), new Vector3(0, 0, -1));
  const camSide = new OrthoCamera(scene, -7, 7, -2, 5, 0.1, 50);
  camSide.lookAt(new Vector3(20, 1.5, 0), new Vector3(0, 1.5, 0), Vector3.axisPY());

  myApp.on('tick', (_dt, elapsed) => {
    update(elapsed / 1000);
    camMain.updateController();
    const w = myApp.device.deviceXToScreen(myApp.device.canvas.width);
    const h = myApp.device.deviceYToScreen(myApp.device.canvas.height);
    // Main camera: right half. Top camera: upper-left quadrant. Side camera: lower-left quadrant.
    camMain.viewport = [w / 2, 0, w / 2, h];
    camMain.aspect = w / 2 / h;
    camTop.viewport = [0, h / 2, w / 2, h / 2];
    camSide.viewport = [0, 0, w / 2, h / 2];
    // Keep the ortho views undistorted: widen their horizontal extent to the viewport's aspect
    const a = w / 2 / (h / 2);
    camTop.left = -7 * a;
    camTop.right = 7 * a;
    camSide.left = -3.5 * a;
    camSide.right = 3.5 * a;
    // Render order sets which view lands on top where they overlap
    camTop.render(scene);
    camSide.render(scene);
    camMain.render(scene);
  });
  stage.caption('top, side (OrthoCamera) and perspective views');
  myApp.run();
});
