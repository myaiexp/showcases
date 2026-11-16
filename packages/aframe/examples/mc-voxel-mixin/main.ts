// A voxel mixin bundles geometry, material, random-color and snap like a prefab
import { aframeExample } from '../../shared/frame.ts';
import { sway } from '../../shared/card.ts';
import { registerRandomColor, registerSnap } from '../../shared/core-voxel.ts';
import * as images from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    registerRandomColor(AFRAME);
    registerSnap(AFRAME);
  },

  scene: () => `
    <a-scene>
      <a-assets>
        <img id="groundTexture" src="${images.grid(8, '#2a3a2a', '#9fd09f')}">
        <a-mixin id="voxel"
                 geometry="primitive: box; height: 0.5; width: 0.5; depth: 0.5"
                 material="shader: standard"
                 random-color
                 snap="offset: 0.25 0.25 0.25; snap: 0.5 0.5 0.5"></a-mixin>
      </a-assets>
      <a-cylinder id="ground" src="#groundTexture" radius="30" height="0.1"></a-cylinder>
      <a-sky color="#223a4a"></a-sky>
      <a-entity mixin="voxel" position="-1 0 -2"></a-entity>
      <a-entity mixin="voxel" position="0 0 -2"></a-entity>
      <a-entity mixin="voxel" position="0 1 -2" animation="property: rotation; to: 0 360 0; loop: true"></a-entity>
      <a-entity mixin="voxel" position="1 0 -2"></a-entity>
    </a-scene>`,

  run(stage) {
    stage.caption('<a-entity mixin="voxel" position="-1 0 -2">: four voxels from one mixin');
    if (stage.preview) sway(stage);
  },
});
