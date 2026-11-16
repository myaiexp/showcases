// A-Frame keeps component data in memory; flushToDOM writes it back to the element's attributes
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="e" geometry="primitive: box" material="color: red" position="0 1.3 -4">
        <a-entity id="kid" geometry="primitive: sphere; radius: 0.4" material="color: #ffc65d" position="1.4 0 0"></a-entity>
      </a-entity>
      ${board('board', '0 3.3 -5', 6.4, 1.8, 62)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const entity = stage.scene.querySelector('#e') as Entity;
    const kid = stage.scene.querySelector('#kid') as Entity;
    const dom = (el: Entity): string => `${el.id}: material="${el.getAttribute('material') && (el as HTMLElement).attributes.getNamedItem('material')?.value}"`;
    const read = (title: string): void => {
      log.show(`${title}\nDOM now -> ${dom(entity)}\nDOM now -> ${dom(kid)}`);
      stage.caption(title);
    };
    const recolor = (): void => {
      entity.setAttribute('material', 'color', 'blue');
      kid.setAttribute('material', 'color', 'green');
      read("setAttribute('material', 'color', ...) on both");
    };
    read('start');

    if (stage.preview) {
      sway(stage);
      stage.every(2000, (i) => {
        if (i % 3 === 1) recolor();
        else if (i % 3 === 2) {
          entity.flushToDOM();
          read('entity.flushToDOM()');
        } else {
          entity.flushToDOM(true);
          read('entity.flushToDOM(true)');
        }
      });
    } else if (stage.bar) {
      button(stage.bar, 'Recolour both', recolor);
      button(stage.bar, 'flushToDOM()', () => {
        entity.flushToDOM();
        read('entity.flushToDOM()');
      });
      button(stage.bar, 'flushToDOM(true)', () => {
        entity.flushToDOM(true);
        read('entity.flushToDOM(true)');
      });
    }
  },
});
