// A voxel is an entity with geometry and material components; shader standard or flat
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import * as images from '../../shared/images.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="prim" color="red" depth="0.5" height="0.5" width="0.5" shader="flat" position="-1 1.2 -2.5"></a-box>
      <a-entity id="ent" geometry="primitive: box; depth: 0.5; height: 0.5; width: 0.5" material="color: red; shader: standard"
                position="1 1.2 -2.5"></a-entity>
      ${board('board', '0 3 -4', 7, 1.2, 70)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const prim = stage.scene.querySelector('#prim') as Entity;
    const ent = stage.scene.querySelector('#ent') as Entity;
    const show = (): void => log.show(`<a-box ... shader="flat">: material.shader ${prim.getAttribute('material').shader}\n<a-entity ... shader: standard>: material.shader ${ent.getAttribute('material').shader}`);
    show();
    stage.caption('flat ignores lights, standard is lit');
    const swap = (i: number): void => {
      prim.setAttribute('material', 'shader', i % 2 ? 'standard' : 'flat');
      ent.setAttribute('material', 'shader', i % 2 ? 'flat' : 'standard');
      show();
    };
    if (stage.preview) {
      sway(stage);
      stage.every(1800, swap);
      for (const e of [prim, ent]) e.setAttribute('animation', 'property: rotation; to: 0 360 0; dur: 7000; easing: linear; loop: true');
    } else if (stage.bar) {
      let i = 0;
      button(stage.bar, 'Swap the shaders', () => swap(++i));
    }
  },
});
