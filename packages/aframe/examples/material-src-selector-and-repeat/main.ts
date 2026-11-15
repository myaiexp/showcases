// material src: #id uses an <img> from <a-assets>; repeat tiles it across a plane
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { slider } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { checker } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-assets><img id="tiles" src="${checker(4, '#f2e9d8', '#5b7fa8')}"></a-assets>
      <a-entity id="floor" geometry="primitive: plane; width: 6; height: 4" material="src: #tiles; repeat: 6 4; color: #fff"
                position="0 1.2 -4.5" rotation="-50 0 0"></a-entity>
      <a-box position="-3.6 1.2 -4" width="1.2" height="1.2" depth="1.2" material="src: #tiles"
             animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true"></a-box>
    </a-scene>`,
  run(stage) {
    stage.caption('repeat: 6 4');
    if (stage.preview) return sway(stage, { yaw: 6 });
    const floor = q(stage, '#floor');
    const r = { x: 6, y: 4 };
    const apply = (): void => {
      floor.setAttribute('material', 'repeat', `${r.x} ${r.y}`);
      stage.caption(`repeat: ${r.x} ${r.y}`);
    };
    slider(stage.bar!, 'repeat x', [1, 20, 1], r.x, (v) => ((r.x = v), apply()));
    slider(stage.bar!, 'repeat y', [1, 20, 1], r.y, (v) => ((r.y = v), apply()));
  },
});
