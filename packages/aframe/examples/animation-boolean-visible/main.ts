// Animating visible: the to value lands at the end of each cycle
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-box id="blinker" position="0 1.6 -3.5" color="#7BC8A4" visible="false"
             animation="property: visible; from: false; to: true; dur: 900; dir: alternate; loop: true"></a-box>
    </a-scene>`,
  run(stage) {
    const box = q(stage, '#blinker');
    stage.every(150, () => stage.caption(`visible = ${box.getAttribute('visible')}`));
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
