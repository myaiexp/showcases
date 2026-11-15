// Bloom blur pyramid: downsample levels, resolution limit, tent filter radius and Karis average
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, DirectionalLight, Mesh, Scene, SphereShape, TorusShape } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera, pbr } from '../../shared/post-scene.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  // A dark scene, so the glow is what you see
  scene.env.sky.skyType = 'none';
  scene.env.light.type = 'constant';
  scene.env.light.strength = 0.1;
  new DirectionalLight(scene).lookAt(new Vector3(4, 6, 8), Vector3.zero(), Vector3.axisPY());

  // One emitter, plus a polished metal torus whose sharp highlights are the Karis average's customers
  const lamp = new Mesh(scene, new SphereShape({ radius: 0.7 }), pbr(1, 0.7, 0.4, 0, 0.5, 10));
  lamp.position.setXYZ(-2.2, 0, 0);
  const ring = new Mesh(scene, new TorusShape({ outerRadius: 1.2, innerRadius: 0.35 }), pbr(0.95, 0.95, 1, 1, 0.12));
  ring.position.setXYZ(2.2, 0, 0);

  const camera = orbitCamera(scene, new Vector3(0, 1.5, 8), Vector3.zero());
  camera.toneMap = true;
  camera.bloom = true;
  camera.bloomThreshold = 0.8;
  camera.bloomIntensity = 0.5;

  if (stage.bar) {
    slider(stage.bar, 'bloomMaxDownsampleLevels', [1, 8, 1], camera.bloomMaxDownsampleLevels, (v) => (camera.bloomMaxDownsampleLevels = v));
    slider(stage.bar, 'bloomDownsampleLimit', [2, 128, 2], camera.bloomDownsampleLimit, (v) => (camera.bloomDownsampleLimit = v));
    slider(stage.bar, 'bloomFilterRadius', [0, 3, 0.1], camera.bloomFilterRadius, (v) => (camera.bloomFilterRadius = v));
    toggle(stage.bar, 'bloomKarisAverage', camera.bloomKarisAverage, (v) => (camera.bloomKarisAverage = v));
  } else {
    stage.caption('bloomMaxDownsampleLevels 1 to 7');
    myApp.on('tick', (_dt, ms) => {
      camera.bloomMaxDownsampleLevels = 1 + Math.floor((ms / 700) % 7);
    });
  }
  myApp.on('tick', (_dt, ms) => {
    ring.rotation.fromEulerAngle(ms * 0.0006, ms * 0.0009, 0);
  });
  myApp.run();
});
