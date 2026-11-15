// opacity needs transparent: true; alphaTest cuts a soft alpha channel into a hard edge
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { slider } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { glow } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #2b3a4d">
      <a-assets><img id="glow" src="${glow('#ffb347', 128)}"></a-assets>
      <a-plane position="0 1 -5" width="9" height="0.5" color="#4CC3D9"></a-plane>
      <a-plane position="-2.2 1.6 -4" width="1.8" height="1.8" material="src: #glow; opacity: 0.5"></a-plane>
      <a-plane position="0 1.6 -4" width="1.8" height="1.8" material="src: #glow; transparent: true; opacity: 0.8"></a-plane>
      <a-plane id="cut" position="2.2 1.6 -4" width="1.8" height="1.8" material="src: #glow; transparent: false; alphaTest: 0.5"></a-plane>
      <a-text value="opacity only" position="-2.2 0.3 -4" width="3" align="center" color="#fff"></a-text>
      <a-text value="transparent: true" position="0 0.3 -4" width="3" align="center" color="#fff"></a-text>
      <a-text value="alphaTest: 0.5" position="2.2 0.3 -4" width="3" align="center" color="#fff"></a-text>
    </a-scene>`,
  run(stage) {
    if (stage.preview) return sway(stage, { yaw: 5 });
    const cut = q(stage, '#cut');
    slider(stage.bar!, 'alphaTest', [0, 1, 0.05], 0.5, (v) => cut.setAttribute('material', 'alphaTest', v));
  },
});
