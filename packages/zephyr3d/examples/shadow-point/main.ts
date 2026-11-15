// A shadow-casting PointLight: the shadow map is a cube map around the light
import { Vector4 } from '@zephyr3d/base';
import { PointLight } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lightDemo } from '../../shared/light-demo.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const { myApp, scene } = await lightDemo(stage);

  const light = new PointLight(scene);
  light.color = new Vector4(1, 1, 1, 1);
  light.intensity = 40;
  light.range = 70;
  // Point lights shadow too (one cube map per light)
  light.castShadow = true;
  light.shadow.depthBias = 0.003;

  let moving = true;
  myApp.on('tick', (_dt, ms) => {
    if (moving) light.position.setXYZ(18 * Math.cos(ms * 0.0007), 14, 18 * Math.sin(ms * 0.0007));
  });

  if (stage.bar) {
    toggle(stage.bar, 'castShadow', true, (v) => (light.castShadow = v));
    slider(stage.bar, 'depthBias', [0, 0.02, 0.0005], light.shadow.depthBias, (v) => (light.shadow.depthBias = v));
    slider(stage.bar, 'shadowMapSize', [128, 2048, 128], light.shadow.shadowMapSize, (v) => (light.shadow.shadowMapSize = v));
    slider(stage.bar, 'height', [4, 30, 1], 14, (v) => (light.position.y = v));
    toggle(stage.bar, 'orbit the light', true, (v) => (moving = v));
  } else {
    stage.caption('PointLight.castShadow = true');
  }
  myApp.run();
});
