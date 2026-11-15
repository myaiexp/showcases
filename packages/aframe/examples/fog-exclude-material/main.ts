// material="fog: false" excludes an entity from the scene's fog
import { q } from '../../shared/comp-dom.ts';
import { toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { sway } from '../../shared/card.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene fog="type: linear; color: #8895a8; near: 2; far: 14" background="color: #8895a8">
      ${Array.from({ length: 7 }, (_, i) => `
      <a-sphere class="fogged" position="-1.5 1 ${-3 - i * 2.6}" radius="0.7" color="#EF2D5E"></a-sphere>
      <a-sphere id="${i === 0 ? 'clear-first' : `clear-${i}`}" position="1.5 1 ${-3 - i * 2.6}" radius="0.7" material="color: #EF2D5E; fog: false"></a-sphere>`).join('')}
      <a-plane rotation="-90 0 0" position="0 0 -12" width="8" height="40" color="#506078"></a-plane>
    </a-scene>`,
  run(stage) {
    stage.caption('left: fogged   right: material fog: false');
    if (stage.preview) return sway(stage, { yaw: 10 });
    toggle(stage.bar!, 'first right-hand sphere: fog', false, (v) => (q(stage, '#clear-first').setAttribute('material', 'fog', v), void 0));
  },
});
