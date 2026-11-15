// <a-box>: the docs' tall box, a textured box and segmented boxes
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { checker } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #18222d">
      <a-assets>
        <img id="texture" src="${checker(8)}">
      </a-assets>
      <!-- Basic box. -->
      <a-box color="tomato" depth="2" height="4" width="0.5" position="-2.2 2 -6"></a-box>
      <!-- Textured box. -->
      <a-box src="#texture" position="0 1 -4" animation="property: rotation; to: 0 360 0; dur: 12000; easing: linear; loop: true"></a-box>
      <!-- segments-* split the faces; wireframe shows them. -->
      <a-box width="1.2" height="1.2" depth="1.2" segments-width="4" segments-height="3" segments-depth="2"
             wireframe="true" color="#7BC8A4" position="2.2 1.2 -5" animation="property: rotation; to: 0 360 0; dur: 12000; easing: linear; loop: true"></a-box>
      <a-plane rotation="-90 0 0" width="20" height="20" color="#2c3a48"></a-plane>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage);
  },
});
