// querySelector and querySelectorAll find entities by id, class, tag or component attribute
import { aframeExample } from '../../shared/frame.ts';
import { select } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="redBox" class="clickable" color="red" position="-2.4 1 -3.5"></a-box>
      <a-sphere class="clickable" color="blue" radius="0.5" position="-0.8 1 -3.5"></a-sphere>
      <a-box color="green" position="0.8 1 -3.5"></a-box>
      <a-entity light="type: ambient; intensity: 0.5"></a-entity>
      <a-entity light="type: directional; intensity: 0.6" position="1 2 1"></a-entity>
      ${board('board', '0 3.6 -4.5', 7.4, 2, 74)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const sceneEl = document.querySelector('a-scene') as Entity;
    const queries = ['#redBox', 'a-box', '.clickable', '[light]', 'a-box:not(.clickable)'];
    const run = (i: number): void => {
      const sel = queries[i % queries.length]!;
      const found = [...sceneEl.querySelectorAll(sel)] as Entity[];
      log.show(`sceneEl.querySelectorAll('${sel}') -> ${found.length}\n${found.map((e) => `  <${e.tagName.toLowerCase()}${e.id ? ` id=${e.id}` : ''}>`).join('\n')}`);
      // Pulse what the query found.
      for (const e of found) {
        e.object3D.scale.setScalar(1.4);
        setTimeout(() => e.object3D.scale.setScalar(1), 500);
      }
    };
    run(0);
    stage.caption('sceneEl.querySelectorAll(...)');
    if (stage.preview) {
      sway(stage);
      stage.every(1500, run);
    } else if (stage.bar) {
      select(stage.bar, 'selector', queries, queries[0]!, (v) => run(queries.indexOf(v)));
    }
  },
});
