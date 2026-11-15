// property: light.intensity and material.color tween one property of a component
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0a0d12">
      <a-entity light="type: ambient; intensity: 0.1"></a-entity>
      <a-entity light="type: point; color: #ffd9a0; intensity: 0.2; distance: 12" position="0 2.4 -2"
                animation="property: light.intensity; from: 0.2; to: 2.5; dur: 1800; dir: alternate; easing: easeInOutSine; loop: true"></a-entity>
      <a-sphere position="0 1.2 -3.4" radius="0.8" color="#cccccc"
                animation="property: material.color; from: #8fd3ff; to: #ffb3c7; dur: 3600; dir: alternate; easing: linear; loop: true"></a-sphere>
      <a-plane rotation="-90 0 0" width="14" height="14" position="0 0 -3" color="#39475a"></a-plane>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
