// An intersection-spawn component on the camera's cursor builds voxels from any event and mixin
import { aframeExample } from '../../shared/frame.ts';
import { sway } from '../../shared/card.ts';
import { registerIntersectionSpawn, registerRandomColor, registerSnap } from '../../shared/core-voxel.ts';
import * as images from '../../shared/images.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    registerRandomColor(AFRAME);
    registerSnap(AFRAME);
    registerIntersectionSpawn(AFRAME);
  },

  scene: () => `
    <a-scene>
      <a-assets>
        <img id="groundTexture" src="${images.grid(8, '#2a3a2a', '#9fd09f')}">
        <a-mixin id="voxel" geometry="primitive: box; height: 0.5; width: 0.5; depth: 0.5" material="shader: standard"
                 random-color snap="offset: 0.25 0.25 0.25; snap: 0.5 0.5 0.5"></a-mixin>
      </a-assets>
      <a-cylinder id="ground" class="clickable" src="#groundTexture" radius="30" height="0.1"></a-cylinder>
      <a-sky color="#223a4a"></a-sky>
      <a-entity class="clickable" mixin="voxel" position="0 0 -3"></a-entity>
      <a-camera>
        <a-cursor id="cursor" raycaster="objects: .clickable" intersection-spawn="event: click; mixin: voxel"></a-cursor>
      </a-camera>
    </a-scene>`,

  run(stage) {
    stage.scene.addEventListener('spawned', (evt) => stage.caption(`voxels: ${(evt as CustomEvent<{ count: number }>).detail.count}`));
    stage.caption('drag to aim the cursor at the ground, click to spawn');
    if (stage.preview) {
      // No pointer in a card: make the cursor fuse-based and let the camera nod over the ground.
      const cursor = stage.scene.querySelector('#cursor') as Entity;
      cursor.setAttribute('cursor', 'fuse: true; fuseTimeout: 600');
      sway(stage, { yaw: 24, pitch: 18, seconds: 8 });
    }
  },
});
