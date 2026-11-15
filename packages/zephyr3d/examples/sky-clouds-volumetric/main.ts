// Volumetric clouds are WebGPU-only: set them up and read effectiveCloudMode to see what drew
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, DirectionalLight, getEngine, getInput, OrbitCameraController, PerspectiveCamera, Scene } from '@zephyr3d/scene';
import { button, select, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();

  scene.mainCamera = new PerspectiveCamera(scene, Math.PI / 3, 1, 500);
  scene.mainCamera.controller = new OrbitCameraController({ center: new Vector3(0, 2, -1) });
  scene.mainCamera.lookAt(new Vector3(0, 0, 0), new Vector3(0, 2, -1), Vector3.axisPY());
  getInput().use(scene.mainCamera.handleEvent, scene.mainCamera);
  new DirectionalLight(scene).lookAt(new Vector3(0, 15, -10), new Vector3(0, 0, 0), Vector3.axisPY());

  const sky = scene.env.sky;
  sky.skyType = 'scatter';
  sky.cloudy = 0.5;
  sky.wind.setXY(600, 0);
  scene.mainCamera.toneMap = true;

  // The volumetric layer, distances in metres. On WebGL2 all of this is stored but not drawn.
  const clouds = sky.volumetricCloud;
  clouds.layerBottomAltitude = 5000;
  clouds.layerHeight = 10000;
  clouds.coverage = 0.45;
  clouds.density = 0.03;
  clouds.wind.setXY(10, 0);
  clouds.framesPerUpdate = 64;
  clouds.cacheResolution = 768;
  getEngine().setRenderable(scene, 0);

  const out = stage.readout();
  const show = (): void => {
    const webgpu = myApp.device.type === 'webgpu';
    if (out) {
      out.textContent = `device.type = ${myApp.device.type}\ncloudMode = ${sky.cloudMode}\neffectiveCloudMode = ${sky.effectiveCloudMode}${webgpu ? '' : '\nvolumetric falls back to the 2D clouds off WebGPU'}`;
    }
  };
  const setMode = (mode: 'procedural' | 'volumetric'): void => {
    sky.cloudMode = mode;
    show();
  };
  setMode('volumetric');
  if (stage.bar) {
    select(stage.bar, 'cloudMode', ['volumetric', 'procedural'] as const, 'volumetric', setMode);
    slider(stage.bar, 'coverage', [0, 1, 0.01], clouds.coverage, (v) => (clouds.coverage = v));
    slider(stage.bar, 'density', [0.005, 0.1, 0.005], clouds.density, (v) => (clouds.density = v));
    slider(stage.bar, 'layerBottomAltitude', [500, 8000, 100], clouds.layerBottomAltitude, (v) => (clouds.layerBottomAltitude = v));
    button(stage.bar, 'cloudDebugView: weather', () => (sky.cloudDebugView = sky.cloudDebugView === 'weather' ? 'none' : 'weather'));
  } else {
    stage.caption('cloudMode = volumetric asks for WebGPU; this device draws the 2D clouds');
    myApp.on('tick', (_dt, ms) => {
      sky.cloudy = 0.45 + 0.2 * Math.sin(ms * 0.0004);
    });
  }
  myApp.run();
});
