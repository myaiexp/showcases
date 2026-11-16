// <a-obj-model>: an OBJ mesh with its MTL materials, from assets or inline
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { obj } from '../../shared/models.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #151320">
      <a-assets>
        <a-asset-item id="gem-obj" src="${obj.gem()}"></a-asset-item>
        <a-asset-item id="gem-mtl" src="${obj.gemMtl()}"></a-asset-item>
      </a-assets>
      <!-- Using the asset management system: src is the OBJ, mtl its materials. -->
      <a-obj-model src="#gem-obj" mtl="#gem-mtl" position="-1.2 1.5 -4"
                   animation="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"></a-obj-model>
      <!-- An inline URL and no mtl: the material component styles the mesh instead. -->
      <a-obj-model src="url(${obj.gem()})" position="1.2 1.5 -4" material="color: #7BC8A4; flatShading: true"
                   animation="property: rotation; to: 0 -360 0; dur: 6000; easing: linear; loop: true"></a-obj-model>
      <a-light type="ambient" intensity="0.6"></a-light>
      <a-light type="directional" position="-1 2 1" intensity="1.4"></a-light>
    </a-scene>`,

  run(stage) {
    if (stage.preview) sway(stage, { yaw: 10 });
    stage.caption('Left: OBJ + MTL. Right: OBJ alone');
  },
});
