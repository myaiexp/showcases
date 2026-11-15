// A custom compositor chain: ColorAdjust and Grayscale instances appended, removed and toggled by hand
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, ColorAdjust, Grayscale, Mesh, Scene, SphereShape } from '@zephyr3d/scene';
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
  const hues: [number, number, number][] = [[0.9, 0.2, 0.15], [0.95, 0.7, 0.1], [0.2, 0.75, 0.3], [0.15, 0.5, 0.9]];
  const balls = hues.map(([r, g, b], i) => {
    const m = new Mesh(scene, new SphereShape({ radius: 0.9 }), pbr(r, g, b, 0, 0.4));
    m.position.setXYZ(-3 + i * 2, 0.9, 0);
    return m;
  });

  const camera = orbitCamera(scene, new Vector3(0, 3, 8), new Vector3(0, 0.9, 0));
  camera.toneMap = true;

  // Post effects are plain objects: make them, append them to the camera's compositor, take them off again
  const adjust = new ColorAdjust();
  adjust.contrast = 1.4;
  adjust.sharpen = 0.5;
  const gray = new Grayscale();
  gray.enabled = false;
  camera.compositor.appendPostEffect(adjust);
  camera.compositor.appendPostEffect(gray);

  myApp.on('tick', (_dt, ms) => {
    balls.forEach((b, i) => b.position.setXYZ(-3 + i * 2, 0.9 + 0.3 * Math.sin(ms * 0.002 + i), 0));
  });
  if (stage.bar) {
    toggle(stage.bar, 'in the chain: ColorAdjust', true, (v) => {
      if (v) camera.compositor.appendPostEffect(adjust);
      else camera.compositor.removePostEffect(adjust);
    });
    slider(stage.bar, 'contrast', [0.3, 2, 0.05], 1.4, (v) => (adjust.contrast = v));
    slider(stage.bar, 'sharpen', [0, 2, 0.05], 0.5, (v) => (adjust.sharpen = v));
    toggle(stage.bar, 'Grayscale.enabled', false, (v) => (gray.enabled = v));
  } else {
    stage.caption('Grayscale.enabled switching on and off');
    stage.every(1500, (i) => (gray.enabled = i % 2 === 1));
  }
  myApp.run();
});
