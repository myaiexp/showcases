// SSAO: contact darkening in creases, with the occlusion radius, bias, intensity and blur cutoff
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, BoxShape, Mesh, Scene, SphereShape } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera, pbr, sunAndFloor } from '../../shared/post-scene.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  // Ambient-only light shows ambient occlusion best
  scene.env.light.type = 'constant';
  scene.env.light.strength = 1;
  sunAndFloor(scene, 0.8).intensity = 0.5;

  // Boxes and spheres packed close together: lots of creases and contact points
  const white = pbr(0.9, 0.9, 0.9, 0, 0.9);
  const box = new BoxShape({ size: 1.6 });
  const ball = new SphereShape({ radius: 0.8 });
  const spots: [number, number][] = [[-2.6, 0], [-0.9, 0.2], [0.8, 0], [2.5, 0.1], [-1.7, -1.6], [0, -1.7], [1.7, -1.5]];
  spots.forEach(([x, z], i) => {
    const m = new Mesh(scene, i % 2 ? ball : box, white);
    m.position.setXYZ(x, 0.8, z);
  });

  const camera = orbitCamera(scene, new Vector3(0, 5, 7), new Vector3(0, 0.6, -0.5));
  camera.toneMap = true;
  camera.SSAO = true;
  camera.SSAOOcclusionRadius = 0.6;
  camera.SSAOIntensity = 1.5;

  if (stage.bar) {
    toggle(stage.bar, 'SSAO', true, (v) => (camera.SSAO = v));
    slider(stage.bar, 'SSAOOcclusionRadius', [0.05, 2, 0.05], 0.6, (v) => (camera.SSAOOcclusionRadius = v));
    slider(stage.bar, 'SSAOBias', [0, 0.3, 0.01], camera.SSAOBias, (v) => (camera.SSAOBias = v));
    slider(stage.bar, 'SSAOIntensity', [0, 4, 0.1], 1.5, (v) => (camera.SSAOIntensity = v));
    slider(stage.bar, 'SSAOBlurDepthCutoff', [0.1, 8, 0.1], camera.SSAOBlurDepthCutoff, (v) => (camera.SSAOBlurDepthCutoff = v));
  } else {
    stage.caption('SSAO switching on and off');
    stage.every(1400, (i) => (camera.SSAO = i % 2 === 0));
  }
  myApp.run();
});
