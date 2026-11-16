// hemisphere: color from above, groundColor from below
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c" light="defaultLightsEnabled: false">
      <a-entity light="type: hemisphere; color: #33C; groundColor: #3C3; intensity: 2"></a-entity>
      <a-sphere position="-1.8 1.6 -4" radius="0.8" color="#ffffff"></a-sphere>
      <a-box position="0 1.6 -4" color="#ffffff" animation="property: rotation; to: 360 0 360; dur: 9000; easing: linear; loop: true"></a-box>
      <a-torus position="1.8 1.6 -4" radius="0.6" radius-tubular="0.25" color="#ffffff" animation="property: rotation; to: 360 360 0; dur: 9000; easing: linear; loop: true"></a-torus>
    </a-scene>`,
  run(stage) {
    stage.caption('color: #33C from above, groundColor: #3C3 from below');
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
