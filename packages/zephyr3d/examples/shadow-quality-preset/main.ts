// applyQualityPreset: 'character-small' and 'outdoor-large' set a whole group of shadow parameters
import { Vector3 } from '@zephyr3d/base';
import { DirectionalLight, type ShadowQualityPreset } from '@zephyr3d/scene';
import { button } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lightDemo } from '../../shared/light-demo.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const { myApp, scene } = await lightDemo(stage, { eye: new Vector3(30, 24, 30) });

  const light = new DirectionalLight(scene);
  light.rotation.fromEulerAngle(-Math.PI / 4, Math.PI / 4, 0);
  light.castShadow = true;

  const out = stage.readout();
  const apply = (preset: ShadowQualityPreset): void => {
    light.shadow.applyQualityPreset(preset);
    const s = light.shadow;
    const text = `preset '${preset}'\nmode ${s.mode}, shadowMapSize ${s.shadowMapSize}, shadowDistance ${s.shadowDistance}, cascades ${s.numShadowCascades}, splitLambda ${s.splitLambda}\ndepthBias ${s.depthBias}, normalBias ${s.normalBias}, pcfKernelSize ${s.pcfKernelSize}`;
    if (out) out.textContent = text;
    stage.caption(`applyQualityPreset('${preset}')`);
  };
  apply('character-small');

  myApp.on('tick', (_dt, ms) => {
    light.rotation.fromEulerAngle(-Math.PI / 4, ms * 0.0003, 0);
  });
  if (stage.bar) {
    button(stage.bar, "applyQualityPreset('character-small')", () => apply('character-small'));
    button(stage.bar, "applyQualityPreset('outdoor-large')", () => apply('outdoor-large'));
  } else {
    stage.every(2500, (i) => apply(i % 2 ? 'outdoor-large' : 'character-small'));
  }
  myApp.run();
});
