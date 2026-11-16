// ambient fills evenly; directional shines from a direction given by its position
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity light="type: ambient; color: #445"></a-entity>
      <a-entity position="0 0 0" animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true">
        <!-- Only the vector matters: position="-100 100 0" is the same as "-1 1 0". -->
        <a-entity light="type: directional; color: #fff0d0; intensity: 1.2" position="-1 1 0"></a-entity>
      </a-entity>
      <a-sphere position="-1.6 1.2 -4" radius="0.8" color="#cccccc"></a-sphere>
      <a-box position="1.6 1.2 -4" width="1.2" height="1.2" depth="1.2" color="#cccccc"></a-box>
      <a-plane rotation="-90 0 0" position="0 0 -4" width="10" height="10" color="#4a5b70"></a-plane>
    </a-scene>`,
  run(stage) {
    stage.caption('the directional light circles; ambient #445 keeps the dark sides visible');
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
