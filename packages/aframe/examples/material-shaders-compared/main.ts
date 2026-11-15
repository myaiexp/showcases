// shader: standard | phong | flat on identical geometry, with one orbiting light
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

const shaders = [
  ['standard', 'shader: standard; color: #4CC3D9; roughness: 0.4'],
  ['phong', 'shader: phong; color: #4CC3D9; specular: #ffffff; shininess: 60'],
  ['flat', 'shader: flat; color: #4CC3D9'],
] as const;

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-entity light="type: ambient; intensity: 0.25"></a-entity>
      <a-entity position="0 1.8 -4" animation="property: rotation; to: 0 360 0; dur: 5000; easing: linear; loop: true">
        <a-entity light="type: point; intensity: 1.6; distance: 20" position="0 1.2 2.2"></a-entity>
      </a-entity>
      ${shaders
        .map(
          ([name, mat], i) => `
      <a-torus-knot geometry="radius: 0.45; radiusTubular: 0.1" material="${mat}" position="${(i - 1) * 2.1} 1.7 -4"></a-torus-knot>
      <a-text value="${name}" position="${(i - 1) * 2.1} 0.5 -4" width="3" align="center" color="#cfd8e3"></a-text>`,
        )
        .join('')}
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
