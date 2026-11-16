// Flat primitives vanish from behind unless the material is side: double
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

const shapes = [
  'primitive: plane; width: 1.2; height: 1.2',
  'primitive: circle; radius: 0.6',
  'primitive: ring; radiusInner: 0.3; radiusOuter: 0.6',
  'primitive: triangle; vertexA: 0 0.6 0; vertexB: -0.6 -0.6 0; vertexC: 0.6 -0.6 0',
];
const turn = 'animation="property: rotation; to: 0 360 0; dur: 5000; easing: linear; loop: true"';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      ${shapes
        .map((g, i) => {
          const x = -3.3 + i * 2.2;
          return `
      <a-entity geometry="${g}" material="color: #EF9D5E" position="${x} 2.8 -4.5" ${turn}></a-entity>
      <a-entity geometry="${g}" material="color: #4CC3D9; side: double" position="${x} 1.2 -4.5" ${turn}></a-entity>`;
        })
        .join('')}
      <a-text value="front side only" position="0 3.7 -4.5" width="5" align="center" color="#cfd8e3"></a-text>
      <a-text value="side: double" position="0 0.2 -4.5" width="5" align="center" color="#cfd8e3"></a-text>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 5 });
  },
  height: 460,
});
