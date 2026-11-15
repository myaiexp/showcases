// PCF shadows: pcfKernelSize 3, 5 or 7 against the unfiltered hard shadow
import { DirectionalLight } from '@zephyr3d/scene';
import { select, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lightDemo } from '../../shared/light-demo.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const { myApp, scene } = await lightDemo(stage);

  const light = new DirectionalLight(scene);
  light.rotation.fromEulerAngle(-Math.PI / 4, Math.PI / 4, 0);
  light.castShadow = true;
  // Percentage Closer Filtering: average the visibility of the nearby shadow-map texels
  light.shadow.mode = 'pcf';
  light.shadow.shadowMapSize = 512;
  light.shadow.pcfKernelSize = 5;

  let turning = true;
  myApp.on('tick', (_dt, ms) => {
    if (turning) light.rotation.fromEulerAngle(-Math.PI / 4, ms * 0.0003, 0);
  });

  const show = (): void => stage.caption(`mode '${light.shadow.mode}'${light.shadow.mode === 'pcf' ? `, pcfKernelSize ${light.shadow.pcfKernelSize}` : ''}`);
  show();
  if (stage.bar) {
    toggle(stage.bar, 'pcf (off: hard)', true, (v) => {
      light.shadow.mode = v ? 'pcf' : 'hard';
      show();
    });
    select(stage.bar, 'pcfKernelSize', ['3', '5', '7'] as const, '5', (v) => {
      light.shadow.pcfKernelSize = Number(v);
      show();
    });
    toggle(stage.bar, 'rotate light', true, (v) => (turning = v));
  } else {
    stage.every(2200, (i) => {
      light.shadow.mode = i % 4 === 3 ? 'hard' : 'pcf';
      light.shadow.pcfKernelSize = [3, 5, 7][i % 3]!;
      show();
    });
  }
  myApp.run();
});
