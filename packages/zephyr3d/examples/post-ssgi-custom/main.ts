// The custom SSGI preset: trace resolution, rays per pixel, steps, denoise passes and temporal filtering
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, DirectionalLight, Scene } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { colorRoom, orbitCamera } from '../../shared/post-scene.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  scene.env.light.type = 'ibl';
  scene.env.light.strength = 0.8;
  const sun = new DirectionalLight(scene);
  sun.lookAt(new Vector3(-3, 9, 12), new Vector3(0, 1, 0), Vector3.axisPY());
  sun.intensity = 3;
  const { box } = colorRoom(scene);

  const camera = orbitCamera(scene, new Vector3(0, 4, 13), new Vector3(0, 3.5, 0));
  camera.toneMap = true;
  camera.SSGI = true;
  // Setting any custom option switches the preset to 'custom'
  camera.ssgiQualityPreset = 'custom';
  camera.ssgiHalfResolution = true;
  camera.ssgiRaysPerPixel = 2;
  camera.ssgiMaxSteps = 48;
  camera.ssgiDenoisePasses = 2;

  myApp.on('tick', (_dt, ms) => {
    box.rotation.fromEulerAngle(0, ms * 0.0006, 0);
  });
  if (stage.bar) {
    const out = stage.readout()!;
    const show = (): void => {
      out.textContent = `preset: ${camera.ssgiQualityPreset}  resolved: ${JSON.stringify(camera.ssgiResolvedSettings)}`;
    };
    toggle(stage.bar, 'ssgiHalfResolution', true, (v) => (camera.ssgiHalfResolution = v));
    slider(stage.bar, 'ssgiRaysPerPixel', [1, 4, 1], 2, (v) => (camera.ssgiRaysPerPixel = v));
    slider(stage.bar, 'ssgiMaxSteps', [1, 256, 1], 48, (v) => (camera.ssgiMaxSteps = v));
    slider(stage.bar, 'ssgiDenoisePasses', [0, 5, 1], 2, (v) => (camera.ssgiDenoisePasses = v));
    toggle(stage.bar, 'ssgiTemporal', true, (v) => (camera.ssgiTemporal = v));
    slider(stage.bar, 'ssgiTemporalWeight', [0, 0.99, 0.01], camera.ssgiTemporalWeight, (v) => (camera.ssgiTemporalWeight = v));
    slider(stage.bar, 'ssgiMaxDistance', [2, 64, 1], camera.ssgiMaxDistance, (v) => (camera.ssgiMaxDistance = v));
    slider(stage.bar, 'ssgiAOIntensity', [0, 1, 0.05], camera.ssgiAOIntensity, (v) => (camera.ssgiAOIntensity = v));
    myApp.on('tick', show);
  } else {
    stage.caption('ssgiDenoisePasses 0 to 5');
    myApp.on('tick', (_dt, ms) => {
      camera.ssgiDenoisePasses = Math.floor(ms / 1500) % 6;
    });
  }
  myApp.run();
});
