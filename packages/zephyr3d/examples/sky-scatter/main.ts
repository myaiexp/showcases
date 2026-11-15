// Atmospheric scattering: the sky is computed from the sun's direction, and one light is the sun
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  Application,
  DirectionalLight,
  getEngine,
  getInput,
  Mesh,
  OrbitCameraController,
  PBRMetallicRoughnessMaterial,
  PerspectiveCamera,
  PlaneShape,
  Scene,
  SphereShape,
} from '@zephyr3d/scene';
import { select, slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();

  scene.mainCamera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 500);
  scene.mainCamera.controller = new OrbitCameraController({ center: new Vector3(0, 1, 0) });
  scene.mainCamera.lookAt(new Vector3(0, 2, 11), new Vector3(0, 2.5, 0), Vector3.axisPY());
  getInput().use(scene.mainCamera.handleEvent, scene.mainCamera);

  // The sky is computed from the sunlight direction; the first directional light is the sun
  scene.env.sky.skyType = 'scatter';
  scene.env.light.type = 'ibl';
  const lightA = new DirectionalLight(scene);
  const lightB = new DirectionalLight(scene);
  lightB.intensity = 0.6;
  let elevation = 25;
  let azimuthA = 0.4;
  const azimuthB = 3.6;
  const aim = (light: DirectionalLight, az: number, el: number): void => {
    const e = (el * Math.PI) / 180;
    light.lookAt(new Vector3(Math.cos(az) * Math.cos(e) * 50, Math.sin(e) * 50, Math.sin(az) * Math.cos(e) * 50), Vector3.zero(), Vector3.axisPY());
  };
  const update = (): void => {
    aim(lightA, azimuthA, elevation);
    aim(lightB, azimuthB, elevation * 0.6 + 8);
  };
  update();

  const shape = new SphereShape({ radius: 1 });
  for (let i = 0; i < 4; i++) {
    const m = new PBRMetallicRoughnessMaterial();
    m.metallic = i % 2;
    m.roughness = 0.2 + i * 0.2;
    new Mesh(scene, shape, m).position.setXYZ((i - 1.5) * 2.4, 1, 0);
  }
  const ground = new PBRMetallicRoughnessMaterial();
  ground.metallic = 0;
  ground.roughness = 0.9;
  new Mesh(scene, new PlaneShape({ size: 60 }), ground);
  getEngine().setRenderable(scene, 0);

  // Scattered sky is high dynamic range: tone map it
  scene.mainCamera.toneMap = true;

  const out = stage.readout();
  const show = (): void => {
    if (out) out.textContent = `lightA.sunLight = ${lightA.sunLight}\nlightB.sunLight = ${lightB.sunLight}\nsun elevation ${elevation.toFixed(0)} deg`;
  };
  if (stage.bar) {
    slider(stage.bar, 'sun elevation (deg)', [-8, 85, 1], elevation, (v) => {
      elevation = v;
      update();
      show();
    });
    slider(stage.bar, 'azimuth of light A', [0, 6.28, 0.05], azimuthA, (v) => {
      azimuthA = v;
      update();
    });
    select(stage.bar, 'sun', ['light A', 'light B', 'neither'] as const, 'light A', (v) => {
      // Only one directional light is the sun at a time: setting it clears the previous one
      if (v === 'light A') lightA.sunLight = true;
      else if (v === 'light B') lightB.sunLight = true;
      else {
        lightA.sunLight = false;
        lightB.sunLight = false;
      }
      show();
    });
    slider(stage.bar, 'toneMapExposure', [0.2, 3, 0.1], 1, (v) => (scene.mainCamera!.toneMapExposure = v));
    toggle(stage.bar, 'tone mapping', true, (v) => (scene.mainCamera!.toneMap = v));
    show();
  } else {
    stage.caption('skyType = scatter: sunLight drives the sky');
    myApp.on('tick', (_dt, ms) => {
      elevation = 22 + 20 * Math.sin(ms * 0.0006);
      azimuthA = 0.4 + ms * 0.0002;
      update();
    });
  }
  myApp.run();
});
