// <a-triangle>: three vertices, moved by attributes
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { checker } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #18222d">
      <a-assets>
        <img id="platform" src="${checker(4, '#d9c9a3', '#5b6e4a')}">
      </a-assets>
      <!-- Basic triangle with vertex-c moved down. -->
      <a-triangle color="#CCC" vertex-c="1 -1 0" position="-2 1.8 -5"></a-triangle>
      <!-- Textured triangle parallel to ground. -->
      <a-triangle src="#platform" rotation="-90 0 0" scale="3 3 3" position="0 0.01 -5"></a-triangle>
      <!-- vertex-a animated: the apex swings from side to side. -->
      <a-triangle color="#EF2D5E" side="double" vertex-b="-0.8 -0.6 0" vertex-c="0.8 -0.6 0" position="2 1.6 -5"
                  animation="property: geometry.vertexA; from: -0.8 0.8 0; to: 0.8 0.8 0; dur: 2000; dir: alternate; loop: true; easing: easeInOutSine"></a-triangle>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage);
  },
});
