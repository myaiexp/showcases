// Bloom threshold knee: a row of spheres brightening in small steps across the threshold
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

  // Twelve spheres creeping from just under the threshold (1) to well above it
  const ball = new SphereShape({ radius: 0.45 });
  const mats = [];
  for (let i = 0; i < 12; i++) {
    const m = pbr(0.9, 0.8, 1, 0, 0.5);
    m.emissiveColor = new Vector3(0.9, 0.8, 1);
    m.emissiveStrength = 0.6 + i * 0.12;
    mats.push(m);
    new Mesh(scene, ball, m).position.setXYZ(-5.5 + i, 0, 0);
  }

  const camera = orbitCamera(scene, new Vector3(0, 0.6, 8), Vector3.zero());
  camera.toneMap = true;
  camera.bloom = true;
  camera.bloomThreshold = 1;
  camera.bloomThresholdKnee = 0;
  camera.bloomIntensity = 0.5;

  if (stage.bar) {
    slider(stage.bar, 'bloomThresholdKnee', [0, 1, 0.05], 0, (v) => (camera.bloomThresholdKnee = v));
    slider(stage.bar, 'bloomThreshold', [0.5, 2, 0.05], 1, (v) => (camera.bloomThreshold = v));
    slider(stage.bar, 'bloomIntensity', [0, 1.5, 0.05], 0.5, (v) => (camera.bloomIntensity = v));
    stage.readout()!.textContent = 'Knee 0 pops a halo on as a sphere crosses the threshold; 0.5 fades it in.';
  } else {
    stage.caption('bloomThresholdKnee 0, then 0.6');
    myApp.on('tick', (_dt, ms) => {
      camera.bloomThresholdKnee = Math.floor(ms / 2500) % 2 === 0 ? 0 : 0.6;
    });
  }
  myApp.run();
});
