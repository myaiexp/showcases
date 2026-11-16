// sphericalEnvMap: the sky image is also what the shiny shapes reflect
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { panorama } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene>
      <a-assets><img id="sky" src="${panorama()}"></a-assets>
      <a-sky src="#sky"></a-sky>
      <a-sphere radius="0.9" position="-1.5 1.7 -3.5" material="sphericalEnvMap: #sky; roughness: 0; metalness: 1"></a-sphere>
      <a-torus radius="0.7" radius-tubular="0.25" position="1.5 1.7 -3.5" material="sphericalEnvMap: #sky; roughness: 0.1; metalness: 0.8; color: #ffe0a8"
               animation="property: rotation; to: 360 360 0; dur: 12000; easing: linear; loop: true"></a-torus>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 12 });
  },
});
