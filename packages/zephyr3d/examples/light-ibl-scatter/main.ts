// IBL driven by the atmospheric scattering sky: ambient light follows the sun
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, DirectionalLight, Mesh, PBRMetallicRoughnessMaterial, PlaneShape, Scene, SphereShape } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera } from '../../shared/light-world.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();

  // The scattering sky needs no assets, and with it the lighting is re-baked as the sun moves
  scene.env.sky.skyType = 'scatter';
  scene.env.light.type = 'ibl';

  const sun = new DirectionalLight(scene);
  sun.sunLight = true;
  let elevation = 35;
  let azimuth = 0.6;
  const aim = (): void => {
    const e = (elevation * Math.PI) / 180;
    // The light travels from the sun towards the origin
    sun.lookAt(new Vector3(Math.cos(azimuth) * Math.cos(e) * 50, Math.sin(e) * 50, Math.sin(azimuth) * Math.cos(e) * 50), Vector3.zero(), Vector3.axisPY());
  };
  aim();

  // A grid of spheres: roughness increases left to right, the top row is metal
  const shape = new SphereShape({ radius: 0.9 });
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 5; col++) {
      const m = new PBRMetallicRoughnessMaterial();
      m.metallic = row === 0 ? 1 : 0;
      m.roughness = 0.1 + col * 0.2;
      const sphere = new Mesh(scene, shape, m);
      sphere.position.setXYZ((col - 2) * 2.2, 1 + (1 - row) * 2.1, 0);
    }
  }
  const ground = new PBRMetallicRoughnessMaterial();
  ground.metallic = 0;
  ground.roughness = 0.8;
  new Mesh(scene, new PlaneShape({ size: 40 }), ground);

  orbitCamera(scene, new Vector3(0, 4, 13), 500, new Vector3(0, 2.2, 0));

  if (stage.bar) {
    slider(stage.bar, 'sun elevation (deg)', [2, 85, 1], elevation, (v) => {
      elevation = v;
      aim();
    });
    slider(stage.bar, 'sun azimuth', [0, 6.28, 0.05], azimuth, (v) => {
      azimuth = v;
      aim();
    });
    toggle(stage.bar, 'ibl ambient (off: none)', true, (v) => (scene.env.light.type = v ? 'ibl' : 'none'));
    slider(stage.bar, 'env.light.intensity', [0, 3, 0.1], scene.env.light.intensity, (v) => (scene.env.light.intensity = v));
  } else {
    stage.caption('skyType scatter + light.type ibl: the sun moves, the light follows');
    myApp.on('tick', (_dt, ms) => {
      elevation = 30 + 25 * Math.sin(ms * 0.0005);
      azimuth = 0.6 + ms * 0.0002;
      aim();
    });
  }
  myApp.run();
});
