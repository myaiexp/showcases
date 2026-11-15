// sound="src: …; on: click": click the box and it plays
import { aframeExample } from '../../shared/frame.ts';
import { sounds } from '../../shared/comp-audio.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene cursor="rayOrigin: mouse" background="color: #10151c">
      <a-assets><audio id="blip" src="${sounds.blip()}" preload="auto"></audio></a-assets>
      <a-entity id="elmo" geometry="primitive: box" material="color: #EF2D5E" position="0 1.6 -3.5"
                sound="src: #blip; on: click"
                animation__press="property: scale; from: 0.8 0.8 0.8; to: 1 1 1; dur: 300; easing: easeOutElastic; startEvents: click"></a-entity>
      <a-text value="click the box" position="0 0.4 -3.5" width="4" align="center" color="#cfd8e3"></a-text>
    </a-scene>`,
  run(stage) {
    stage.caption('Click the box');
    stage.scene.querySelector('#elmo')!.addEventListener('sound-ended', () => stage.caption('sound-ended'));
    stage.scene.querySelector('#elmo')!.addEventListener('click', () => stage.caption('click: playing'));
  },
});
