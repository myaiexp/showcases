// obj-model="obj: #gem-obj; mtl: #gem-mtl"
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { obj } from '../../shared/models.ts';
import { logger } from '../../shared/comp-log.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-assets>
        <a-asset-item id="gem-obj" src="${obj.gem()}"></a-asset-item>
        <a-asset-item id="gem-mtl" src="${obj.gemMtl()}"></a-asset-item>
      </a-assets>
      <a-entity id="gem" obj-model="obj: #gem-obj; mtl: #gem-mtl" position="0 1.6 -3" scale="1.1 1.1 1.1"
                animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true"></a-entity>
    </a-scene>`,
  run(stage) {
    const log = logger(stage, 3);
    stage.scene.querySelector('#gem')!.addEventListener('model-loaded', () => log('model-loaded: the OBJ and its MTL are in the scene'));
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
