// shadow.shadowMapSize: the simplest cure for jagged shadow edges
import { Vector4 } from '@zephyr3d/base';
import { DirectionalLight } from '@zephyr3d/scene';
import { select, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lightDemo } from '../../shared/light-demo.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const { myApp, scene } = await lightDemo(stage);

  const light = new DirectionalLight(scene);
  light.color = new Vector4(1, 1, 1, 1);
  light.rotation.fromEulerAngle(-Math.PI / 4, Math.PI / 4, 0);
  light.castShadow = true;
  // Mode 'hard' shows the aliasing plainly (no filtering)
  light.shadow.mode = 'hard';
  // Resolution in pixels: denser sampling and smoother edges, at a cost in memory and time
  light.shadow.shadowMapSize = 256;

  let turning = true;
  myApp.on('tick', (_dt, ms) => {
    if (turning) light.rotation.fromEulerAngle(-Math.PI / 4, ms * 0.0003, 0);
  });

  const show = (): void => stage.caption(`shadowMapSize = ${light.shadow.shadowMapSize}, mode '${light.shadow.mode}'`);
  show();
  if (stage.bar) {
    select(stage.bar, 'shadowMapSize', ['128', '256', '512', '1024', '2048', '4096'] as const, '256', (v) => {
      light.shadow.shadowMapSize = Number(v);
      show();
    });
    toggle(stage.bar, 'hard (off: pcf)', true, (v) => {
      light.shadow.mode = v ? 'hard' : 'pcf';
      show();
    });
    toggle(stage.bar, 'rotate light', true, (v) => (turning = v));
  } else {
    stage.every(2400, (i) => {
      light.shadow.shadowMapSize = [256, 1024][i % 2]!;
      show();
    });
  }
  myApp.run();
});
