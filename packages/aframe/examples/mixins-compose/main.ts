// A mixin bundles components; an entity lists mixin ids to absorb them, left to right
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
      <a-entity id="a" mixin="red cube" position="-1.2 1.2 -3"></a-entity>
      <a-entity id="b" mixin="blue cube" position="1.2 1.2 -3"></a-entity>
      ${board('board', '0 3.5 -4', 6.4, 1.2, 64)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const a = stage.scene.querySelector('#a') as Entity;
    const b = stage.scene.querySelector('#b') as Entity;
    log.show(
      [
        `#a mixin="${a.getAttribute('mixin')}": geometry ${a.getAttribute('geometry').primitive}, color ${a.getAttribute('material').color}`,
        `#b mixin="${b.getAttribute('mixin')}": geometry ${b.getAttribute('geometry').primitive}, color ${b.getAttribute('material').color}`,
      ].join('\n'),
    );
    stage.caption('mixin="red cube" and mixin="blue cube"');
    if (stage.preview) {
      sway(stage);
      stage.every(1200, (i) => {
        a.object3D.rotation.y = i;
        b.object3D.rotation.y = -i;
      });
    }
  },
});
