// normalMap fakes surface detail: bumps appear on a flat plane, scaled by normalScale
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { slider } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { bumps } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-assets><img id="bumps" src="${bumps(6)}"></a-assets>
      <a-entity light="type: ambient; intensity: 0.2"></a-entity>
      <a-entity position="0 1.7 -3" animation="property: rotation; to: 0 360 0; dur: 5000; easing: linear; loop: true">
        <a-entity light="type: point; intensity: 1.5; distance: 10" position="1.6 0.4 1.4"></a-entity>
      </a-entity>
      <a-plane id="wall" width="3.4" height="2.4" position="0 1.7 -3.6"
               material="color: #8fb0d6; roughness: 0.6; normalMap: #bumps; normalScale: 1 1; normalTextureRepeat: 2 2"></a-plane>
      <a-sphere radius="0.7" position="-3 1.7 -3.6" material="color: #d6a88f; roughness: 0.5; normalMap: #bumps; normalTextureRepeat: 3 3"></a-sphere>
    </a-scene>`,
  run(stage) {
    if (stage.preview) return sway(stage, { yaw: 6 });
    const wall = q(stage, '#wall');
    slider(stage.bar!, 'normalScale', [0, 3, 0.1], 1, (v) => wall.setAttribute('material', 'normalScale', `${v} ${v}`));
    slider(stage.bar!, 'normalTextureRepeat', [1, 8, 1], 2, (v) => wall.setAttribute('material', 'normalTextureRepeat', `${v} ${v}`));
  },
});
