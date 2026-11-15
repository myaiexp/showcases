// <a-ring>: inner and outer radius, segments and an arc
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { checker } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #18222d">
      <a-assets>
        <img id="texture" src="${checker(6, '#f2e6c9', '#8a4f2a')}">
      </a-assets>
      <!-- Basic ring. -->
      <a-ring color="teal" radius-inner="0.5" radius-outer="1" position="-2.2 1.6 -5"></a-ring>
      <!-- Textured ring with the default radii. -->
      <a-ring src="#texture" position="0 1.6 -5" animation="property: rotation; to: 0 360 0; dur: 12000; easing: linear; loop: true" side="double"></a-ring>
      <!-- A partial ring: theta-length grows, segments-phi rings the band. -->
      <a-ring color="#FFC65D" radius-inner="0.4" radius-outer="1" segments-theta="8" segments-phi="3" wireframe="true"
              position="2.2 1.6 -5"
              animation="property: geometry.thetaLength; from: 45; to: 360; dur: 3000; dir: alternate; loop: true; easing: easeInOutSine"></a-ring>
      <a-plane rotation="-90 0 0" width="20" height="20" color="#2c3a48"></a-plane>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage);
  },
});
