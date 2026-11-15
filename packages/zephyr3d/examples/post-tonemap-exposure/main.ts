// ACES tone mapping on an HDR camera: toneMap on or off, and the toneMapExposure level
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
  const sun = sunAndFloor(scene);
  // A strong sun, so the lit side of every sphere lands above 1.0 in the HDR buffer
  sun.intensity = 6;

  // Spheres from dark to bright albedo
  const ball = new SphereShape({ radius: 0.9 });
  for (let i = 0; i < 5; i++) {
    const v = 0.1 + i * 0.22;
    new Mesh(scene, ball, pbr(v, v * 0.9, v * 0.8, 0, 0.5)).position.setXYZ(-4 + i * 2, 0.9, 0);
  }

  const camera = orbitCamera(scene, new Vector3(0, 3, 9), new Vector3(0, 0.8, 0));
  // Tone mapping works on the HDR buffer, so HDR must be on
  camera.toneMap = true;
  camera.toneMapExposure = 1;

  if (stage.bar) {
    toggle(stage.bar, 'toneMap', true, (v) => (camera.toneMap = v));
    slider(stage.bar, 'toneMapExposure', [0.1, 3, 0.05], 1, (v) => (camera.toneMapExposure = v));
  } else {
    stage.caption('toneMapExposure sweeping 0.3 to 2');
    myApp.on('tick', (_dt, ms) => {
      camera.toneMapExposure = 1.15 + 0.85 * Math.sin(ms * 0.0012);
    });
  }
  myApp.run();
});
