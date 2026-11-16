// emit() with no detail triggers an animation's startEvents; with detail it carries data to listeners
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="spinner" geometry="primitive: box" material="color: #ef2d5e" position="-1.2 1.2 -3"
                animation="property: rotation; to: 0 360 0; dur: 1200; easing: easeInOutQuad; startEvents: rotate"></a-entity>
      <a-sphere id="other" color="#ffc65d" radius="0.5" position="1.5 1.2 -3"></a-sphere>
      ${board('board', '0 3.1 -4', 5, 1.4, 52)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 4 });
    const entity = stage.scene.querySelector('#spinner') as Entity;
    const other = stage.scene.querySelector('#other') as Entity;

    entity.addEventListener('collide', (evt) => log(`collide: target is #${evt.detail.target.id}`));
    const rotate = (): void => {
      log('entity.emit("rotate")  -> animation starts');
      entity.emit('rotate');
    };
    const collide = (): void => entity.emit('collide', { target: other });

    if (stage.preview) {
      sway(stage);
      stage.every(2200, (i) => (i % 2 ? rotate() : collide()));
    } else if (stage.bar) {
      button(stage.bar, "emit('rotate')", rotate);
      button(stage.bar, "emit('collide', {target})", collide);
    }
  },
});
