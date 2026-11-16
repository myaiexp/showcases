// destroy() frees a detached entity's components; on an attached entity it only warns
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="holder" position="0 1.3 -3"><a-box id="e" color="#4CC3D9"
        animation="property: rotation; to: 0 360 0; dur: 5000; easing: linear; loop: true"></a-box></a-entity>
      ${board('board', '0 3.3 -4', 5.8, 1.4, 58)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 4 });
    const holder = stage.scene.querySelector('#holder') as Entity;
    const make = (): Entity => {
      const el = document.createElement('a-box') as Entity;
      el.setAttribute('color', '#4CC3D9');
      el.setAttribute('animation', 'property: rotation; to: 0 360 0; dur: 5000; easing: linear; loop: true');
      holder.appendChild(el);
      return el;
    };
    let el = holder.querySelector('#e') as Entity;
    const attachedDestroy = (): void => {
      (el as Entity & { destroy(): void }).destroy();
      log(`destroy() while attached: ignored, still ${el.parentNode ? 'in the scene' : 'detached'}`);
    };
    const detachedDestroy = (): void => {
      if (el.parentNode) holder.removeChild(el);
      (el as Entity & { destroy(): void }).destroy();
      log('removeChild, then destroy(): detached and cleaned up');
      setTimeout(() => (el = make()), 700);
    };
    if (stage.preview) {
      sway(stage);
      stage.every(2000, (i) => (i % 2 ? attachedDestroy() : detachedDestroy()));
    } else if (stage.bar) {
      button(stage.bar, 'destroy() (attached)', attachedDestroy);
      button(stage.bar, 'removeChild + destroy()', detachedDestroy);
    }
  },
});
