// The text material's side, opacity and alphaTest
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

const turn = 'animation="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity text="value: front; side: front; width: 3; color: #7BC8A4" position="-2.6 2.6 -4" ${turn}></a-entity>
      <a-entity text="value: double; side: double; width: 3; color: #FFC65D" position="0 2.6 -4" ${turn}></a-entity>
      <a-entity text="value: back; side: back; width: 3; color: #EF2D5E" position="2.6 2.6 -4" ${turn}></a-entity>
      <a-entity text="value: opacity; width: 3; color: #4CC3D9" position="-1.4 1 -4"
                animation="property: text.opacity; from: 1; to: 0.1; dur: 1800; dir: alternate; easing: linear; loop: true"></a-entity>
      <a-entity text="value: alphaTest; width: 3; color: #c58bff; alphaTest: 0.5" position="1.4 1 -4"
                animation="property: text.alphaTest; from: 0.1; to: 0.9; dur: 2400; dir: alternate; easing: linear; loop: true"></a-entity>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 4 });
  },
});
