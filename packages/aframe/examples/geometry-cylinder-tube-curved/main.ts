// Cylinder variations from the docs: can, tube, curved surface and hexagonal prism
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity geometry="primitive: cylinder; height: 1.6; radius: 0.6" material="color: #FFC65D" position="-3.3 1.6 -4.5" animation="property: rotation; to: 0 360 0; dur: 10000; easing: linear; loop: true"></a-entity>
      <a-entity geometry="primitive: cylinder; height: 1.6; radius: 0.6; openEnded: true" material="color: #4CC3D9; side: double" position="-1.1 1.6 -4.5" animation="property: rotation; to: 20 360 0; dur: 10000; easing: linear; loop: true"></a-entity>
      <a-entity geometry="primitive: cylinder; height: 1.6; radius: 0.6; openEnded: true; thetaLength: 180" material="color: #EF2D5E; side: double" position="1.1 1.6 -4.5" animation="property: rotation; to: 0 360 0; dur: 10000; easing: linear; loop: true"></a-entity>
      <a-entity geometry="primitive: cylinder; height: 1.6; radius: 0.6; segmentsRadial: 6" material="color: #7BC8A4; flatShading: true" position="3.3 1.6 -4.5" animation="property: rotation; to: 0 360 0; dur: 10000; easing: linear; loop: true"></a-entity>
      <a-text value="can      tube      curved surface      hexagonal prism" position="0 0.3 -4.5" width="9" align="center" color="#cfd8e3"></a-text>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
