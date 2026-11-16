// addState and removeState push and pop entity states, with stateadded and stateremoved events
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="card" position="0 1.3 -3" color="#6a7a8c"></a-box>
      ${board('board', '0 3 -4', 5, 1.3, 52)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 4 });
    const entity = stage.scene.querySelector('#card') as Entity;

    entity.addEventListener('stateadded', (evt) => {
      if (evt.detail === 'selected') {
        log(`stateadded: Entity now selected!`);
        entity.setAttribute('material', 'color', '#ffb347');
      }
    });
    // The docs read evt.detail.state here, but 1.8.0 passes the state name itself as the detail.
    entity.addEventListener('stateremoved', (evt) => {
      log(`stateremoved: detail is ${JSON.stringify(evt.detail)}, detail.state is ${evt.detail?.state}`);
      entity.setAttribute('material', 'color', '#6a7a8c');
    });

    const select = (): void => {
      entity.addState('selected');
      log(`is('selected') -> ${entity.is('selected')}, states: [${entity.states}]`);
    };
    const deselect = (): void => {
      entity.removeState('selected');
      log(`is('selected') -> ${entity.is('selected')}, states: [${entity.states}]`);
    };

    if (stage.preview) {
      sway(stage);
      stage.every(1600, (i) => (i % 2 ? select() : deselect()));
    } else if (stage.bar) {
      button(stage.bar, "addState('selected')", select);
      button(stage.bar, "removeState('selected')", deselect);
    }
  },
});
