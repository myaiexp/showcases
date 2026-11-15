// ambientOcclusionMap shades the ambient light only; intensity 0 to 1 fades it in
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { slider } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { paint } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => {
    // White surface with dark grooves in a grid, like the seams of panels.
    const ao = paint('ao-panels', 256, 256, (g, w) => {
      g.fillStyle = '#fff';
      g.fillRect(0, 0, w, w);
      g.fillStyle = '#000';
      for (let i = 0; i <= 4; i++) {
        const p = (i / 4) * w;
        g.fillRect(p - 6, 0, 12, w);
        g.fillRect(0, p - 6, w, 12);
      }
    });
    return `
    <a-scene background="color: #10151c">
      <a-assets><img id="ao" src="${ao}"></a-assets>
      <a-entity light="type: ambient; color: #ffffff; intensity: 1.2"></a-entity>
      <a-plane id="panel" width="2.6" height="2.6" position="-1.8 1.7 -3.5" material="color: #cfe0f2; ambientOcclusionMap: #ao; ambientOcclusionMapIntensity: 1"></a-plane>
      <a-plane width="2.6" height="2.6" position="1.8 1.7 -3.5" material="color: #cfe0f2"></a-plane>
      <a-text value="with map" position="-1.8 0.1 -3.5" width="3" align="center" color="#cfd8e3"></a-text>
      <a-text value="without" position="1.8 0.1 -3.5" width="3" align="center" color="#cfd8e3"></a-text>
    </a-scene>`;
  },
  run(stage) {
    if (stage.preview) return sway(stage, { yaw: 6 });
    const panel = q(stage, '#panel');
    slider(stage.bar!, 'ambientOcclusionMapIntensity', [0, 1, 0.05], 1, (v) => panel.setAttribute('material', 'ambientOcclusionMapIntensity', v));
  },
});
