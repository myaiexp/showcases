// Cascaded shadow maps: numShadowCascades and splitLambda split a long view into shadow maps
import { Vector3 } from '@zephyr3d/base';
import { DirectionalLight } from '@zephyr3d/scene';
import { select, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { avenue } from '../../shared/shadow-avenue.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const { myApp, scene, camera } = await avenue(stage);

  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(40, 60, 30), Vector3.zero(), Vector3.axisPY());
  light.castShadow = true;
  light.shadow.mode = 'pcf';
  light.shadow.shadowMapSize = 1024;
  // Up to 4 cascades: each depth slice of the view frustum gets its own shadow map, near ones
  // at higher resolution. 1 is a single map stretched over everything.
  light.shadow.numShadowCascades = 4;
  // 0 splits the depth range evenly, 1 logarithmically (more resolution up close)
  light.shadow.splitLambda = 0.5;

  const show = (): void => stage.caption(`numShadowCascades = ${light.shadow.numShadowCascades}, splitLambda ${light.shadow.splitLambda}`);
  show();
  if (stage.bar) {
    select(stage.bar, 'numShadowCascades', ['1', '2', '3', '4'] as const, '4', (v) => {
      light.shadow.numShadowCascades = Number(v);
      show();
    });
    slider(stage.bar, 'splitLambda', [0, 1, 0.05], light.shadow.splitLambda, (v) => {
      light.shadow.splitLambda = v;
      show();
    });
    select(stage.bar, 'shadowMapSize', ['512', '1024', '2048'] as const, '1024', (v) => (light.shadow.shadowMapSize = Number(v)));
  } else {
    stage.every(2400, (i) => {
      light.shadow.numShadowCascades = [4, 1][i % 2]!;
      show();
    });
    myApp.on('tick', (_dt, ms) => {
      const z = 34 - ((ms * 0.012) % 60);
      camera.lookAt(new Vector3(0, 7, z), new Vector3(0, 3, z - 70), Vector3.axisPY());
    });
  }
  myApp.run();
});
