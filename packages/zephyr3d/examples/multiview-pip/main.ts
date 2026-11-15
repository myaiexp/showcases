// Picture-in-picture: one camera rendered twice per tick, full screen then a small window
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, getInput, OrbitCameraController, PerspectiveCamera } from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';
import { sampleScene } from './scene.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const { scene, update } = sampleScene();

  const camera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 100);
  camera.lookAt(new Vector3(8, 7, 10), Vector3.zero(), Vector3.axisPY());
  camera.controller = new OrbitCameraController();
  getInput().use(camera.handleEvent, camera);

  // No setRenderable(): this example drives rendering itself with camera.render(scene)
  myApp.on('tick', (_dt, elapsed) => {
    update(elapsed / 1000);
    // Rendering by hand, so the controller is not advanced automatically: do it once per frame
    camera.updateController();
    // Canvas size in CSS pixels; viewports are [x, y, width, height] from the bottom-left corner
    const canvasWidth = myApp.device.deviceXToScreen(myApp.device.canvas.width);
    const canvasHeight = myApp.device.deviceYToScreen(myApp.device.canvas.height);
    // First render: the main full-screen view
    camera.viewport = [0, 0, canvasWidth, canvasHeight];
    camera.aspect = canvasWidth / canvasHeight;
    camera.render(scene);
    // Second render: a small window, drawn over the first
    const w = Math.min(200, canvasWidth * 0.4);
    const h = w * 0.8;
    camera.viewport = [canvasWidth - w - 12, 12, w, h];
    camera.aspect = w / h;
    camera.render(scene);
  });
  stage.caption('camera.render(scene) twice with two viewports');
  myApp.run();
});
