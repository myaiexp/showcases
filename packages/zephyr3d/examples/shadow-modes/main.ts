// Every filtering mode on one scene: hard, pcf, pcss, vsm and esm
import { Vector3 } from '@zephyr3d/base';
import { DirectionalLight, type ShadowMode } from '@zephyr3d/scene';
import { select, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lightDemo } from '../../shared/light-demo.ts';

const MODES: ShadowMode[] = ['hard', 'pcf', 'pcss', 'vsm', 'esm'];
const NOTES: Record<string, string> = {
  hard: 'one sample, no filtering: cheapest, aliased edges',
  pcf: 'averages neighbouring texels: easy, slightly blurry',
  pcss: 'blocker search + variable filter: contact-hard, distance-soft',
  vsm: 'variance statistics + blur: smooth, may light-bleed',
  esm: 'exponential falloff + blur: very soft, needs tuning',
};

export default zephyrExample(import.meta.url, async (stage) => {
  const { myApp, scene, camera } = await lightDemo(stage, { eye: new Vector3(26, 20, 26) });

  const light = new DirectionalLight(scene);
  light.rotation.fromEulerAngle(-Math.PI / 4, Math.PI / 4, 0);
  light.castShadow = true;
  light.shadow.shadowMapSize = 512;
  light.shadow.mode = 'hard';

  let turning = true;
  const show = (): void => stage.caption(`'${light.shadow.mode}': ${NOTES[light.shadow.mode] ?? ''}`);
  show();
  myApp.on('tick', (_dt, ms) => {
    if (turning) light.rotation.fromEulerAngle(-Math.PI / 4, ms * 0.0003, 0);
  });
  if (stage.bar) {
    select(stage.bar, 'shadow.mode', MODES, 'hard', (v) => {
      light.shadow.mode = v;
      camera.TAA = v === 'pcss';
      show();
    });
    toggle(stage.bar, 'rotate light', true, (v) => (turning = v));
    stage.readout()!.textContent = "'dom' (deep opacity map, for hair) is WebGPU only and falls back to pcf elsewhere; 'pcf-pd' and 'pcf-opt' are deprecated.";
  } else {
    stage.every(2000, (i) => {
      light.shadow.mode = MODES[i % MODES.length]!;
      camera.TAA = light.shadow.mode === 'pcss';
      show();
    });
  }
  myApp.run();
});
