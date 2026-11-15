// panoramaToCubemap: an equirectangular HDR image rendered into an rgba16f cube map
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, getEngine, getInput, OrbitCameraController, panoramaToCubemap, PerspectiveCamera, Scene } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { mirrorBalls, paintPanorama } from '../../shared/env-sky.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();

  scene.mainCamera = new PerspectiveCamera(scene, Math.PI / 3, 1, 500);
  scene.mainCamera.controller = new OrbitCameraController({ center: new Vector3(0, 0, 1) });
  scene.mainCamera.lookAt(new Vector3(0, 0.6, 7), new Vector3(0, 0, 1), Vector3.axisPY());
  getInput().use(scene.mainCamera.handleEvent, scene.mainCamera);

  // The docs load Wide_Street.hdr; this panorama is an rgba16f texture filled in code, with a
  // sun far above 1 so the HDR range matters
  const width = stage.preview ? 256 : 512;
  const panorama = myApp.device.createTexture2D('rgba16f', width, width / 2)!;
  paintPanorama(panorama, width, width / 2);
  // The target cube map is rgba16f: an 8-bit format would clip the highlights
  const skyboxTexture = myApp.device.createCubeTexture('rgba16f', stage.preview ? 128 : 512)!;
  await panoramaToCubemap(panorama, skyboxTexture);

  scene.env.sky.skyType = 'skybox';
  scene.env.sky.skyboxTexture = skyboxTexture;
  scene.env.sky.fogType = 'none';
  scene.env.light.type = 'ibl';
  mirrorBalls(scene);
  getEngine().setRenderable(scene, 0);

  scene.mainCamera.toneMap = true;
  let spin = stage.preview;
  myApp.on('tick', (_dt, ms) => {
    if (spin) scene.mainCamera!.lookAt(new Vector3(Math.sin(ms * 0.0004 + 2) * 7, 0.6, Math.cos(ms * 0.0004 + 2) * 7 + 1), new Vector3(0, 0, 1), Vector3.axisPY());
  });
  if (stage.bar) {
    toggle(stage.bar, 'tone mapping', true, (v) => (scene.mainCamera!.toneMap = v));
    slider(stage.bar, 'toneMapExposure', [0.2, 3, 0.1], 1, (v) => (scene.mainCamera!.toneMapExposure = v));
    toggle(stage.bar, 'auto orbit', false, (v) => (spin = v));
  } else {
    stage.caption('panoramaToCubemap(panorama, rgba16f cube)');
  }
  myApp.run();
});
