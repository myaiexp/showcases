// 2D procedural clouds on the scatter sky: cloudy, cloudIntensity and wind
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, DirectionalLight, getEngine, getInput, OrbitCameraController, PerspectiveCamera, Scene } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();

  // Look at the sky: straight out, tilted a little up
  scene.mainCamera = new PerspectiveCamera(scene, Math.PI / 3, 1, 500);
  scene.mainCamera.controller = new OrbitCameraController({ center: new Vector3(0, 0, 1) });
  scene.mainCamera.lookAt(new Vector3(0, 0, 0), new Vector3(0, 0.55, -1), Vector3.axisPY());
  getInput().use(scene.mainCamera.handleEvent, scene.mainCamera);

  const sunLight = new DirectionalLight(scene);
  sunLight.lookAt(new Vector3(0, 15, -10), new Vector3(0, 0, 0), Vector3.axisPY());

  const sky = scene.env.sky;
  sky.skyType = 'scatter';
  // Cloud cover, brightness and wind (which drives drift speed and direction)
  sky.cloudy = 0.5;
  sky.cloudIntensity = 1.5;
  sky.wind.setXY(600, 0);
  scene.mainCamera.toneMap = true;
  getEngine().setRenderable(scene, 0);

  const out = stage.readout();
  if (stage.bar) {
    slider(stage.bar, 'cloudy', [0, 1, 0.01], sky.cloudy, (v) => (sky.cloudy = v));
    slider(stage.bar, 'cloudIntensity', [0, 4, 0.1], sky.cloudIntensity, (v) => (sky.cloudIntensity = v));
    slider(stage.bar, 'wind x', [-1500, 1500, 50], 600, (v) => sky.wind.setXY(v, sky.wind.y));
    slider(stage.bar, 'wind y', [-1500, 1500, 50], 0, (v) => sky.wind.setXY(sky.wind.x, v));
    if (out) out.textContent = `cloudMode = ${sky.cloudMode}, effectiveCloudMode = ${sky.effectiveCloudMode}`;
  } else {
    stage.caption('cloudy 0.5, wind (600, 0): clouds drift');
    myApp.on('tick', (_dt, ms) => {
      sky.cloudy = 0.45 + 0.25 * Math.sin(ms * 0.0004);
    });
  }
  myApp.run();
});
