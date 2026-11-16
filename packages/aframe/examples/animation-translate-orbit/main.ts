// animation tweens a property: a box slides on a line, a sphere orbits inside a turning parent
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-box position="-1 1.6 -5" animation="property: position; to: 1 4 -10; dur: 2000; easing: linear; loop: true" color="tomato"></a-box>
      <!-- The parent turns about its origin; the sphere sits 5 m out on its X axis. -->
      <a-entity position="0 1 -6" rotation="0 0 0" animation="property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear">
        <a-sphere position="5 0 0" color="mediumseagreen"></a-sphere>
      </a-entity>
      <a-plane rotation="-90 0 0" width="30" height="30" color="#243040"></a-plane>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 8 });
  },
});
