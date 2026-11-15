// visible="false" until materialtextureloaded starts a boolean animation
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { bricks } from '../../shared/images.ts';
import { q } from '../../shared/comp-dom.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-assets><img id="myTexture" src="${bricks()}"></a-assets>
      <!-- Wait for the texture, then (after the 1 s boolean animation) show the entity. -->
      <a-box id="wall" position="0 1.6 -3.5" material="src: #myTexture" visible="false"
             animation="property: visible; to: true; startEvents: materialtextureloaded"
             animation__spin="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true"></a-box>
    </a-scene>`,
  run(stage) {
    const wall = q(stage, '#wall');
    wall.addEventListener('materialtextureloaded', () => stage.caption('materialtextureloaded: the visible animation starts'));
    wall.addEventListener('animationcomplete', () => stage.caption(`visible = ${wall.getAttribute('visible')}`));
    stage.caption('visible = false, waiting for the texture');
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
