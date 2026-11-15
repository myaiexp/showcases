// ESM shadows: exponential shadow maps with esmDepthScale and an optional blur
import { DirectionalLight } from '@zephyr3d/scene';
import { select, slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lightDemo } from '../../shared/light-demo.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const { myApp, scene } = await lightDemo(stage);

  const light = new DirectionalLight(scene);
  light.rotation.fromEulerAngle(-Math.PI / 4, Math.PI / 4, 0);
  light.castShadow = true;
  // Exponential Shadow Mapping: an exponential falloff of the depth difference, very soft and cheap
  light.shadow.mode = 'esm';
  light.shadow.shadowMapSize = 512;
  light.shadow.esmDepthScale = 200;
  light.shadow.esmBlur = true;
  light.shadow.esmLogSpace = true;
  light.shadow.esmBlurKernelSize = 5;
  light.shadow.esmBlurRadius = 4;

  let turning = true;
  myApp.on('tick', (_dt, ms) => {
    if (turning) light.rotation.fromEulerAngle(-Math.PI / 4, ms * 0.0003, 0);
  });

  if (stage.bar) {
    const s = light.shadow;
    slider(stage.bar, 'esmDepthScale', [10, 800, 10], s.esmDepthScale, (v) => (s.esmDepthScale = v));
    toggle(stage.bar, 'esmBlur', true, (v) => (s.esmBlur = v));
    toggle(stage.bar, 'esmLogSpace', true, (v) => (s.esmLogSpace = v));
    select(stage.bar, 'esmBlurKernelSize', ['3', '5', '7', '9'] as const, '5', (v) => (s.esmBlurKernelSize = Number(v)));
    slider(stage.bar, 'esmBlurRadius', [0, 16, 0.5], s.esmBlurRadius, (v) => (s.esmBlurRadius = v));
    toggle(stage.bar, 'esm (off: hard)', true, (v) => (s.mode = v ? 'esm' : 'hard'));
    toggle(stage.bar, 'rotate light', true, (v) => (turning = v));
  } else {
    stage.caption("shadow.mode = 'esm'");
    stage.every(2500, (i) => (light.shadow.esmDepthScale = i % 2 ? 60 : 300));
  }
  myApp.run();
});
