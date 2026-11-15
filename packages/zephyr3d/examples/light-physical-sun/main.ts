// Physical lighting mode: sun illuminance in lux against a photographic camera (aperture, shutter, ISO)
import { Vector3 } from '@zephyr3d/base';
import { DirectionalLight } from '@zephyr3d/scene';
import { button, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lightDemo } from '../../shared/light-demo.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const { myApp, scene, camera } = await lightDemo(stage, { ambient: true, boxColor: [0.8, 0.6, 0.3], floorColor: [0.2, 0.25, 0.3], eye: new Vector3(32, 26, 32) });

  // Every light, material and exposure value now reads in real units
  scene.lightingMode = 'physical';

  const sun = new DirectionalLight(scene);
  sun.rotation.fromEulerAngle(-Math.PI / 4, Math.PI / 4, 0);
  sun.illuminance = 100000; // lux, midday sun
  sun.sunLight = true;

  // The defaults are the photographic "Sunny 16" reference: f/16, 1/125 s, ISO 100
  camera.aperture = 16;
  camera.shutterSpeed = 1 / 125;
  camera.ISO = 100;
  camera.exposureCompensation = 0;

  const out = stage.readout();
  const report = (): void => {
    if (out) {
      out.textContent = `illuminance ${Math.round(sun.illuminance)} lux   f/${camera.aperture.toFixed(1)}  1/${Math.round(1 / camera.shutterSpeed)} s  ISO ${Math.round(camera.ISO)}  comp ${camera.exposureCompensation} EV\nEV100 ${camera.EV100.toFixed(2)}   exposure ${camera.exposure.toExponential(2)}`;
    }
    stage.caption(`EV100 ${camera.EV100.toFixed(1)}, sun ${Math.round(sun.illuminance)} lux`);
  };
  report();

  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) {
      // A card cannot drag sliders: the sun fades through the day and the camera stays on Sunny 16
      sun.illuminance = 100000 * 0.5 ** (2 + 2 * Math.sin(ms * 0.0008));
      report();
    }
  });

  if (stage.bar) {
    // A log scale: lux spans four orders of magnitude
    slider(stage.bar, 'illuminance (log10 lux)', [2, 5.2, 0.05], 5, (v) => {
      sun.illuminance = 10 ** v;
      report();
    });
    slider(stage.bar, 'aperture f/', [1.4, 32, 0.1], camera.aperture, (v) => {
      camera.aperture = v;
      report();
    });
    slider(stage.bar, 'shutter 1/x s', [1, 2000, 1], 125, (v) => {
      camera.shutterSpeed = 1 / v;
      report();
    });
    slider(stage.bar, 'ISO', [50, 6400, 50], camera.ISO, (v) => {
      camera.ISO = v;
      report();
    });
    slider(stage.bar, 'exposureCompensation (EV)', [-3, 3, 0.25], 0, (v) => {
      camera.exposureCompensation = v;
      report();
    });
    button(stage.bar, 'overcast: 1000 lux, f/4 1/60 ISO 400', () => {
      sun.illuminance = 1000;
      camera.aperture = 4;
      camera.shutterSpeed = 1 / 60;
      camera.ISO = 400;
      report();
    });
    button(stage.bar, 'Sunny 16', () => {
      sun.illuminance = 100000;
      camera.aperture = 16;
      camera.shutterSpeed = 1 / 125;
      camera.ISO = 100;
      report();
    });
  }
  myApp.run();
});
