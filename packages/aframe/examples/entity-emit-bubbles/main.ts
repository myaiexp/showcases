// emit() sends a DOM event that bubbles to parents by default; pass false to keep it on the entity
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="parent" position="0 1.2 -3">
        <a-box id="child" color="#4CC3D9" position="0 0 0"></a-box>
      </a-entity>
      ${board('board', '0 3.1 -4', 5, 1.4, 52)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 4 });
    const parent = stage.scene.querySelector('#parent') as Entity;
    const child = stage.scene.querySelector('#child') as Entity;

    child.addEventListener('sink', () => log('child heard sink'));
    parent.addEventListener('sink', (evt) => log(`parent heard sink (detail: ${JSON.stringify(evt.detail)})`));

    const bubbling = (): void => {
      log('child.emit("sink", {depth: 2})  (bubbles by default)');
      child.emit('sink', { depth: 2 });
    };
    const quiet = (): void => {
      log('child.emit("sink", null, false)');
      child.emit('sink', null, false);
    };

    if (stage.preview) {
      sway(stage);
      stage.every(1800, (i) => (i % 2 ? bubbling() : quiet()));
    } else if (stage.bar) {
      button(stage.bar, 'emit (bubbles)', bubbling);
      button(stage.bar, 'emit (bubbles: false)', quiet);
    }
  },
});
