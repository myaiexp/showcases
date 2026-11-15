// SSR ray-march controls: stride, iterations, max distance, thickness and calculated thickness
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
  // With HiZ on, ssrStride and ssrMaxDistance are ignored, so this example marches the ray itself
  camera.HiZ = false;
  camera.ssrStride = 4;
  camera.ssrIterations = 60;

  myApp.on('tick', (_dt, ms) => {
    balls.forEach((b, i) => b.position.setXYZ(-4 + i * 2, 0.8 + 0.4 * (0.5 + 0.5 * Math.sin(ms * 0.002 + i)), 0));
  });
  if (stage.bar) {
    toggle(stage.bar, 'HiZ', false, (v) => (camera.HiZ = v));
    slider(stage.bar, 'ssrStride', [1, 16, 1], 4, (v) => (camera.ssrStride = v));
    slider(stage.bar, 'ssrIterations', [10, 200, 5], 60, (v) => (camera.ssrIterations = v));
    slider(stage.bar, 'ssrMaxDistance', [5, 200, 5], camera.ssrMaxDistance, (v) => (camera.ssrMaxDistance = v));
    slider(stage.bar, 'ssrThickness', [0.05, 2, 0.05], camera.ssrThickness, (v) => (camera.ssrThickness = v));
    toggle(stage.bar, 'ssrCalcThickness', false, (v) => (camera.ssrCalcThickness = v));
    stage.readout()!.textContent = 'stride x iterations is how far a ray can march. Stride, max distance and calculated thickness do nothing while HiZ is on.';
  } else {
    stage.caption('ssrIterations 20 to 120, stride 4');
    myApp.on('tick', (_dt, ms) => {
      camera.ssrIterations = 70 + 50 * Math.sin(ms * 0.0012);
    });
  }
  myApp.run();
});
