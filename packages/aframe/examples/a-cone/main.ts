// <a-cone>: radius-bottom and radius-top shape a cone or a frustum
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { bricks } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #18222d">
      <a-assets>
        <img id="texture" src="${bricks()}">
      </a-assets>
      <!-- Basic cone: a wide bottom and a small top make a frustum. -->
      <a-cone color="tomato" radius-bottom="1" radius-top="0.25" height="1.6" position="-2 0.8 -5"></a-cone>
      <!-- Textured cone with the default radii (top 0.01: a point). -->
      <a-cone src="#texture" position="0 0.5 -4" animation="property: rotation; to: 0 360 0; dur: 12000; easing: linear; loop: true"></a-cone>
      <!-- Six radial segments and an open end: a hollow hexagonal funnel. -->
      <a-cone color="#4CC3D9" radius-bottom="0.3" radius-top="0.9" height="1.4" segments-radial="6" open-ended="true"
              side="double" position="2 1 -5" animation="property: rotation; to: 0 360 0; dur: 12000; easing: linear; loop: true"></a-cone>
      <a-plane rotation="-90 0 0" width="20" height="20" color="#2c3a48"></a-plane>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage);
  },
});
