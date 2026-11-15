// shadow="receive: false" on a glTF model, a receiving ground, a shadow-casting light
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { glb } from '../../shared/models.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-assets><a-asset-item id="tree" src="${glb.tree()}"></a-asset-item></a-assets>
      <a-entity light="type: ambient; intensity: 0.5"></a-entity>
      <a-entity light="type: directional; castShadow: true; intensity: 0.9; shadowCameraLeft: -4; shadowCameraRight: 4; shadowCameraTop: 4; shadowCameraBottom: -4" position="1 4 1"
                animation="property: position; from: -3 4 1; to: 3 4 1; dur: 6000; dir: alternate; easing: easeInOutSine; loop: true"></a-entity>
      <a-gltf-model src="#tree" shadow="receive: false" position="0 0 -4"></a-gltf-model>
      <a-circle id="ground" radius="5" rotation="-90 0 0" position="0 0 -4" color="#6b8f71" shadow="receive: true"></a-circle>
    </a-scene>`,
  run(stage) {
    stage.caption('the sun moves; the tree casts onto the ground');
    if (stage.preview) sway(stage, { yaw: 6, pitch: 5 });
  },
});
