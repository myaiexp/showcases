// FXAA on thin high-contrast edges: bright bars in a fan, filtered or not
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, BoxShape, Mesh, Scene, UnlitMaterial } from '@zephyr3d/scene';
import { toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera } from '../../shared/post-scene.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  // Pixel ratio 1 on purpose: a high-density screen hides the stair-steps FXAA exists to smooth
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: 1 });
  await myApp.ready();
  const scene = new Scene();
  scene.env.sky.skyType = 'none';

  const white = new UnlitMaterial();
  const bar = new BoxShape({ sizeX: 7, sizeY: 0.06, sizeZ: 0.06 });
  const bars: Mesh[] = [];
  for (let i = 0; i < 7; i++) {
    const m = new Mesh(scene, bar, white);
    m.rotation.fromEulerAngle(0, 0, (i / 7) * Math.PI);
    bars.push(m);
  }

  const camera = orbitCamera(scene, new Vector3(0, 0, 9), Vector3.zero(), false);
  camera.FXAA = true;

  myApp.on('tick', (_dt, ms) => {
    bars.forEach((m, i) => m.rotation.fromEulerAngle(0, ms * 0.0004, (i / 7) * Math.PI + ms * 0.0002));
  });
  if (stage.bar) {
    toggle(stage.bar, 'FXAA', true, (v) => (camera.FXAA = v));
  } else {
    stage.caption('camera.FXAA switching on and off');
    stage.every(1500, (i) => (camera.FXAA = i % 2 === 0));
  }
  myApp.run();
});
