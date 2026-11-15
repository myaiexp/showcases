// Clustered lighting: dozens of coloured point lights, each with a small range
import { Vector3, Vector4 } from '@zephyr3d/base';
import { PointLight } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lightDemo } from '../../shared/light-demo.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const { myApp, scene } = await lightDemo(stage, { boxes: 12, boxColor: [0.9, 0.9, 0.9], floorColor: [0.8, 0.8, 0.8], eye: new Vector3(34, 32, 34) });

  // Up to 255 lights can sit in the view frustum; each pixel is lit by at most 16 of them.
  // A small range keeps each one to the pixels near it.
  const lights: PointLight[] = [];
  const make = (n: number): void => {
    while (lights.length < n) {
      const i = lights.length;
      const light = new PointLight(scene);
      const h = i / 12;
      light.color = new Vector4(0.5 + 0.5 * Math.cos(6.283 * h), 0.5 + 0.5 * Math.cos(6.283 * (h + 1 / 3)), 0.5 + 0.5 * Math.cos(6.283 * (h + 2 / 3)), 1);
      light.intensity = 25;
      light.range = 11;
      lights.push(light);
    }
    while (lights.length > n) lights.pop()!.dispose();
  };
  make(stage.preview ? 40 : 120);

  myApp.on('tick', (_dt, ms) => {
    lights.forEach((light, i) => {
      // A drifting grid of lights hovering at two heights
      const gx = (i % 12) - 5.5;
      const gz = Math.floor(i / 12) - 4.5;
      const t = ms * 0.0006 + i * 0.7;
      light.position.setXYZ(gx * 7 + Math.cos(t) * 2.5, 2.5 + (i % 2) * 3, gz * 7 + Math.sin(t) * 2.5);
    });
  });

  if (stage.bar) {
    slider(stage.bar, 'lights in the scene (max 255)', [1, 255, 1], lights.length, (v) => make(v));
    slider(stage.bar, 'range', [3, 25, 1], 11, (v) => lights.forEach((l) => (l.range = v)));
  } else {
    stage.caption('clustered lighting: 40 point lights');
  }
  myApp.run();
});
