// The four polyhedra geometries take a radius; flatShading shows their faces
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

const shapes = ['tetrahedron', 'octahedron', 'dodecahedron', 'icosahedron'];

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      ${shapes
        .map(
          (shape, i) => `
      <a-entity geometry="primitive: ${shape}; radius: 0.8" material="color: hsl(${i * 80 + 20}, 65%, 60%); flatShading: true"
                position="${-3.3 + i * 2.2} 1.6 -4.5" animation="property: rotation; to: 0 360 0; dur: 9000; easing: linear; loop: true"></a-entity>
      <a-text value="${shape}" position="${-3.3 + i * 2.2} 0.4 -4.5" width="3" align="center" color="#cfd8e3"></a-text>`,
        )
        .join('')}
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
