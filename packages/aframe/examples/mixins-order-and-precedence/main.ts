// The right-most mixin wins a clash, and a property set on the entity beats every mixin
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-assets>
        <a-mixin id="red" material="color: red"></a-mixin>
        <a-mixin id="blue" material="color: blue"></a-mixin>
        <a-mixin id="cube" geometry="primitive: box"></a-mixin>
      </a-assets>
      <a-entity id="a" mixin="red blue cube" position="-2 1.2 -3.5"></a-entity>
      <a-entity id="b" mixin="blue red cube" position="0 1.2 -3.5"></a-entity>
      <a-entity id="c" mixin="red blue cube" material="color: green" position="2 1.2 -3.5"></a-entity>
      ${board('board', '0 3.5 -4.5', 7.2, 1.3, 70)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const els = ['a', 'b', 'c'].map((id) => stage.scene.querySelector('#' + id) as Entity);
    log.show(
      els
        .map((e) => `#${e.id} mixin="${e.getAttribute('mixin')}"${e.getDOMAttribute('material') ? ' material="color: green"' : ''} -> ${e.getAttribute('material').color}`)
        .join('\n'),
    );
    stage.caption('red blue: blue. blue red: red. entity colour: green');
    if (stage.preview) {
      sway(stage);
      stage.every(1200, (i) => els.forEach((e, k) => (e.object3D.rotation.y = i * (k + 1) * 0.3)));
    }
  },
});
