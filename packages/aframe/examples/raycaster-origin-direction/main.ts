// A ray's origin and direction, relative to the entity or in world coordinates
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity position="-1.5 1.5 -2" rotation="0 0 0" animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true">
        <!-- Local: the ray turns with its turning parent. -->
        <a-entity raycaster="showLine: true; far: 3; lineColor: #FFC65D; direction: 0 0 -1"></a-entity>
      </a-entity>
      <a-entity position="1.5 1.5 -2" rotation="0 0 0" animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true">
        <!-- World: origin and direction stay put although the parent turns. -->
        <a-entity raycaster="showLine: true; far: 3; lineColor: #4CC3D9; useWorldCoordinates: true; origin: 1.5 1.5 -2; direction: 0 0 -1"></a-entity>
      </a-entity>
      <a-entity position="0 0.6 -3"
                raycaster="showLine: true; far: 2.5; lineColor: #EF2D5E; direction: 0 1 0"
                animation="property: raycaster.direction; from: -1 1 0; to: 1 1 0; dur: 2500; dir: alternate; easing: easeInOutSine; loop: true"></a-entity>
      <a-text value="local" position="-1.5 0.3 -2" width="2.4" align="center" color="#FFC65D"></a-text>
      <a-text value="useWorldCoordinates" position="1.5 0.3 -2" width="2.4" align="center" color="#4CC3D9"></a-text>
    </a-scene>`,
  run(stage) {
    stage.caption('amber: relative to the turning entity; blue: world coordinates; red: animated direction');
    if (stage.preview) sway(stage, { yaw: 5 });
  },
});
