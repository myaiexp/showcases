// The camera's colour adjustment: saturation, contrast, hue rotation and sharpen
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Mesh, Scene, SphereShape } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera, pbr, sunAndFloor } from '../../shared/post-scene.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  scene.env.light.type = 'constant';
  scene.env.light.strength = 0.5;
  sunAndFloor(scene).intensity = 3;
  const hues: [number, number, number][] = [[0.9, 0.2, 0.15], [0.95, 0.7, 0.1], [0.2, 0.75, 0.3], [0.15, 0.5, 0.9], [0.65, 0.25, 0.85]];
  hues.forEach(([r, g, b], i) => new Mesh(scene, new SphereShape({ radius: 0.9 }), pbr(r, g, b, 0, 0.4)).position.setXYZ(-4 + i * 2, 0.9, 0));

  const camera = orbitCamera(scene, new Vector3(0, 3, 8), new Vector3(0, 0.9, 0));
  camera.toneMap = true;
  camera.colorAdjust = true;
  camera.colorAdjustSaturation = 1.2;

  if (stage.bar) {
    toggle(stage.bar, 'colorAdjust', true, (v) => (camera.colorAdjust = v));
    slider(stage.bar, 'colorAdjustSaturation', [0, 2.5, 0.05], 1.2, (v) => (camera.colorAdjustSaturation = v));
    slider(stage.bar, 'colorAdjustContrast', [0.3, 2, 0.05], 1, (v) => (camera.colorAdjustContrast = v));
    slider(stage.bar, 'colorAdjustHue', [-180, 180, 1], 0, (v) => (camera.colorAdjustHue = v));
    slider(stage.bar, 'colorAdjustSharpen', [0, 2, 0.05], 0, (v) => (camera.colorAdjustSharpen = v));
  } else {
    stage.caption('colorAdjustHue turning through 360 degrees');
    myApp.on('tick', (_dt, ms) => {
      camera.colorAdjustHue = ((ms * 0.05) % 360) - 180;
    });
  }
  myApp.run();
});
