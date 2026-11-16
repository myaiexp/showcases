// blending: how a transparent material combines with what is behind it
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { glow } from '../../shared/images.ts';

const modes = ['none', 'normal', 'additive', 'subtractive', 'multiply'];

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #5a6a80">
      <a-assets><img id="glow" src="${glow('#ff8c42', 128)}"></a-assets>
      <a-plane position="0 1.6 -4.2" width="10" height="1.2" material="color: #4CC3D9"></a-plane>
      ${modes
        .map(
          (mode, i) => `
      <a-plane position="${(i - 2) * 1.9} 1.6 -4" width="1.7" height="1.7" material="src: #glow; transparent: true; blending: ${mode}"></a-plane>
      <a-text value="${mode}" position="${(i - 2) * 1.9} 0.4 -4" width="2.6" align="center" color="#ffffff"></a-text>`,
        )
        .join('')}
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 5 });
  },
});
