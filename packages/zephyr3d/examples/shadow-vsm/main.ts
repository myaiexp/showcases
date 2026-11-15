// VSM shadows: variance shadow maps with a blur, vsmBlurKernelSize, vsmBlurRadius and vsmDarkness
import { DirectionalLight } from '@zephyr3d/scene';
import { select, slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lightDemo } from '../../shared/light-demo.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const { myApp, scene } = await lightDemo(stage);

  const light = new DirectionalLight(scene);
  light.rotation.fromEulerAngle(-Math.PI / 4, Math.PI / 4, 0);
  light.castShadow = true;
  // Variance Shadow Mapping: the map stores mean and mean-square depth, giving smooth transitions
  light.shadow.mode = 'vsm';
  light.shadow.shadowMapSize = 512;
  light.shadow.vsmBlurKernelSize = 5;
  light.shadow.vsmBlurRadius = 4;
  light.shadow.vsmDarkness = 0.3;

  let turning = true;
  myApp.on('tick', (_dt, ms) => {
    if (turning) light.rotation.fromEulerAngle(-Math.PI / 4, ms * 0.0003, 0);
  });

  if (stage.bar) {
    const s = light.shadow;
    select(stage.bar, 'vsmBlurKernelSize', ['3', '5', '7', '9'] as const, '5', (v) => (s.vsmBlurKernelSize = Number(v)));
    slider(stage.bar, 'vsmBlurRadius', [0, 16, 0.5], s.vsmBlurRadius, (v) => (s.vsmBlurRadius = v));
    slider(stage.bar, 'vsmDarkness', [0, 1, 0.02], s.vsmDarkness, (v) => (s.vsmDarkness = v));
    toggle(stage.bar, 'vsm (off: hard)', true, (v) => (s.mode = v ? 'vsm' : 'hard'));
    toggle(stage.bar, 'rotate light', true, (v) => (turning = v));
  } else {
    stage.caption("shadow.mode = 'vsm'");
    stage.every(2500, (i) => (light.shadow.vsmBlurRadius = i % 2 ? 1 : 8));
  }
  myApp.run();
});
