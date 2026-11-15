// Ambient light types: hemisphere (sky and ground colours), ibl and none
import { Vector3, Vector4 } from '@zephyr3d/base';
import { DirectionalLight, type EnvLightType } from '@zephyr3d/scene';
import { color, select, slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lightDemo } from '../../shared/light-demo.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const { myApp, scene } = await lightDemo(stage, { ambient: true, boxColor: [0.95, 0.9, 0.8], floorColor: [0.75, 0.75, 0.75], eye: new Vector3(30, 22, 30) });

  // One ambient source per scene. Hemisphere interpolates between a sky colour above and a
  // ground colour below by each surface's normal.
  scene.env.light.type = 'hemisphere';
  scene.env.light.ambientUp = new Vector4(0.3, 0.6, 1.0, 1.0);
  scene.env.light.ambientDown = new Vector4(0.2, 0.2, 0.2, 1.0);

  const sun = new DirectionalLight(scene);
  sun.rotation.fromEulerAngle(-Math.PI / 4, Math.PI / 4, 0);
  sun.intensity = 0.8;
  sun.showState = 'hidden';

  const describe = (): void => stage.caption(`env.light.type = '${scene.env.light.type}'`);
  describe();
  if (stage.bar) {
    select(stage.bar, 'env.light.type', ['hemisphere', 'ibl', 'none'] as EnvLightType[], 'hemisphere', (v) => {
      scene.env.light.type = v;
      describe();
    });
    color(stage.bar, 'ambientUp', '#4d99ff', (r, g, b) => (scene.env.light.ambientUp = new Vector4(r, g, b, 1)));
    color(stage.bar, 'ambientDown', '#333333', (r, g, b) => (scene.env.light.ambientDown = new Vector4(r, g, b, 1)));
    toggle(stage.bar, 'add a directional light', false, (v) => (sun.showState = v ? 'visible' : 'hidden'));
  } else {
    // Cards: sweep the sky colour through the hues, then cycle the ambient type
    myApp.on('tick', (_dt, ms) => {
      if (scene.env.light.type !== 'hemisphere') return;
      const h = ms * 0.0003;
      scene.env.light.ambientUp = new Vector4(0.5 + 0.5 * Math.cos(h), 0.5 + 0.5 * Math.cos(h + 2.1), 0.5 + 0.5 * Math.cos(h + 4.2), 1);
    });
    const types: EnvLightType[] = ['hemisphere', 'hemisphere', 'none', 'ibl'];
    stage.every(2400, (i) => {
      scene.env.light.type = types[i % types.length]!;
      describe();
    });
  }
  myApp.run();
});
