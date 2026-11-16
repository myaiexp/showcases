// multiple: true allows log__helloworld and log__metaverse on one entity
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent<{ event: string; message: string }>('log', {
      schema: {
        event: { type: 'string', default: '' },
        message: { type: 'string', default: 'Hello, World!' },
      },
      multiple: true,
      init() {
        const self = this;
        this.eventHandlerFn = function () {
          self.el.sceneEl.emit('note', `${self.attrName} (id "${self.id}"): ${self.data.message}`);
        };
      },
      update(oldData) {
        if (oldData.event && this.data.event !== oldData.event) this.el.removeEventListener(oldData.event, this.eventHandlerFn);
        if (this.data.event) this.el.addEventListener(this.data.event, this.eventHandlerFn);
      },
      remove() {
        if (this.data.event) this.el.removeEventListener(this.data.event, this.eventHandlerFn);
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="e" log__helloworld="event: greet; message: Hello, World!" log__metaverse="event: greet; message: Hello, Metaverse!"
             color="#4CC3D9" position="0 1.3 -3"></a-box>
      ${board('board', '0 3.6 -4.5', 7, 1.6, 70)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 4 });
    stage.scene.addEventListener('note', (evt) => log((evt as CustomEvent<string>).detail));
    const el = stage.scene.querySelector('#e') as Entity;
    log(`instances: ${Object.keys(el.components).filter((k) => k.startsWith('log')).join(', ')}`);
    const greet = (): void => el.emit('greet');
    if (stage.preview) {
      sway(stage);
      stage.every(1800, greet);
    } else if (stage.bar) {
      button(stage.bar, "emit('greet')", greet);
      button(stage.bar, "setAttribute('log__third', ...)", () => {
        el.setAttribute('log__third', { event: 'greet', message: 'A third instance' });
        log(`instances: ${Object.keys(el.components).filter((k) => k.startsWith('log')).join(', ')}`);
      });
    }
  },
});
