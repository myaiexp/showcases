// A PBR sphere with an albedo map and a linear normal map, fetched from an in-memory VFS
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { Texture2D } from '@zephyr3d/device';
import {
  Application,
  DirectionalLight,
  getEngine,
  getInput,
  Mesh,
  OrbitCameraController,
  PBRMetallicRoughnessMaterial,
  PerspectiveCamera,
  Scene,
  SphereShape,
} from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';
import { fbm, normalsFrom, planetAlbedo, png } from '../../shared/textures.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  // The docs fetch earthcolor.jpg and earthnormal.png from a CDN; here the same two maps
  // are drawn in code and served from a MemoryFS, so fetchTexture never touches the network.
  const VFS = await memoryFiles({
    '/images/planet-color.png': png(512, 256, planetAlbedo),
    '/images/planet-normal.png': png(512, 256, normalsFrom((u, v) => fbm(u, v * 0.5, 4, 11), 6)),
  });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();

  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(Vector3.one(), Vector3.zero(), Vector3.axisPY());

  const material = new PBRMetallicRoughnessMaterial();
  material.metallic = 0.9;
  material.roughness = 0.6;
  // A colour map holds sRGB colour; a normal map holds data, so it loads as linear.
  material.albedoTexture = await getEngine().resourceManager.fetchTexture<Texture2D>('/images/planet-color.png');
  material.normalTexture = await getEngine().resourceManager.fetchTexture<Texture2D>('/images/planet-normal.png', {
    linearColorSpace: true,
  });
  const planet = new Mesh(scene, new SphereShape(), material);

  scene.mainCamera = new PerspectiveCamera(scene, Math.PI / 3, 1, 100);
  scene.mainCamera.lookAt(new Vector3(0, 0, 4), Vector3.zero(), new Vector3(0, 1, 0));
  scene.mainCamera.controller = new OrbitCameraController();
  getInput().use(scene.mainCamera.handleEvent, scene.mainCamera);
  getEngine().setRenderable(scene, 0);

  myApp.on('tick', (_dt, elapsed) => {
    planet.rotation.fromAxisAngle(Vector3.axisPY(), elapsed * 0.0003);
  });
  stage.caption('metallic 0.9, roughness 0.6');
  myApp.run();
});
