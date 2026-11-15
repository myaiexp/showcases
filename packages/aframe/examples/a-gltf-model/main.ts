// <a-gltf-model>: glTF models from the asset system and inline URLs
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { glb } from '../../shared/models.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #141c25">
      <a-assets>
        <!-- A .glb file name tells a-asset-item to read binary; these blob: URLs have no extension, so say it. -->
        <a-asset-item id="tree" response-type="arraybuffer" src="${glb.tree()}"></a-asset-item>
        <a-asset-item id="toy" response-type="arraybuffer" src="${glb.toy()}"></a-asset-item>
      </a-assets>
      <!-- Using the asset management system. -->
      <a-gltf-model src="#tree" position="-1.6 0 -4.5"></a-gltf-model>
      <a-gltf-model src="#toy" position="0 0 -3.2" animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true"></a-gltf-model>
      <!-- Defining the URL inline (url() around it). -->
      <a-gltf-model src="url(${glb.lantern()})" position="1.6 0 -4"></a-gltf-model>
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -4" color="#2d3b2a"></a-plane>
    </a-scene>`,

  run(stage) {
    if (stage.preview) sway(stage, { yaw: 12, pitch: -8 });
    // model-loaded fires on each entity once its glTF is in the scene.
    const names = Array.from(stage.scene.querySelectorAll('a-gltf-model'), (el) => el.getAttribute('src') as string);
    let loaded = 0;
    stage.scene.querySelectorAll('a-gltf-model').forEach((el) => {
      const done = (): void => stage.caption(`model-loaded: ${++loaded} of ${names.length}`);
      if (el.getObject3D('mesh')) done();
      else el.addEventListener('model-loaded', done);
    });
  },
});
