// gltf-model="#id" with the model in <a-assets>
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { glb } from '../../shared/models.ts';
import { logger } from '../../shared/comp-log.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-assets>
        <a-asset-item id="toy" src="${glb.toy()}"></a-asset-item>
        <a-asset-item id="tree" src="${glb.tree()}"></a-asset-item>
        <a-asset-item id="lantern" src="${glb.lantern()}"></a-asset-item>
      </a-assets>
      <a-entity id="m-toy" gltf-model="#toy" position="-2.4 0.8 -4" scale="1.4 1.4 1.4" animation="property: rotation; to: 0 360 0; dur: 9000; easing: linear; loop: true"></a-entity>
      <a-entity id="m-tree" gltf-model="#tree" position="0 0 -4.5" animation="property: rotation; to: 0 360 0; dur: 12000; easing: linear; loop: true"></a-entity>
      <a-entity id="m-lantern" gltf-model="#lantern" position="2.4 0.6 -4" scale="1.4 1.4 1.4" animation="property: rotation; to: 0 -360 0; dur: 9000; easing: linear; loop: true"></a-entity>
      <a-plane rotation="-90 0 0" position="0 0 -4" width="10" height="8" color="#39475a"></a-plane>
    </a-scene>`,
  run(stage) {
    const log = logger(stage, 4);
    for (const id of ['toy', 'tree', 'lantern']) {
      stage.scene.querySelector(`#m-${id}`)!.addEventListener('model-loaded', () => log(`model-loaded: #m-${id}`));
    }
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
