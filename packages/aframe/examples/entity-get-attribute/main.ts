// getAttribute returns component data with defaults; getDOMAttribute only what the markup or setAttribute set
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="e" geometry="primitive: box; width: 3" material="color: #4CC3D9" data-position="0 1 1" position="0 1.3 -4"></a-entity>
      ${board('board', '0 3.3 -5', 6.4, 2.2, 62)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const entity = stage.scene.querySelector('#e') as Entity;
    const short = (v: unknown): string => JSON.stringify(v)?.slice(0, 56) ?? 'undefined';
    const read = (): void => {
      log.show(
        [
          `getAttribute('geometry') ${short(entity.getAttribute('geometry'))}`,
          `getDOMAttribute('geometry') ${short(entity.getDOMAttribute('geometry'))}`,
          `getAttribute('geometry').height -> ${entity.getAttribute('geometry').height}`,
          `getDOMAttribute('geometry').height -> ${entity.getDOMAttribute('geometry').height}`,
          `getAttribute('data-position') -> "${entity.getAttribute('data-position')}"`,
          `getDOMAttribute('rotation') -> ${entity.getDOMAttribute('rotation')}`,
          `getAttribute('rotation') -> ${short(entity.getAttribute('rotation'))}`,
        ].join('\n'),
      );
      stage.caption('getAttribute vs getDOMAttribute');
    };
    read();

    if (stage.preview) {
      sway(stage);
      stage.every(2000, (i) => {
        entity.setAttribute('geometry', 'height', i % 2 ? 1 : 2);
        read();
      });
    } else if (stage.bar) {
      button(stage.bar, "setAttribute('geometry', 'height', 1)", () => {
        entity.setAttribute('geometry', 'height', 1);
        read();
      });
      button(stage.bar, "setAttribute('rotation', '0 45 0')", () => {
        entity.setAttribute('rotation', '0 45 0');
        read();
      });
    }
  },
});
