// componentchanged tells a listener which component of an entity was modified
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="e" color="#4CC3D9" position="-2 1.2 -3"
             animation="property: position; to: 2 1.2 -3; dur: 3000; dir: alternate; loop: true; easing: easeInOutSine"></a-box>
      ${board('board', '0 3.2 -4', 5.4, 1.2, 54)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 3 });
    const entity = stage.scene.querySelector('#e') as Entity;
    // The event is throttled, and the docs advise a tick handler for reading position.
    entity.addEventListener('componentchanged', (evt) => {
      if (evt.detail.name === 'position') {
        const p = evt.target.getAttribute('position');
        log(`Entity has moved to ${p.x.toFixed(2)} ${p.y.toFixed(2)} ${p.z.toFixed(2)}!`);
      } else log(`componentchanged: ${evt.detail.name}`);
    });
    if (stage.preview) sway(stage);
    else if (stage.bar) button(stage.bar, "setAttribute('color', random)", () => entity.setAttribute('color', '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')));
  },
});
