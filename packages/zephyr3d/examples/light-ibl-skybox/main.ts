// IBL from a skybox: an HDR panorama converted to a cube map with panoramaToCubemap
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { Texture2D } from '@zephyr3d/device';
import { Application, getEngine, Mesh, panoramaToCubemap, PBRMetallicRoughnessMaterial, PlaneShape, Scene, SphereShape } from '@zephyr3d/scene';
import { button, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera } from '../../shared/light-world.ts';
import { memoryFiles } from '../../shared/vfs.ts';
import { sunsetHdr } from './sky-hdr.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  // The docs fetch Wide_Street.hdr from a CDN; the panorama here is encoded in code
  const VFS = await memoryFiles({ '/images/sunset.hdr': sunsetHdr(256, 128) });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();

  // Load the panorama, create a cube map and convert (equirectangular -> cube)
  const panorama = await getEngine().resourceManager.fetchTexture<Texture2D>('/images/sunset.hdr');
  const skyMap = myApp.device.createCubeTexture('rgba16f', 256)!;
  panoramaToCubemap(panorama, skyMap);
  scene.env.sky.skyType = 'skybox';
  scene.env.sky.skyboxTexture = skyMap;
  scene.env.light.type = 'ibl';

  const shape = new SphereShape({ radius: 1 });
  const spheres: Mesh[] = [];
  for (let col = 0; col < 5; col++) {
    const m = new PBRMetallicRoughnessMaterial();
    m.metallic = 1;
    m.roughness = 0.05 + col * 0.22;
    const sphere = new Mesh(scene, shape, m);
    sphere.position.setXYZ((col - 2) * 2.4, 1, 0);
    spheres.push(sphere);
  }
  const ground = new PBRMetallicRoughnessMaterial();
  ground.metallic = 0;
  ground.roughness = 0.9;
  new Mesh(scene, new PlaneShape({ size: 40 }), ground);

  const camera = orbitCamera(scene, new Vector3(0, 2.5, 9), 500, new Vector3(0, 1, 0));
  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) {
      const a = ms * 0.0004;
      camera.lookAt(new Vector3(Math.sin(a) * 9, 2.5, Math.cos(a) * 9), new Vector3(0, 1, 0), Vector3.axisPY());
    }
  });

  if (stage.bar) {
    slider(stage.bar, 'env.light.intensity', [0, 3, 0.1], scene.env.light.intensity, (v) => (scene.env.light.intensity = v));
    button(stage.bar, 'skyType scatter instead', () => (scene.env.sky.skyType = 'scatter'));
    button(stage.bar, 'skyType skybox', () => (scene.env.sky.skyType = 'skybox'));
    stage.caption('left to right: roughness 0.05 to 0.9, all metal');
  } else {
    stage.caption('HDR panorama -> panoramaToCubemap -> skyboxTexture + ibl');
  }
  myApp.run();
});
