// DirectionalLight: direction from the node's rotation, plus colour, intensity and environment light
import { Vector4 } from '@zephyr3d/base';
import { DirectionalLight } from '@zephyr3d/scene';
import { color, slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lightDemo } from '../../shared/light-demo.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const { myApp, scene } = await lightDemo(stage);
  // Scenes have environment lighting by default; it is off here so one light stands out
  scene.env.light.type = 'none';

  const light = new DirectionalLight(scene);
  // The light points along its node's -Z axis: rotate the node to aim it
  light.rotation.fromEulerAngle(-Math.PI / 4, Math.PI / 4, 0);
  light.color = new Vector4(1, 1, 1, 1);

  let turning = true;
  let pitch = -Math.PI / 4;
  myApp.on('tick', (_dt, ms) => {
    if (turning) light.rotation.fromEulerAngle(pitch, ms * 0.0005, 0);
  });

  if (stage.bar) {
    slider(stage.bar, 'pitch (deg)', [-89, -5, 1], -45, (v) => (pitch = (v * Math.PI) / 180));
    slider(stage.bar, 'intensity', [0, 10, 0.1], light.intensity, (v) => (light.intensity = v));
    color(stage.bar, 'color', '#ffffff', (r, g, b) => (light.color = new Vector4(r, g, b, 1)));
    toggle(stage.bar, 'rotate', true, (v) => (turning = v));
    toggle(stage.bar, 'environment light (ibl)', false, (v) => (scene.env.light.type = v ? 'ibl' : 'none'));
  } else {
    stage.caption('DirectionalLight: rotation sets the direction');
  }
  myApp.run();
});
