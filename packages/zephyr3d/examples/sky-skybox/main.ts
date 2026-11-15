// A skybox: a cube map assigned to scene.env.sky.skyboxTexture
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, getEngine, getInput, OrbitCameraController, PerspectiveCamera, Scene } from '@zephyr3d/scene';
import { select, slider, toggle } from '../../shared/controls.ts';
import { mirrorBalls, paintCube } from '../../shared/env-sky.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();

  scene.mainCamera = new PerspectiveCamera(scene, Math.PI / 3, 1, 500);
  scene.mainCamera.controller = new OrbitCameraController({ center: new Vector3(0, 0, 1) });
  scene.mainCamera.lookAt(new Vector3(0, 0.6, 7), new Vector3(0, 0, 1), Vector3.axisPY());
  getInput().use(scene.mainCamera.handleEvent, scene.mainCamera);

  // The docs load sky.dds; here the six faces are painted into a cube map in code
  const skyboxTexture = myApp.device.createCubeTexture('rgba8unorm', stage.preview ? 128 : 256)!;
  paintCube(skyboxTexture, skyboxTexture.width);

  // Set the sky rendering mode to Skybox and hand it the cube map
  scene.env.sky.skyType = 'skybox';
  scene.env.sky.skyboxTexture = skyboxTexture;
  // Disable height fog
  scene.env.sky.fogType = 'none';
  // Light the spheres from the same sky
  scene.env.light.type = 'ibl';
  const balls = mirrorBalls(scene);
  getEngine().setRenderable(scene, 0);

  let spin = stage.preview;
  myApp.on('tick', (_dt, ms) => {
    if (spin) scene.mainCamera!.lookAt(new Vector3(Math.sin(ms * 0.0004) * 7, 0.6, Math.cos(ms * 0.0004) * 7 + 1), new Vector3(0, 0, 1), Vector3.axisPY());
  });
  if (stage.bar) {
    select(stage.bar, 'skyType', ['skybox', 'none'] as const, 'skybox', (v) => (scene.env.sky.skyType = v));
    toggle(stage.bar, 'show balls', true, (v) => balls.forEach((b) => (b.showState = v ? 'visible' : 'hidden')));
    slider(stage.bar, 'env.light.intensity', [0, 3, 0.1], scene.env.light.intensity, (v) => (scene.env.light.intensity = v));
    toggle(stage.bar, 'auto orbit', false, (v) => (spin = v));
  } else {
    stage.caption('skyType = skybox, skyboxTexture = a cube map painted in code');
  }
  myApp.run();
});
