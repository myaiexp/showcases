// A point light's distance and decay set how far and how quickly it fades
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { slider } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #0a0d12" light="defaultLightsEnabled: false">
      <a-entity id="bulb" light="type: point; color: #ffd9a0; intensity: 1.6; distance: 6; decay: 1" position="0 2.4 -4"
                animation="property: position; from: -3 2.4 -4; to: 3 2.4 -4; dur: 5000; dir: alternate; easing: easeInOutSine; loop: true"></a-entity>
      <a-sphere radius="0.12" position="0 2.4 -4" material="shader: flat; color: #ffd9a0"
                animation="property: position; from: -3 2.4 -4; to: 3 2.4 -4; dur: 5000; dir: alternate; easing: easeInOutSine; loop: true"></a-sphere>
      ${[-3.6, -1.8, 0, 1.8, 3.6].map((x) => `<a-box position="${x} 0.5 -4" width="0.9" height="1" depth="0.9" color="#e6e6e6"></a-box>`).join('')}
      <a-plane rotation="-90 0 0" position="0 0 -4" width="14" height="8" color="#e6e6e6"></a-plane>
    </a-scene>`,
  run(stage) {
    stage.caption('light="type: point; distance: 6; decay: 1"');
    if (stage.preview) return sway(stage, { yaw: 6 });
    const bulb = q(stage, '#bulb');
    slider(stage.bar!, 'distance', [0, 14, 0.5], 6, (v) => bulb.setAttribute('light', 'distance', v));
    slider(stage.bar!, 'decay', [0, 4, 0.1], 1, (v) => bulb.setAttribute('light', 'decay', v));
    slider(stage.bar!, 'intensity', [0, 4, 0.1], 1.6, (v) => bulb.setAttribute('light', 'intensity', v));
  },
});
