// A spot light follows its target; angle and penumbra shape the cone
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { slider } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0a0d12" light="defaultLightsEnabled: false">
      <a-entity light="type: ambient; color: #111827"></a-entity>
      <a-entity id="spot" light="type: spot; angle: 30; penumbra: 0.4; intensity: 2.5; distance: 12; decay: 0.5; target: #mark" position="0 4 -2"></a-entity>
      <a-sphere id="mark" radius="0.15" position="-2 0.15 -4" color="#ffffff"
                animation="property: position; to: 2 0.15 -4; dur: 3500; dir: alternate; easing: easeInOutSine; loop: true"></a-sphere>
      <a-plane rotation="-90 0 0" position="0 0 -4" width="12" height="8" color="#cfd8e3"></a-plane>
    </a-scene>`,
  run(stage) {
    stage.caption('light="type: spot; angle: 30; penumbra: 0.4; target: #mark"');
    if (stage.preview) return sway(stage, { yaw: 6 });
    const spot = q(stage, '#spot');
    slider(stage.bar!, 'angle', [5, 80, 1], 30, (v) => spot.setAttribute('light', 'angle', v));
    slider(stage.bar!, 'penumbra', [0, 1, 0.05], 0.4, (v) => spot.setAttribute('light', 'penumbra', v));
  },
});
