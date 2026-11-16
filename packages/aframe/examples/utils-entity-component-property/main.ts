// utils.entity reads and writes one property of a component by a dotted or custom-delimited path
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="box" geometry="primitive: box" material="color: #4CC3D9" position="0 1.5 -3"></a-entity>
      ${board('board', '0 4 -5', 7, 1.8, 70)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const { entity: utils } = stage.AFRAME.utils;
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 6 });
    const entity = document.querySelector('#box') as Entity;
    const steps: [string, () => void][] = [
      ["getComponentProperty(entity, 'geometry.primitive')", () => log(`-> ${utils.getComponentProperty(entity, 'geometry.primitive')}`)],
      ["getComponentProperty(entity, 'geometry|primitive', '|')", () => log(`-> ${utils.getComponentProperty(entity, 'geometry|primitive', '|')}`)],
      ["setComponentProperty(entity, 'geometry.width', 2)", () => utils.setComponentProperty(entity, 'geometry.width', 2)],
      ["setComponentProperty(entity, 'geometry|height', 0.5, '|')", () => utils.setComponentProperty(entity, 'geometry|height', 0.5, '|')],
      ["setComponentProperty(entity, 'geometry', {depth: 3})", () => utils.setComponentProperty(entity, 'geometry', { depth: 3 })],
      ["setComponentProperty(entity, 'geometry', {width: 1, height: 1, depth: 1})", () => utils.setComponentProperty(entity, 'geometry', { width: 1, height: 1, depth: 1 })],
    ];
    const step = (i: number): void => {
      const [text, fn] = steps[i % steps.length]!;
      log(text);
      fn();
    };
    if (stage.preview) {
      sway(stage);
      stage.every(1300, (i) => step(i - 1));
    } else if (stage.bar) {
      let i = 0;
      button(stage.bar, 'Next call', () => step(i++));
    }
  },
});
