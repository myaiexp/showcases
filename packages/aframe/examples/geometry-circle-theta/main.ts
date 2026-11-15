// thetaStart and thetaLength cut a circle into arcs; animating thetaLength fills a ring
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity geometry="primitive: circle; radius: 0.8; thetaStart: 180; thetaLength: 180" material="color: #FFC65D; side: double" position="-3.2 1.6 -4"></a-entity>
      <a-entity geometry="primitive: circle; radius: 0.8; thetaStart: 0; thetaLength: 180" material="color: #EF2D5E; side: double" position="-1.6 1.6 -4"></a-entity>
      <a-entity geometry="primitive: circle; radius: 0.8; thetaStart: 40; thetaLength: 280; segments: 48" material="color: #FFE14D; side: double" position="0 1.6 -4"></a-entity>
      <a-entity geometry="primitive: ring; radiusInner: 0.6; radiusOuter: 0.8; thetaStart: 90; thetaLength: 10" material="color: #4CC3D9; side: double" position="1.6 1.6 -4"
                animation="property: geometry.thetaLength; from: 10; to: 360; dur: 2500; easing: linear; loop: true"></a-entity>
      <a-entity geometry="primitive: circle; radius: 0.8; thetaLength: 90" material="color: #7BC8A4; side: double" position="3.2 1.6 -4"
                animation="property: geometry.thetaStart; from: 0; to: 360; dur: 3000; easing: linear; loop: true"></a-entity>
    </a-scene>`,
  run(stage) {
    stage.caption('thetaStart / thetaLength: ( ) arcs, a wedge, a filling ring, a spinner');
    if (stage.preview) sway(stage, { yaw: 5 });
  },
});
