// castShadow on a directional light, shadow="cast" on objects, shadow="receive" on the ground
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity light="type: ambient; intensity: 0.5"></a-entity>
      <a-light type="directional" light="castShadow: true" position="-2 4 1" intensity="0.8" shadow-camera-automatic="#objects"></a-light>
      <a-entity id="objects">
        <a-box position="-1 1 -4" color="#EF2D5E" shadow="cast: true"
               animation="property: position; to: 1 1 -4; dur: 3000; dir: alternate; easing: easeInOutSine; loop: true"></a-box>
        <a-sphere position="1 1.8 -4" radius="0.5" color="#FFC65D" shadow="cast: true"
                  animation="property: position; to: -1 1.8 -4; dur: 3000; dir: alternate; easing: easeInOutSine; loop: true"></a-sphere>
      </a-entity>
      <a-circle id="ground" radius="5" rotation="-90 0 0" position="0 0 -4" color="#8da3bf" shadow="receive: true"></a-circle>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 6, pitch: 4 });
  },
});
