// PCSS soft shadows: pcssLightRadius, sample counts, max filter radius and temporal jitter
import { DirectionalLight } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lightDemo } from '../../shared/light-demo.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const { myApp, scene, camera } = await lightDemo(stage);

  const light = new DirectionalLight(scene);
  light.rotation.fromEulerAngle(-Math.PI / 4, Math.PI / 4, 0);
  light.castShadow = true;
  // A blocker search sizes the penumbra: contact shadows stay sharp, distant ones soften
  light.shadow.mode = 'pcss';
  light.shadow.shadowMapSize = 1024;
  light.shadow.pcssLightRadius = 8; // apparent light radius, in shadow-map texels
  light.shadow.pcssBlockerSampleCount = 24;
  light.shadow.pcssFilterSampleCount = 32;
  light.shadow.pcssMaxFilterRadius = 32;
  light.shadow.pcssTemporalJitter = true;
  // The jitter rotates the sampling pattern each frame for TAA to resolve
  camera.TAA = true;

  let turning = true;
  myApp.on('tick', (_dt, ms) => {
    if (turning) light.rotation.fromEulerAngle(-Math.PI / 4, ms * 0.0003, 0);
  });

  if (stage.bar) {
    const s = light.shadow;
    slider(stage.bar, 'pcssLightRadius', [0, 40, 1], s.pcssLightRadius, (v) => (s.pcssLightRadius = v));
    slider(stage.bar, 'blocker samples', [1, 64, 1], s.pcssBlockerSampleCount, (v) => (s.pcssBlockerSampleCount = v));
    slider(stage.bar, 'filter samples', [1, 64, 1], s.pcssFilterSampleCount, (v) => (s.pcssFilterSampleCount = v));
    slider(stage.bar, 'pcssMaxFilterRadius', [1, 64, 1], s.pcssMaxFilterRadius, (v) => (s.pcssMaxFilterRadius = v));
    toggle(stage.bar, 'pcssTemporalJitter', true, (v) => (s.pcssTemporalJitter = v));
    toggle(stage.bar, 'camera.TAA', true, (v) => (camera.TAA = v));
    toggle(stage.bar, 'pcss (off: hard)', true, (v) => (s.mode = v ? 'pcss' : 'hard'));
    toggle(stage.bar, 'rotate light', true, (v) => (turning = v));
  } else {
    stage.caption("shadow.mode = 'pcss'");
    stage.every(2500, (i) => (light.shadow.pcssLightRadius = i % 2 ? 2 : 20));
  }
  myApp.run();
});
