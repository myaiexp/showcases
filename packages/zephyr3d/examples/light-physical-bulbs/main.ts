// Physical point and spot lights in lumens and candela, with real cone angles
import { Vector3 } from '@zephyr3d/base';
import { PointLight, SpotLight } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lightDemo } from '../../shared/light-demo.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const { myApp, scene, camera } = await lightDemo(stage, { boxSize: 2, boxColor: [0.8, 0.75, 0.6], floorColor: [0.6, 0.65, 0.7], floorSize: 40, eye: new Vector3(14, 12, 14) });
  scene.lightingMode = 'physical';
  // A dim room: the sky stays out of it, and the camera is set for indoor light
  scene.env.light.type = 'none';
  scene.env.sky.skyType = 'none';
  camera.aperture = 2;
  camera.shutterSpeed = 1 / 30;
  camera.ISO = 1600;

  // A point light is authored in lumens (what the bulb's box says); shading uses candela
  const bulb = new PointLight(scene);
  bulb.luminousPower = 1500;
  bulb.position.setXYZ(-5, 4, 0);

  // A spot light has the same two properties plus real half-angles, in radians
  const spot = new SpotLight(scene);
  spot.luminousIntensity = 900;
  spot.innerConeAngle = (15 * Math.PI) / 180;
  spot.outerConeAngle = (30 * Math.PI) / 180;
  spot.position.setXYZ(6, 8, 0);

  const out = stage.readout();
  const report = (): void => {
    if (out) {
      out.textContent = `point: ${bulb.luminousPower.toFixed(0)} lm = ${bulb.luminousIntensity.toFixed(1)} cd\nspot: ${spot.luminousPower.toFixed(0)} lm = ${spot.luminousIntensity.toFixed(0)} cd, inner ${((spot.innerConeAngle * 180) / Math.PI).toFixed(0)} deg, outer ${((spot.outerConeAngle * 180) / Math.PI).toFixed(0)} deg`;
    }
    stage.caption(`point ${bulb.luminousPower.toFixed(0)} lm, spot ${spot.luminousIntensity.toFixed(0)} cd`);
  };
  report();

  myApp.on('tick', (_dt, ms) => {
    bulb.position.setXYZ(-5 + Math.sin(ms * 0.0008) * 3, 4, Math.cos(ms * 0.0008) * 3);
    spot.rotation.fromEulerAngle(-0.9, ms * 0.0006, 0);
    if (stage.preview) report();
  });

  if (stage.bar) {
    slider(stage.bar, 'point luminousPower (lm)', [100, 6000, 50], bulb.luminousPower, (v) => {
      bulb.luminousPower = v;
      report();
    });
    slider(stage.bar, 'spot luminousIntensity (cd)', [100, 4000, 50], spot.luminousIntensity, (v) => {
      spot.luminousIntensity = v;
      report();
    });
    slider(stage.bar, 'outerConeAngle (deg)', [5, 80, 1], 30, (v) => {
      spot.outerConeAngle = (v * Math.PI) / 180;
      report();
    });
    slider(stage.bar, 'innerConeAngle (deg)', [1, 79, 1], 15, (v) => {
      spot.innerConeAngle = (v * Math.PI) / 180;
      report();
    });
    slider(stage.bar, 'camera ISO', [100, 6400, 100], 1600, (v) => (camera.ISO = v));
  }
  myApp.run();
});
