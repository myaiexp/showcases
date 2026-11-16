// Attribute selectors with values and mutation observers do not see component changes
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="e" geometry="primitive: box" material="color: red" position="0 1.3 -3"></a-entity>
      ${board('board', '0 3.8 -4.5', 7.8, 2.2, 78)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const el = stage.scene.querySelector('#e') as Entity;
    let mutations = 0;
    new MutationObserver((records) => (mutations += records.length)).observe(el, { attributes: true });
    const show = (): void =>
      log.show(
        [
          `[material] matches: ${document.querySelectorAll('[material]').length}`,
          `[material="color: red"] matches: ${document.querySelectorAll('[material="color: red"]').length}  (the attribute text is not the data)`,
          `getAttribute('material').color: ${el.getAttribute('material').color}`,
          `MutationObserver records so far: ${mutations}`,
        ].join('\n'),
      );
    show();
    stage.caption('component data is not kept in the attribute text');
    const recolor = (c: string): void => {
      el.setAttribute('material', 'color', c);
      show();
    };
    if (stage.preview) {
      sway(stage);
      stage.every(1500, (i) => recolor(['blue', 'red', 'green'][i % 3]!));
    } else if (stage.bar) {
      button(stage.bar, "setAttribute('material', 'color', random)", () => recolor('#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')));
    }
  },
});
