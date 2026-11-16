// The debug component keeps the DOM attributes in sync with component data
import { aframeExample } from '../../shared/frame.ts';
import { button, toggle } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="e" geometry="primitive: box" material="color: red" position="0 1.3 -3"
                animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true"></a-entity>
      ${board('board', '0 3.8 -4.5', 8, 1.6, 80)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const el = stage.scene.querySelector('#e') as Entity;
    const attr = (): string => Element.prototype.getAttribute.call(el, 'material') as string;
    const show = (): void => log.show(`scene has debug: ${'debug' in stage.scene.components}\nthe DOM says material="${attr()}"\ngetAttribute('material').color is ${el.getAttribute('material').color}`);
    const recolor = (c: string): void => {
      el.setAttribute('material', 'color', c);
      show();
    };
    show();
    stage.caption('<a-scene debug>: component-to-DOM serialization');
    if (stage.preview) {
      sway(stage);
      stage.every(1500, (i) => {
        if (i % 4 === 0) stage.scene.setAttribute('debug', '');
        if (i % 4 === 2) stage.scene.removeAttribute('debug');
        recolor(['blue', 'green', 'orange', 'purple'][i % 4]!);
      });
    } else if (stage.bar) {
      toggle(stage.bar, 'debug on the scene', false, (on) => {
        if (on) stage.scene.setAttribute('debug', '');
        else stage.scene.removeAttribute('debug');
        show();
      });
      button(stage.bar, 'Set a random colour', () => recolor('#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')));
    }
  },
});
