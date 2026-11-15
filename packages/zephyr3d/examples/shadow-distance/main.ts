// shadow.shadowDistance: shadows fade out beyond a world-space distance from the camera
import { Vector3 } from '@zephyr3d/base';
import { DirectionalLight } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { avenue } from '../../shared/shadow-avenue.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const { myApp, scene } = await avenue(stage);

  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(40, 60, 30), Vector3.zero(), Vector3.axisPY());
  light.castShadow = true;
  light.shadow.numShadowCascades = 3;
  light.shadow.shadowMapSize = 1024;
  // The farthest distance from the camera at which shadows are still drawn
  light.shadow.shadowDistance = 500;

  const show = (): void => stage.caption(`shadowDistance = ${Math.round(light.shadow.shadowDistance)}`);
  show();
  if (stage.bar) {
    slider(stage.bar, 'shadowDistance', [20, 700, 10], light.shadow.shadowDistance, (v) => {
      light.shadow.shadowDistance = v;
      show();
    });
  } else {
    myApp.on('tick', (_dt, ms) => {
      light.shadow.shadowDistance = 150 + 130 * Math.sin(ms * 0.0007);
      show();
    });
  }
  myApp.run();
});
