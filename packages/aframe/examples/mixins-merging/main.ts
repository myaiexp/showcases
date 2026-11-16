// Properties of one component merge when several mixins and the entity each set some of them
import { aframeExample } from '../../shared/frame.ts';
import { select } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-assets>
        <a-mixin id="box" geometry="primitive: box"></a-mixin>
        <a-mixin id="tall" geometry="height: 3"></a-mixin>
        <a-mixin id="wide" geometry="width: 3"></a-mixin>
      </a-assets>
      <a-entity id="e" mixin="wide tall box" geometry="depth: 0.5" material="color: #ffc65d" position="0 1.6 -4"></a-entity>
      ${board('board', '0 4.2 -5', 6.8, 1.2, 66)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const e = stage.scene.querySelector('#e') as Entity;
    const show = (): void => {
      const g = e.getAttribute('geometry');
      log.show(`mixin="${e.getAttribute('mixin')}" geometry="depth: 0.5"\n-> primitive ${g.primitive}, height ${g.height}, depth ${g.depth}, width ${g.width}`);
    };
    show();
    stage.caption('wide + tall + box + the entity own depth, merged into one geometry');
    const sets = ['wide tall box', 'tall box', 'wide box', 'box'];
    if (stage.preview) {
      sway(stage);
      stage.every(1500, (i) => e.setAttribute('mixin', sets[i % 4]!));
    } else if (stage.bar) {
      select(stage.bar, 'mixin attribute', sets, 'wide tall box', (v) => {
        e.setAttribute('mixin', v);
        show();
      });
    }
  },
});
