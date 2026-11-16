// child-attached and child-detached fire on the parent when children are appended or removed
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="parent" position="0 1.2 -3"><a-sphere radius="0.4" color="#ffc65d"></a-sphere></a-entity>
      ${board('board', '0 3.2 -4', 5.4, 1.4, 54)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 4 });
    const parent = stage.scene.querySelector('#parent') as Entity;
    parent.addEventListener('child-attached', (evt) => {
      if (evt.detail.el.tagName.toLowerCase() === 'a-box') log('child-attached: a box element has been attached');
    });
    parent.addEventListener('child-detached', (evt) => log(`child-detached: <${evt.detail.el.tagName.toLowerCase()}>`));

    let box: Entity | null = null;
    const add = (): void => {
      if (box) return;
      box = document.createElement('a-box') as Entity;
      box.setAttribute('color', '#4CC3D9');
      box.setAttribute('position', '1.2 0 0');
      parent.appendChild(box);
    };
    const remove = (): void => {
      if (box) parent.removeChild(box);
      box = null;
    };

    if (stage.preview) {
      sway(stage);
      stage.every(1500, (i) => (i % 2 ? add() : remove()));
    } else if (stage.bar) {
      button(stage.bar, 'appendChild(a-box)', add);
      button(stage.bar, 'removeChild(a-box)', remove);
    }
  },
});
