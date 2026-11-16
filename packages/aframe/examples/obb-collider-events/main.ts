// Oriented bounding box collisions between a spinning bar and a block
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { aframeExample } from '../../shared/frame.ts';
import { logger } from '../../shared/comp-log.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene obb-collider="showColliders: true" background="color: #10151c">
      <a-box id="block" obb-collider position="0 1.6 -4" width="1" height="1" depth="1" color="#4CC3D9"></a-box>
      <a-box id="bar" obb-collider position="-3 1.6 -4" width="1.8" height="0.3" depth="0.3" color="#FFC65D"
             animation="property: position; from: -3 1.6 -4; to: 3 1.6 -4; dur: 4000; dir: alternate; easing: easeInOutSine; loop: true"
             animation__spin="property: rotation; to: 0 0 360; dur: 5000; easing: linear; loop: true"></a-box>
    </a-scene>`,
  run(stage) {
    const log = logger(stage, 5);
    const block = q(stage, '#block');
    block.addEventListener('obbcollisionstarted', (e) => {
      block.setAttribute('material', 'emissive', '#ff3355');
      log(`obbcollisionstarted: withEl #${e.detail.withEl.id}`);
    });
    block.addEventListener('obbcollisionended', (e) => {
      block.setAttribute('material', 'emissive', '#000000');
      log(`obbcollisionended: withEl #${e.detail.withEl.id}`);
    });
    // showColliders is read when a collider is added, so it is set once, in the markup.
    if (stage.preview) sway(stage, { yaw: 5, pitch: 6 });
  },
});
