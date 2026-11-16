// A primitive is an entity with preset components and attribute mappings, so a-box equals geometry plus material
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="prim" color="red" width="3" position="-2.6 1 -6" animation="property: rotation; to: 0 360 0; dur: 9000; easing: linear; loop: true"></a-box>
      <a-entity id="ent" geometry="primitive: box; width: 3" material="color: red" position="2.6 1 -6" animation="property: rotation; to: 0 360 0; dur: 9000; easing: linear; loop: true"></a-entity>
      ${board('board', '0 4 -7', 8.6, 1.8, 84)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const prim = stage.scene.querySelector('#prim') as Entity;
    const ent = stage.scene.querySelector('#ent') as Entity;
    const show = (): void => {
      const f = (e: Entity): string => `geometry ${e.getAttribute('geometry').primitive} w${e.getAttribute('geometry').width}, material ${e.getAttribute('material').color}`;
      log.show(`<a-box color="red" width="3">                    ${f(prim)}\n<a-entity geometry="primitive: box; width: 3" ...>  ${f(ent)}`);
    };
    show();
    stage.caption('<a-box color="red" width="3"> = geometry + material');
    if (stage.preview) {
      sway(stage);
      stage.every(1500, (i) => {
        prim.setAttribute('color', i % 2 ? 'blue' : 'red');
        ent.setAttribute('material', 'color', i % 2 ? 'blue' : 'red');
        show();
      });
    } else if (stage.bar) {
      button(stage.bar, 'Set color on both', () => {
        prim.setAttribute('color', 'crimson');
        ent.setAttribute('material', 'color', 'crimson');
        show();
      });
    }
  },
});
