// Bloom threshold: a row of spheres whose emissiveStrength doubles, halos appear as it drops
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Mesh, Scene, SphereShape } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera, pbr } from '../../shared/post-scene.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  // A dark scene, so the glow is what you see
  scene.env.sky.skyType = 'none';
  scene.env.light.type = 'constant';
  scene.env.light.strength = 0.2;

  // Identical spheres, apart from emissiveStrength: 0.5, 1, 2, 4, 8, 16
  const ball = new SphereShape({ radius: 0.8 });
  for (let i = 0; i < 6; i++) {
    const m = pbr(1, 0.92, 0.78, 0, 0.5);
    m.emissiveColor = new Vector3(1, 0.92, 0.78);
    m.emissiveStrength = 0.5 * 2 ** i;
    new Mesh(scene, ball, m).position.setXYZ(-4.5 + i * 1.8, 0, 0);
  }

  const camera = orbitCamera(scene, new Vector3(0, 1, 9), Vector3.zero());
  camera.toneMap = true;
  camera.bloom = true;
  camera.bloomThreshold = 0.8;
  camera.bloomIntensity = 0.35;

  if (stage.bar) {
    slider(stage.bar, 'bloomThreshold', [0, 20, 0.1], 0.8, (v) => (camera.bloomThreshold = v));
    slider(stage.bar, 'bloomIntensity', [0, 1.5, 0.05], 0.35, (v) => (camera.bloomIntensity = v));
  } else {
    stage.caption('bloomThreshold sweeping 0 to 14');
    myApp.on('tick', (_dt, ms) => {
      camera.bloomThreshold = 7 + 7 * Math.sin(ms * 0.0008);
    });
  }
  myApp.run();
});
