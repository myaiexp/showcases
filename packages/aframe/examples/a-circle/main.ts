// <a-circle>: a flat disc, laid on the ground or cut into a pie
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { grid } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #18222d">
      <a-assets>
        <img id="platform" src="${grid(6, '#3b4f63', '#9fd0f0')}">
      </a-assets>
      <!-- Basic circle, facing the camera. -->
      <a-circle color="#CCC" radius="1" position="-1.8 1.6 -4"></a-circle>
      <!-- Textured circle parallel to ground: rotated -90 degrees about X. -->
      <a-circle src="#platform" radius="3" rotation="-90 0 0" position="0 0.01 -5"></a-circle>
      <!-- theta-start and theta-length cut the disc into a slice. -->
      <a-circle color="#FFC65D" radius="1" theta-start="30" theta-length="300" position="1.8 1.6 -4"
                animation="property: geometry.thetaLength; from: 20; to: 340; dur: 2500; dir: alternate; loop: true; easing: easeInOutQuad"></a-circle>
      <!-- segments sets how many triangles approximate the curve. -->
      <a-circle color="#EF2D5E" radius="0.5" segments="6" position="0 2.6 -4"></a-circle>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage);
  },
});
