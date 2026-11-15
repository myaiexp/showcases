// A node's position, rotation and scale: a textured sphere bobbing and turning
import { Quaternion, Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { Texture2D } from '@zephyr3d/device';
import { Application, BlinnMaterial, DirectionalLight, getEngine, Mesh, Scene, SphereShape } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera } from '../../shared/light-world.ts';
import { fbm, normalsFrom, planetAlbedo, png } from '../../shared/textures.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  // The docs load earthcolor.jpg and earthnormal.png; here they are drawn in code.
  const VFS = await memoryFiles({
    '/images/planet-color.png': png(512, 256, planetAlbedo),
    '/images/planet-normal.png': png(512, 256, normalsFrom((u, v) => fbm(u, v * 0.5, 4, 11), 6)),
  });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();

  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(Vector3.one(), Vector3.zero(), Vector3.axisPY());

  const material = new BlinnMaterial();
  material.shininess = 256;
  const resources = getEngine().resourceManager;
  material.albedoTexture = await resources.fetchTexture<Texture2D>('/images/planet-color.png');
  material.normalTexture = await resources.fetchTexture<Texture2D>('/images/planet-normal.png', { linearColorSpace: true });
  const sphere = new Mesh(scene, new SphereShape(), material);

  orbitCamera(scene, new Vector3(0, 0, 6), 100);

  let x = 0;
  let animate = true;
  let scale = 1;
  myApp.on('tick', () => {
    if (!animate) return;
    // rotation is a Quaternion; position is a Vector3 and one component can be set alone
    sphere.rotation = Quaternion.fromAxisAngle(new Vector3(0, 1, 0), x);
    sphere.position.y = Math.sin(x);
    x += 0.04;
  });

  if (stage.bar) {
    toggle(stage.bar, 'animate rotation + position', true, (v) => (animate = v));
    slider(stage.bar, 'scale', [0.4, 1.6, 0.05], 1, (v) => {
      scale = v;
      sphere.scale.setXYZ(scale, scale, scale);
    });
  } else {
    stage.caption('rotation: Quaternion.fromAxisAngle, position.y = sin(x)');
  }
  myApp.run();
});
