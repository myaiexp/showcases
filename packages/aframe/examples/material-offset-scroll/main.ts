// material.offset animated: a conveyor of stripes and a diagonal scroll
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { grid, paint } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => {
    const stripes = paint('stripes', 128, 128, (g, w) => {
      for (let i = 0; i < 4; i++) {
        g.fillStyle = i % 2 ? '#2a3b50' : '#f0b45a';
        g.fillRect((i * w) / 4, 0, w / 4, w);
      }
    });
    return `
    <a-scene background="color: #10151c">
      <a-assets><img id="stripes" src="${stripes}"><img id="grid" src="${grid(4)}"></a-assets>
      <a-plane width="5" height="1" position="0 2.4 -4" material="shader: flat; src: #stripes; repeat: 5 1"
               animation="property: material.offset; from: 0 0; to: 1 0; dur: 2500; easing: linear; loop: true"></a-plane>
      <a-plane width="3" height="1.6" position="0 0.9 -4" material="shader: flat; src: #grid; repeat: 2 2"
               animation="property: material.offset; from: 0 0; to: 1 1; dur: 4000; easing: linear; loop: true"></a-plane>
    </a-scene>`;
  },
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
