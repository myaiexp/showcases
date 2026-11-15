// Parent and child nodes: sphere3 inherits the rotations of sphere2 and sphere1
import { Quaternion, Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { Texture2D } from '@zephyr3d/device';
import { Application, BlinnMaterial, DirectionalLight, getEngine, Mesh, Scene, SphereShape } from '@zephyr3d/scene';
import { button, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera } from '../../shared/light-world.ts';
import { fbm, normalsFrom, planetAlbedo, png } from '../../shared/textures.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({
    '/images/planet-color.png': png(256, 128, planetAlbedo),
    '/images/planet-normal.png': png(256, 128, normalsFrom((u, v) => fbm(u, v * 0.5, 4, 11), 6)),
  });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();

  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(Vector3.one(), Vector3.zero(), Vector3.axisPY());

  const material = new BlinnMaterial();
  material.shininess = 256;
  material.albedoTexture = await getEngine().resourceManager.fetchTexture<Texture2D>('/images/planet-color.png');
  material.normalTexture = await getEngine().resourceManager.fetchTexture<Texture2D>('/images/planet-normal.png', { linearColorSpace: true });

  // All three meshes share one primitive and one material, so the engine can draw them as instances.
  const spherePrimitive = new SphereShape();
  const sphere1 = new Mesh(scene, spherePrimitive, material);
  const sphere2 = new Mesh(scene, spherePrimitive, material);
  sphere2.parent = sphere1;
  sphere2.position.x = 8;
  const sphere3 = new Mesh(scene, spherePrimitive, material);
  sphere3.parent = sphere2;
  sphere3.position.y = 4;

  orbitCamera(scene, new Vector3(0, 0, 22), 100);

  let x = 0;
  let rotate = true;
  myApp.on('tick', () => {
    if (rotate) {
      // Only sphere1 and sphere2 are rotated; sphere3 follows through its parents.
      sphere1.rotation = Quaternion.fromAxisAngle(new Vector3(0, 0, 1), x);
      sphere2.rotation = Quaternion.fromAxisAngle(new Vector3(1, 0, 0), x * 8);
      x += 0.01;
    }
  });

  if (stage.bar) {
    toggle(stage.bar, 'rotate', true, (v) => (rotate = v));
    button(stage.bar, 'sphere3 under sphere2', () => (sphere3.parent = sphere2));
    // A node with the scene root as parent keeps its local values but no longer inherits the chain.
    button(stage.bar, 'sphere3 under root', () => (sphere3.parent = scene.rootNode));
  } else {
    stage.caption('sphere1 > sphere2 > sphere3: parents accumulate onto children');
  }
  myApp.run();
});
