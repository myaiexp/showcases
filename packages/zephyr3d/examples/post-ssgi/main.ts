// SSGI colour bleeding in a small room: IBL plus camera.SSGI, with the quality presets
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, DirectionalLight, Scene } from '@zephyr3d/scene';
import { select, slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { colorRoom, orbitCamera } from '../../shared/post-scene.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  // Both sides opt in: the IBL environment here, camera.SSGI below
  scene.env.light.type = 'ibl';
  scene.env.light.strength = 0.8;
  const sun = new DirectionalLight(scene);
  sun.lookAt(new Vector3(-3, 9, 12), new Vector3(0, 1, 0), Vector3.axisPY());
  sun.intensity = 3;
  const { ball } = colorRoom(scene);

  const camera = orbitCamera(scene, new Vector3(0, 4, 13), new Vector3(0, 3.5, 0));
  camera.toneMap = true;
  camera.SSGI = true;
  camera.ssgiQualityPreset = 'balanced';

  myApp.on('tick', (_dt, ms) => {
    ball.position.setXYZ(1.5 + Math.sin(ms * 0.0008) * 1.4, 1.1, 0.6);
  });
  if (stage.bar) {
    toggle(stage.bar, 'SSGI', true, (v) => (camera.SSGI = v));
    select(stage.bar, 'ssgiQualityPreset', ['quality', 'balanced', 'performance'] as const, 'balanced', (v) => (camera.ssgiQualityPreset = v));
    slider(stage.bar, 'ssgiIntensity', [0, 2, 0.05], camera.ssgiIntensity, (v) => (camera.ssgiIntensity = v));
    slider(stage.bar, 'ssgiSkyOcclusion', [0, 1, 0.05], camera.ssgiSkyOcclusion, (v) => (camera.ssgiSkyOcclusion = v));
  } else {
    stage.caption('camera.SSGI switching on and off');
    stage.every(2000, (i) => (camera.SSGI = i % 2 === 0));
  }
  myApp.run();
});
