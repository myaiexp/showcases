// A log component with a message property from its schema, read in init as this.data.message
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent<{ message: string }>('log', {
      schema: {
        message: { type: 'string', default: 'Hello, World!' },
      },
      init() {
        this.el.sceneEl.emit('note', `<${this.el.tagName.toLowerCase()}> ${this.data.message}`);
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-entity log="message: Hello, Metaverse!" geometry="primitive: box" material="color: #4CC3D9" position="-2 1.3 -3"></a-entity>
      <a-sphere log color="#ef2d5e" radius="0.6" position="0 1.3 -3"></a-sphere>
      <a-cone log="message: Cones log too" color="#ffc65d" radius-bottom="0.5" height="1.1" position="2 1.1 -3"></a-cone>
      ${board('board', '0 3.6 -4.5', 7, 1.6, 70)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 4 });
    stage.scene.addEventListener('note', (evt) => log((evt as CustomEvent<string>).detail));
    const els = [...stage.scene.querySelectorAll('[log]')] as Entity[];
    log(`message property: ${els.map((e) => JSON.stringify(e.getAttribute('log').message)).join(', ')}`);
    const again = (i: number): void => {
      const e = els[i % els.length]!;
      e.removeAttribute('log');
      e.setAttribute('log', i % 2 ? 'message: Hello again' : '');
    };
    if (stage.preview) {
      sway(stage);
      stage.every(1700, again);
    } else if (stage.bar) {
      let i = 0;
      button(stage.bar, 're-attach log on the next entity', () => again(i++));
    }
  },
});
