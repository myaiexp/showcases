// A shadow-casting SpotLight sweeping its cone across boxes
import { Vector4 } from '@zephyr3d/base';
import { SpotLight } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lightDemo } from '../../shared/light-demo.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const { myApp, scene } = await lightDemo(stage, { floorSize: 200 });

  const light = new SpotLight(scene);
  light.color = new Vector4(1, 1, 1, 1);
  light.cutoff = Math.cos(Math.PI * 0.2);
  light.intensity = 120;
  light.position.setXYZ(0, 18, 0);
  light.castShadow = true;
  light.shadow.depthBias = 0.003;

  let pitch = -Math.PI / 4;
  let turning = true;
  myApp.on('tick', (_dt, ms) => {
    if (turning) light.rotation.fromEulerAngle(pitch, ms * 0.0005, 0);
  });

  if (stage.bar) {
    toggle(stage.bar, 'castShadow', true, (v) => (light.castShadow = v));
    slider(stage.bar, 'depthBias', [0, 0.02, 0.0005], light.shadow.depthBias, (v) => (light.shadow.depthBias = v));
    slider(stage.bar, 'cone half-angle (deg)', [10, 70, 1], 36, (v) => (light.cutoff = Math.cos((v * Math.PI) / 180)));
    slider(stage.bar, 'pitch (deg)', [-85, -20, 1], -45, (v) => (pitch = (v * Math.PI) / 180));
    toggle(stage.bar, 'sweep', true, (v) => (turning = v));
  } else {
    stage.caption('SpotLight.castShadow = true');
  }
  myApp.run();
});
