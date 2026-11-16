// The remove handler takes the component's event listener away with the component
import { aframeExample } from '../../shared/frame.ts';
import { button, toggle } from '../../shared/controls.ts';
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
      init() {
        const self = this;
        this.eventHandlerFn = function () {
          self.el.sceneEl.emit('note', self.data.message);
        };
      },
      update(oldData) {
        const data = this.data;
        const el = this.el;
        if (oldData.event && data.event !== oldData.event) el.removeEventListener(oldData.event, this.eventHandlerFn);
        if (data.event) el.addEventListener(data.event, this.eventHandlerFn);
        else el.sceneEl.emit('note', data.message);
      },
      remove() {
        // Handle component removal: remove the event listener.
        if (this.data.event) this.el.removeEventListener(this.data.event, this.eventHandlerFn);
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="e" log="event: anEvent; message: Hello, Metaverse!" color="#4CC3D9" position="0 1.3 -3"></a-box>
      ${board('board', '0 3.6 -4.5', 7, 1.6, 70)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 4 });
    let heard = 0;
    stage.scene.addEventListener('note', (evt) => {
      heard++;
      log('log says: ' + (evt as CustomEvent<string>).detail);
    });
    const el = stage.scene.querySelector('#e') as Entity;
    const emit = (): void => {
      const before = heard;
      el.emit('anEvent');
      if (heard === before) log("emit('anEvent'): nothing logged, the component is gone");
    };
    const toggle = (): void => {
      if (el.components.log) {
        el.removeAttribute('log');
        log("removeAttribute('log')");
      } else {
        el.setAttribute('log', 'event: anEvent; message: Hello, Metaverse!');
        log("setAttribute('log', ...)");
      }
    };
    if (stage.preview) {
      sway(stage);
      stage.every(1400, (i) => (i % 3 === 0 ? toggle() : emit()));
    } else if (stage.bar) {
      button(stage.bar, "emit('anEvent')", emit);
      button(stage.bar, 'removeAttribute / setAttribute log', toggle);
    }
  },
});
