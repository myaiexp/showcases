// A custom VFS mounted into a MemoryFS: textures under /assets/@paint are painted on demand
import { MemoryFS, Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { Texture2D } from '@zephyr3d/device';
import {
  Application,
  BoxShape,
  DirectionalLight,
  getEngine,
  getInput,
  Mesh,
  OrbitCameraController,
  PBRMetallicRoughnessMaterial,
  PerspectiveCamera,
  Scene,
} from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';
import { PaintFS } from './paint-fs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  // Root file system in memory, with the painting VFS mounted under one path
  const rootFS = new MemoryFS();
  const paintFS = new PaintFS();
  await rootFS.mount('/assets/@paint', paintFS);
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS: rootFS } });
  await myApp.ready();
  const resources = getEngine().resourceManager;

  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 2, 2), Vector3.zero(), Vector3.axisPY());
  const box = new BoxShape({ size: 1.2 });
  const cubes: Mesh[] = [];
  // Paths below the mount point resolve to PaintFS; the rest of the tree is the MemoryFS
  const files = ['checker-4.png', 'checker-12.png', 'stripes-6.png', 'stripes-16.png'];
  for (const [i, f] of files.entries()) {
    const m = new PBRMetallicRoughnessMaterial();
    m.roughness = 0.5;
    m.albedoTexture = await resources.fetchTexture<Texture2D>(`/assets/@paint/${f}`);
    // Data maps load linear; this one is a normal map painted from a brick height field
    m.normalTexture = await resources.fetchTexture<Texture2D>('/assets/@paint/bricks-8.png', { linearColorSpace: true });
    const c = new Mesh(scene, box, m);
    c.position.setXYZ((i - 1.5) * 1.6, 0, 0);
    cubes.push(c);
  }

  const camera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 100);
  scene.mainCamera = camera;
  camera.lookAt(new Vector3(0, 2, 5.5), Vector3.zero(), Vector3.axisPY());
  camera.controller = new OrbitCameraController();
  getInput().use(camera.handleEvent, camera);
  getEngine().setRenderable(scene, 0);

  // fetchTexture caches by path: bricks-8.png was fetched four times but read once
  const out = stage.readout();
  if (out) out.textContent = `PaintFS reads (${paintFS.reads.length}):\n${paintFS.reads.join('\n')}`;
  stage.caption(`mount('/assets/@paint', new PaintFS()): ${paintFS.reads.length} reads`);
  myApp.on('tick', (_dt, elapsed) => {
    cubes.forEach((c, i) => c.rotation.fromEulerAngle(0.5, elapsed * 0.0005 + i, 0));
  });
  myApp.run();
});
