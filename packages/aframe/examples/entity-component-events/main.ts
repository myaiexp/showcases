// componentinitialized and componentremoved report each component the entity gains or loses
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="e" geometry="primitive: octahedron; radius: 0.7" material="color: #ffc65d" position="0 1.3 -3"
                animation="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"></a-entity>
      ${board('board', '0 3.2 -4', 5.4, 1.4, 54)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 4 });
    const entity = stage.scene.querySelector('#e') as Entity;
    entity.addEventListener('componentinitialized', (evt) => log(`componentinitialized: ${evt.detail.name}`));
    entity.addEventListener('componentremoved', (evt) => log(`componentremoved: ${evt.detail.name}`));
    const add = (): void => entity.setAttribute('light', 'type: point; intensity: 1.5');
    const remove = (): void => entity.removeAttribute('light');
    if (stage.preview) {
      sway(stage);
      stage.every(1700, (i) => (i % 2 ? add() : remove()));
    } else if (stage.bar) {
      button(stage.bar, "setAttribute('light', ...)", add);
      button(stage.bar, "removeAttribute('light')", remove);
    }
  },
});
