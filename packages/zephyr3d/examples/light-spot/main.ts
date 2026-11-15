// SpotLight: cutoff is the cosine of the cone half-angle, not the angle
import { Vector4 } from '@zephyr3d/base';
import { SpotLight } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lightDemo } from '../../shared/light-demo.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const { myApp, scene } = await lightDemo(stage, { floorSize: 200 });

  const light = new SpotLight(scene);
  light.color = new Vector4(1, 1, 1, 1);
  // The cone half-angle goes in as a cosine: 36 degrees is Math.cos(Math.PI * 0.2)
  light.cutoff = Math.cos(Math.PI * 0.2);
  light.intensity = 80;
  light.position.setXYZ(0, 10, 0);

  let turning = true;
  let pitch = -Math.PI / 6;
  myApp.on('tick', (_dt, ms) => {
    if (turning) light.rotation.fromEulerAngle(pitch, ms * 0.0005, 0);
  });

  const show = (deg: number): void => stage.caption(`cutoff = cos(${deg.toFixed(0)} deg) = ${light.cutoff.toFixed(3)}`);
  show(36);
  if (stage.bar) {
    slider(stage.bar, 'half-angle (deg) -> cutoff', [5, 80, 1], 36, (deg) => {
      light.cutoff = Math.cos((deg * Math.PI) / 180);
      show(deg);
    });
    slider(stage.bar, 'intensity', [10, 300, 5], light.intensity, (v) => (light.intensity = v));
    slider(stage.bar, 'range (0 = from intensity)', [0, 80, 1], 0, (v) => (light.range = v));
    slider(stage.bar, 'pitch (deg)', [-89, -5, 1], -30, (v) => (pitch = (v * Math.PI) / 180));
    toggle(stage.bar, 'sweep', true, (v) => (turning = v));
  }
  myApp.run();
});
