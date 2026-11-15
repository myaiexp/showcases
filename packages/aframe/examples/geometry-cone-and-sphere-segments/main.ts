// cone radiusTop/radiusBottom, and sphere segments that turn a ball into a gem
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

const spin = 'animation="property: rotation; to: 0 360 0; dur: 10000; easing: linear; loop: true"';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity geometry="primitive: cone; radiusBottom: 0.8; radiusTop: 0.01; height: 1.6" material="color: #FFC65D" position="-3.3 1.6 -4.5" ${spin}></a-entity>
      <a-entity geometry="primitive: cone; radiusBottom: 0.8; radiusTop: 0.3; height: 1.6" material="color: #EF2D5E" position="-1.65 1.6 -4.5" ${spin}></a-entity>
      <a-entity geometry="primitive: sphere; radius: 0.8; segmentsWidth: 2; segmentsHeight: 8" material="color: #4CC3D9; flatShading: true" position="0 1.6 -4.5" ${spin}></a-entity>
      <a-entity geometry="primitive: sphere; radius: 0.8; segmentsWidth: 8; segmentsHeight: 6" material="color: #7BC8A4; flatShading: true" position="1.65 1.6 -4.5" ${spin}></a-entity>
      <a-entity geometry="primitive: sphere; radius: 0.8; phiLength: 200; thetaStart: 30; thetaLength: 120" material="color: #c58bff; side: double" position="3.3 1.6 -4.5" ${spin}></a-entity>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
