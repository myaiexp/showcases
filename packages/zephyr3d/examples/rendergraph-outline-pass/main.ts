// A custom RenderModule on a camera's own pipeline: depth outlines inserted after LightPass
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  Application,
  createForwardPlusPipeline,
  ForwardPlusModules,
  getEngine,
  getInput,
  OrbitCameraController,
  PerspectiveCamera,
  Scene,
} from '@zephyr3d/scene';
import { color, slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { createOutlineModule, outlineScene } from '../../shared/rg-outline.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  const { box, sphere, torus } = outlineScene(scene);

  scene.mainCamera = new PerspectiveCamera(scene, Math.PI / 3, 1, 200);
  scene.mainCamera.lookAt(new Vector3(0, 8, 26), Vector3.zero(), Vector3.axisPY());
  scene.mainCamera.controller = new OrbitCameraController();
  getInput().use(scene.mainCamera.handleEvent, scene.mainCamera);

  // The default pipeline is shared by every camera: build a new one and put the module
  // right after the main lighting pass, so the outline lands before sky and fog.
  const outline = createOutlineModule('MyOutline');
  const withOutline = createForwardPlusPipeline().insertAfter(ForwardPlusModules.LightPass, outline);
  scene.mainCamera.renderPipeline = withOutline;
  getEngine().setRenderable(scene, 0);

  myApp.on('tick', (_dt, ms) => {
    torus.rotation.fromAxisAngle(Vector3.axisPX(), ms * 0.0008);
    sphere.position.y = -2 + Math.sin(ms * 0.0012) * 1.2;
    box.rotation.fromAxisAngle(Vector3.axisPY(), ms * 0.0005);
  });

  const out = stage.readout();
  const show = (): void => {
    if (out) {
      const pipeline = scene.mainCamera!.renderPipeline;
      out.textContent = `renderPipeline = ${pipeline ? `custom, ${pipeline.modules.length} modules` : 'null (the shared default pipeline)'}\n${pipeline ? pipeline.modules.map((m) => m.type).join(' > ') : ''}`;
    }
  };
  if (stage.bar) {
    toggle(stage.bar, 'custom pipeline', true, (on) => {
      // null falls back to the shared default pipeline, which has no outline pass
      scene.mainCamera!.renderPipeline = on ? withOutline : null;
      show();
    });
    slider(stage.bar, 'threshold', [0.005, 0.2, 0.005], outline.threshold, (v) => (outline.threshold = v));
    color(stage.bar, 'outline colour', '#000000', (r, g, b) => outline.outlineColor.setXYZ(r, g, b));
    show();
  } else {
    stage.caption('camera.renderPipeline = createForwardPlusPipeline().insertAfter(LightPass, outline)');
    outline.outlineColor.setXYZ(0.05, 0.05, 0.1);
  }
  myApp.run();
});
