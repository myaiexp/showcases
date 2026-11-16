// shadow="cast: …; receive: …" per entity; the light still needs castShadow: true
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

const boxes = [
  ['cast + receive', 'cast: true; receive: true'],
  ['cast only', 'cast: true; receive: false'],
  ['receive only', 'cast: false; receive: true'],
  ['neither', 'cast: false; receive: false'],
] as const;

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-entity light="type: ambient; intensity: 0.45"></a-entity>
      <a-entity light="type: directional; castShadow: true; intensity: 0.9; shadowCameraLeft: -5; shadowCameraRight: 5; shadowCameraTop: 5; shadowCameraBottom: -5" position="-2 5 1"></a-entity>
      ${boxes
        .map(
          ([label, shadow], i) => `
      <a-box position="${(i - 1.5) * 2} 0.5 -4" color="#d9b45a" shadow="${shadow}"></a-box>
      <a-torus position="${(i - 1.5) * 2} 1.9 -4" radius="0.4" radius-tubular="0.12" color="#4CC3D9" shadow="cast: true; receive: false"
               animation="property: rotation; to: 360 0 0; dur: 6000; easing: linear; loop: true"></a-torus>
      <a-text value="${label}" position="${(i - 1.5) * 2} 3 -4" width="2.4" align="center" color="#cfd8e3"></a-text>`,
        )
        .join('')}
      <a-plane rotation="-90 0 0" position="0 0 -4" width="12" height="8" color="#8da3bf" shadow="receive: true"></a-plane>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 5, pitch: 6 });
  },
});
