// The most basic component: init logs a message once when its entity is attached
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('hello-world', {
      init() {
        // The docs console.log here; the board shows it too.
        this.el.sceneEl.emit('note', 'Hello, World!  (init of ' + this.el.tagName.toLowerCase() + ')');
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-entity hello-world geometry="primitive: box" material="color: #4CC3D9" position="-1.5 1.3 -3"></a-entity>
      <a-sphere id="plain" color="#ef2d5e" radius="0.6" position="1.5 1.3 -3"></a-sphere>
      ${board('board', '0 3.6 -4.5', 7, 1.6, 70)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 4 });
    stage.scene.addEventListener('note', (evt) => log((evt as CustomEvent<string>).detail));
    log('<a-entity hello-world> in the HTML ran its init');
    const sphere = stage.scene.querySelector('#plain') as Entity;
    const attach = (): void => {
      sphere.removeAttribute('hello-world');
      sphere.setAttribute('hello-world', '');
    };
    if (stage.preview) {
      sway(stage);
      stage.every(2000, attach);
    } else if (stage.bar) {
      button(stage.bar, "sphere.setAttribute('hello-world', '')", attach);
      button(stage.bar, "scene.setAttribute('hello-world', '')", () => {
        stage.scene.removeAttribute('hello-world');
        stage.scene.setAttribute('hello-world', '');
      });
    }
  },
});
