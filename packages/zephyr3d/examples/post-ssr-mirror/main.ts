// Screen-space reflections on a polished floor, with HiZ acceleration and the roughness cutoff
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera } from '../../shared/post-scene.ts';
import { reflectionScene } from '../../shared/post-ssr-scene.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  const { balls } = reflectionScene(scene);

  const camera = orbitCamera(scene, new Vector3(0, 2.6, 9), new Vector3(0, 0.8, -1));
  camera.toneMap = true;
  camera.SSR = true;
  camera.HiZ = true;
  camera.ssrMaxRoughness = 0.8;

  myApp.on('tick', (_dt, ms) => {
    balls.forEach((b, i) => b.position.setXYZ(-4 + i * 2, 0.8 + 0.5 * (0.5 + 0.5 * Math.sin(ms * 0.002 + i)), 0));
  });
  if (stage.bar) {
    toggle(stage.bar, 'SSR', true, (v) => (camera.SSR = v));
    toggle(stage.bar, 'HiZ', true, (v) => (camera.HiZ = v));
    slider(stage.bar, 'ssrMaxRoughness', [0, 1, 0.05], 0.8, (v) => (camera.ssrMaxRoughness = v));
  } else {
    stage.caption('camera.SSR switching on and off');
    stage.every(1600, (i) => (camera.SSR = i % 2 === 0));
  }
  myApp.run();
});
