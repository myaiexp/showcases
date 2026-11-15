// Sprite pivot and spin: anchorX/anchorY, material.rotation and scale of a camera-facing sprite
import { Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { Texture2D } from '@zephyr3d/device';
import { Application, BoxShape, getEngine, Mesh, Scene, Sprite, StandardSpriteMaterial, UnlitMaterial } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { marker } from '../../shared/basic-sprites.ts';
import { orbitCamera } from '../../shared/light-world.ts';
import { png } from '../../shared/textures.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/textures/marker.png': png(256, 256, marker) });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();

  const scene = new Scene();
  scene.env.light.type = 'none';
  const texture = await getEngine().resourceManager.fetchTexture<Texture2D>('/textures/marker.png');

  const material = new StandardSpriteMaterial();
  material.spriteTexture = texture;
  material.setUVInfo(0, 0, 1, 1);
  // The pivot inside the quad: (0.5, 0.5) is the middle; the point it sits on is the node's position
  material.anchorX = 0.5;
  material.anchorY = 0.5;
  material.blendMode = 'blend';

  const sprite = new Sprite(scene, material);
  sprite.position.setXYZ(0, 1, 0);
  sprite.scale.setXYZ(2, 2, 2);

  // A small cube shows where the node is, so the anchor's effect is visible
  const dot = new UnlitMaterial();
  dot.albedoColor = new Vector4(1, 0.3, 0.3, 1);
  const pin = new Mesh(scene, new BoxShape({ size: 0.12 }), dot);
  pin.position.setXYZ(0, 1, 0);

  const camera = orbitCamera(scene, new Vector3(0, 1, 6), 100, new Vector3(0, 1, 0));
  let spin = true;
  let angle = 0;
  let anchorSweep = 0;
  myApp.on('tick', (dt, ms) => {
    if (spin) angle += dt * 0.001;
    material.rotation = angle; // in-plane billboard rotation
    if (stage.preview) {
      anchorSweep = ms * 0.0009;
      material.anchorX = 0.5 + 0.5 * Math.sin(anchorSweep);
      material.anchorY = 0.5 + 0.5 * Math.cos(anchorSweep * 0.7);
      const a = ms * 0.0004;
      camera.lookAt(new Vector3(Math.sin(a) * 6, 1.5, Math.cos(a) * 6), new Vector3(0, 1, 0), Vector3.axisPY());
    }
  });

  if (stage.bar) {
    slider(stage.bar, 'anchorX', [0, 1, 0.05], 0.5, (v) => (material.anchorX = v));
    slider(stage.bar, 'anchorY', [0, 1, 0.05], 0.5, (v) => (material.anchorY = v));
    slider(stage.bar, 'rotation (rad, stops the spin)', [-3.14, 3.14, 0.05], 0, (v) => {
      spin = false;
      angle = v;
    });
    slider(stage.bar, 'scale', [0.5, 4, 0.1], 2, (v) => sprite.scale.setXYZ(v, v, v));
    stage.caption('red cube = node position; the sprite pivots on its anchor');
  } else {
    stage.caption('anchorX / anchorY and rotation');
  }
  myApp.run();
});
