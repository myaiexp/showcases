// Spawn a voxel where the mouse clicks, from evt.detail.intersection's point and face normal
import { aframeExample } from '../../shared/frame.ts';
import { sway } from '../../shared/card.ts';
import { ghost } from '../../shared/ghost.ts';
import { registerRandomColor, registerSnap } from '../../shared/core-voxel.ts';
import * as images from '../../shared/images.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    registerRandomColor(AFRAME);
    registerSnap(AFRAME);
  },

  scene: () => `
    <a-scene cursor="rayOrigin: mouse" raycaster="objects: .clickable">
      <a-assets>
        <img id="groundTexture" src="${images.grid(8, '#2a3a2a', '#9fd09f')}">
        <a-mixin id="voxel" geometry="primitive: box; height: 0.5; width: 0.5; depth: 0.5" material="shader: standard"
                 random-color snap="offset: 0.25 0.25 0.25; snap: 0.5 0.5 0.5"></a-mixin>
      </a-assets>
      <a-cylinder id="ground" class="clickable" src="#groundTexture" radius="30" height="0.1"></a-cylinder>
      <a-sky color="#223a4a"></a-sky>
      <a-entity mixin="voxel" class="clickable" position="0 0 -3"></a-entity>
    </a-scene>`,

  run(stage) {
    const scene = stage.scene;
    // The guide's handler, on the scene's cursor: it listens for click on the clicked entity,
    // so here it listens on the scene, where click events bubble.
    scene.addEventListener('click', (evt) => {
      const hit = (evt as CustomEvent<{ intersection?: { point: import('three').Vector3; face: { normal: import('three').Vector3 } } }>).detail.intersection;
      if (!hit) return;
      // Create a blank entity.
      const newVoxelEl = document.createElement('a-entity') as Entity;
      // Use the mixin to make it a voxel.
      newVoxelEl.setAttribute('mixin', 'voxel');
      newVoxelEl.classList.add('clickable');
      // Get normal of the face of intersection and scale it down a bit.
      const normal = hit.face.normal.clone().multiplyScalar(0.25);
      // Get the position of the intersection and add our scaled normal.
      const position = hit.point.clone().add(normal);
      // The snap component of the mixin snaps it to the closest half metre.
      newVoxelEl.setAttribute('position', position);
      // Add to the scene with appendChild.
      scene.appendChild(newVoxelEl);
      stage.caption(`voxels: ${scene.querySelectorAll('[mixin]').length}`);
    });
    stage.caption('click the ground or a voxel to stack another voxel');
    if (stage.preview) {
      const mouse = ghost(stage);
      const spots: [number, number][] = [[0.5, 0.75], [0.4, 0.8], [0.6, 0.85], [0.5, 0.62]];
      stage.every(1000, async (i) => {
        const [x, y] = spots[i % spots.length]!;
        await mouse.glide(x, y, 300);
        mouse.click();
      });
      sway(stage, { yaw: 10 });
    }
  },
});
