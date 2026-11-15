// PointLight: position, colour, intensity, and the range that bounds its influence
import { Vector4 } from '@zephyr3d/base';
import { PointLight } from '@zephyr3d/scene';
import { color, slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lightDemo } from '../../shared/light-demo.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const { myApp, scene } = await lightDemo(stage);

  const light = new PointLight(scene);
  light.color = new Vector4(1, 1, 1, 1);
  // With range left at 0 the engine derives a falloff radius from the intensity
  light.intensity = 30;

  let moving = true;
  myApp.on('tick', (_dt, ms) => {
    if (moving) light.position.setXYZ(20 * Math.cos(ms * 0.001) - 10, 10, 20 * Math.sin(ms * 0.001) - 10);
  });

  if (stage.bar) {
    slider(stage.bar, 'intensity', [1, 150, 1], light.intensity, (v) => (light.intensity = v));
    // An explicit range bounds the light (and the pixels that have to compute it); 0 means automatic
    slider(stage.bar, 'range (0 = from intensity)', [0, 80, 1], 0, (v) => (light.range = v));
    color(stage.bar, 'color', '#ffffff', (r, g, b) => (light.color = new Vector4(r, g, b, 1)));
    toggle(stage.bar, 'move', true, (v) => (moving = v));
  } else {
    stage.caption('PointLight: intensity 30, range derived');
  }
  myApp.run();
});
