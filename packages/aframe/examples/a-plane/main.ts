// <a-plane>: a ground with a repeated texture, and a segmented plane
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { grid } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #18222d">
      <a-assets>
        <img id="ground" src="${grid(4, '#2e4a3a', '#8fd19e')}">
      </a-assets>
      <!-- Basic plane, standing up. -->
      <a-plane color="#CCC" height="1.5" width="2.5" position="-1.8 1.4 -5"></a-plane>
      <!-- Textured plane parallel to ground; repeat tiles the image 10 times each way. -->
      <a-plane src="#ground" height="40" width="40" rotation="-90 0 0" repeat="10 10"></a-plane>
      <!-- segments-width and segments-height split the plane into a grid of quads. -->
      <a-plane color="#4CC3D9" wireframe="true" width="2" height="1.5" segments-width="6" segments-height="4"
               position="1.8 1.4 -5" animation="property: rotation; to: 0 360 0; dur: 9000; easing: linear; loop: true"></a-plane>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage);
  },
});
