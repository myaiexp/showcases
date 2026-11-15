// Sprites from an atlas: per-node uvTopLeft/uvBottomRight and an animated material.setUVInfo
import { Vector2, Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { Texture2D } from '@zephyr3d/device';
import { Application, getEngine, Scene, Sprite, StandardSpriteMaterial } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { spriteAtlas } from '../../shared/basic-sprites.ts';
import { orbitCamera } from '../../shared/light-world.ts';
import { png } from '../../shared/textures.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/textures/atlas.png': png(512, 512, spriteAtlas) });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();

  const scene = new Scene();
  scene.env.light.type = 'none';
  const atlas = await getEngine().resourceManager.fetchTexture<Texture2D>('/textures/atlas.png');

  // One material for the whole 4 x 4 grid of sprites; each Sprite node picks its own cell with
  // uvTopLeft / uvBottomRight, so they share the material and can batch.
  const gridMaterial = new StandardSpriteMaterial();
  gridMaterial.spriteTexture = atlas;
  gridMaterial.blendMode = 'blend';
  for (let cell = 0; cell < 16; cell++) {
    const col = cell % 4;
    const row = Math.floor(cell / 4);
    const sprite = new Sprite(scene, gridMaterial);
    sprite.uvTopLeft = new Vector2(col / 4, row / 4);
    sprite.uvBottomRight = new Vector2((col + 1) / 4, (row + 1) / 4);
    sprite.position.setXYZ((col - 1.5) * 0.9 - 2.6, (1.5 - row) * 0.9, 0);
    sprite.scale.setXYZ(0.8, 0.8, 0.8);
  }

  // A second sprite with its own material animates by moving the material's UV rectangle
  const flipMaterial = new StandardSpriteMaterial();
  flipMaterial.spriteTexture = atlas;
  flipMaterial.blendMode = 'blend';
  const flip = new Sprite(scene, flipMaterial);
  flip.position.setXYZ(2.6, 0, 0);
  flip.scale.setXYZ(2.4, 2.4, 2.4);
  let fps = 6;
  let frame = -1;
  myApp.on('tick', (_dt, ms) => {
    const next = Math.floor((ms / 1000) * fps) % 16;
    if (next === frame) return;
    frame = next;
    const col = frame % 4;
    const row = Math.floor(frame / 4);
    flipMaterial.setUVInfo(col / 4, row / 4, (col + 1) / 4, (row + 1) / 4);
  });

  orbitCamera(scene, new Vector3(0, 0, 7), 100);
  if (stage.bar) {
    slider(stage.bar, 'flipbook frames per second', [1, 24, 1], fps, (v) => (fps = v));
  } else {
    stage.caption('uvTopLeft / uvBottomRight per node, setUVInfo on the material');
  }
  myApp.run();
});
