// envMap: #cubemap makes the sphere reflect six labelled faces; roughness blurs them
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { slider } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { cubeFaces } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-assets>
        <a-cubemap id="sky">${cubeFaces().map((src) => `<img src="${src}">`).join('')}</a-cubemap>
      </a-assets>
      <a-sphere id="ball" radius="1" position="-1.4 1.7 -3.5" material="envMap: #sky; roughness: 0; metalness: 1; color: #ffffff"
                animation="property: rotation; to: 0 360 0; dur: 14000; easing: linear; loop: true"></a-sphere>
      <a-box id="cube" position="1.5 1.7 -3.5" material="envMap: #sky; roughness: 0.15; metalness: 0.9; color: #ffd58a"
             animation="property: rotation; to: 360 360 0; dur: 14000; easing: linear; loop: true"></a-box>
    </a-scene>`,
  run(stage) {
    if (stage.preview) return sway(stage, { yaw: 6 });
    const ball = q(stage, '#ball');
    const cube = q(stage, '#cube');
    slider(stage.bar!, 'roughness', [0, 1, 0.05], 0, (v) => {
      ball.setAttribute('material', 'roughness', v);
      cube.setAttribute('material', 'roughness', v);
    });
  },
});
