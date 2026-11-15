// scene.metersPerUnit: how many metres one scene unit is, which sets inverse-square falloff
import { Vector3 } from '@zephyr3d/base';
import { PointLight } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lightDemo } from '../../shared/light-demo.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const { myApp, scene, camera } = await lightDemo(stage, { boxSize: 2, boxColor: [0.8, 0.75, 0.6], floorColor: [0.6, 0.65, 0.7], floorSize: 40, eye: new Vector3(14, 12, 14) });
  scene.lightingMode = 'physical';
  scene.env.light.type = 'none';
  scene.env.sky.skyType = 'none';
  camera.aperture = 2;
  camera.shutterSpeed = 1 / 30;
  camera.ISO = 1600;

  const bulb = new PointLight(scene);
  bulb.luminousPower = 1500;
  bulb.position.setXYZ(0, 5, 0);

  // 1 unit = 1 metre by default. With 0.01 the same geometry is a 40 cm room, so the
  // light is much closer in the physical world and the illuminance is far higher.
  scene.metersPerUnit = 1;

  const report = (): void => stage.caption(`metersPerUnit = ${scene.metersPerUnit} (the bulb is ${(5 * scene.metersPerUnit).toFixed(2)} m above the floor)`);
  report();
  if (stage.bar) {
    // Log scale: 0.01 .. 10
    slider(stage.bar, 'metersPerUnit (log10)', [-2, 1, 0.05], 0, (v) => {
      scene.metersPerUnit = 10 ** v;
      report();
    });
  } else {
    myApp.on('tick', (_dt, ms) => {
      scene.metersPerUnit = 10 ** (-0.8 + 0.8 * Math.sin(ms * 0.0006));
      report();
    });
  }
  myApp.run();
});
