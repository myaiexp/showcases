// flatShading, wireframe and side change how the same sphere is drawn
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

const variants = [
  ['smooth', 'color: #4CC3D9'],
  ['flatShading', 'color: #4CC3D9; flatShading: true'],
  ['wireframe', 'color: #4CC3D9; wireframe: true'],
  ['side: back', 'color: #4CC3D9; side: back'],
  ['side: double', 'color: #4CC3D9; side: double; opacity: 0.6; transparent: true'],
] as const;

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      ${variants
        .map(
          ([label, material], i) => `
      <a-entity geometry="primitive: sphere; radius: 0.8; segmentsWidth: 10; segmentsHeight: 8" material="${material}" position="${(i - 2) * 1.9} 1.7 -4.5"
                animation="property: rotation; to: 0 360 0; dur: 9000; easing: linear; loop: true"></a-entity>
      <a-text value="${label}" position="${(i - 2) * 1.9} 0.5 -4.5" width="3" align="center" color="#cfd8e3"></a-text>`,
        )
        .join('')}
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 5 });
  },
});
