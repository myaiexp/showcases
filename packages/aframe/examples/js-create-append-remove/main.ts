// createElement, appendChild and removeChild add and remove entities; the entity loads asynchronously
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('do-something-once-loaded', {
      init() {
        // Called after the entity has properly attached and loaded.
        this.el.sceneEl.emit('note', 'do-something-once-loaded: I am ready!');
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      ${board('board', '0 3.6 -4.5', 7.4, 1.8, 74)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 5 });
    stage.scene.addEventListener('note', (evt) => log((evt as CustomEvent<string>).detail));
    const sceneEl = document.querySelector('a-scene') as Entity;
    let n = 0;
    const stack: Entity[] = [];
    const add = (): void => {
      const entityEl = document.createElement('a-entity') as Entity;
      entityEl.setAttribute('geometry', { primitive: 'box', height: 0.6, width: 0.6, depth: 0.6 });
      entityEl.setAttribute('material', 'color', ['#4CC3D9', '#ef2d5e', '#ffc65d', '#7be0c3'][n % 4]);
      entityEl.setAttribute('position', { x: (stack.length % 5) * 1.1 - 2.2, y: 0.6, z: -3 });
      entityEl.setAttribute('do-something-once-loaded', '');
      entityEl.addEventListener('loaded', () => log(`entity ${n} loaded: hasLoaded ${entityEl.hasLoaded}`));
      sceneEl.appendChild(entityEl);
      n++;
      stack.push(entityEl);
      log(`appendChild #${n}: hasLoaded right away is ${entityEl.hasLoaded}`);
    };
    const remove = (): void => {
      const el = stack.pop();
      if (el) {
        el.parentNode!.removeChild(el);
        log('removeChild via parentNode');
      }
    };
    add();
    if (stage.preview) {
      sway(stage);
      stage.every(1200, (i) => (stack.length >= 5 || (i % 3 === 0 && stack.length > 1) ? remove() : add()));
    } else if (stage.bar) {
      button(stage.bar, 'createElement + appendChild', add);
      button(stage.bar, 'removeChild', remove);
    }
  },
});
