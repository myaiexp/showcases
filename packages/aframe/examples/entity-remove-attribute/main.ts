// removeAttribute detaches a component, or with a property name resets that property to its default
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="e" geometry="primitive: box" material="color: blue" position="0 1.3 -3"
                animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true"></a-entity>
      ${board('board', '0 3.4 -4', 5.8, 1.2, 58)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 3 });
    const el = stage.scene.querySelector('#e') as Entity;
    const restore = (): void => {
      el.setAttribute('geometry', 'primitive: box');
      el.setAttribute('material', 'color', 'blue');
    };
    const resetColor = (): void => {
      el.removeAttribute('material', 'color');
      log(`removeAttribute('material', 'color') -> color is ${el.getAttribute('material').color}`);
    };
    const detach = (): void => {
      el.removeAttribute('geometry');
      log(`removeAttribute('geometry') -> 'geometry' in components: ${'geometry' in el.components}`);
    };
    if (stage.preview) {
      sway(stage);
      stage.every(1700, (i) => {
        if (i % 3 === 1) resetColor();
        else if (i % 3 === 2) detach();
        else restore();
      });
    } else if (stage.bar) {
      button(stage.bar, "removeAttribute('material', 'color')", resetColor);
      button(stage.bar, "removeAttribute('geometry')", detach);
      button(stage.bar, 'Restore', () => {
        restore();
        log('restored: geometry box, material color blue');
      });
    }
  },
});
