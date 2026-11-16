// update(oldData) re-wires an event listener when the event property changes
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
      init() {
        // Closure to access fresh this.data from the event handler's context.
        const self = this;
        this.eventHandlerFn = function () {
          self.el.sceneEl.emit('note', self.data.message);
        };
      },
      update(oldData) {
        const data = this.data;
        const el = this.el;
        if (data.event !== oldData.event) {
          // Remove the previous event listener, if it exists.
          if (oldData.event) el.removeEventListener(oldData.event, this.eventHandlerFn);
          // Add the listener for the new event, if it exists.
          if (data.event) el.addEventListener(data.event, this.eventHandlerFn);
        }
        if (!data.event) el.sceneEl.emit('note', data.message);
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="e" log="event: anEvent; message: Hello, Metaverse!" color="#4CC3D9" position="0 1.3 -3"></a-box>
      ${board('board', '0 3.6 -4.5', 7, 1.8, 70)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 5 });
    stage.scene.addEventListener('note', (evt) => log('log says: ' + (evt as CustomEvent<string>).detail));
    const el = stage.scene.querySelector('#e') as Entity;
    const emit = (name: string): void => {
      log(`el.emit('${name}')`);
      el.emit(name);
      el.object3D.scale.setScalar(1.25);
      setTimeout(() => el.object3D.scale.setScalar(1), 250);
    };
    const retarget = (): void => {
      log("setAttribute('log', {event: 'anotherEvent', message: 'Hello, new event!'})");
      el.setAttribute('log', { event: 'anotherEvent', message: 'Hello, new event!' });
    };
    if (stage.preview) {
      sway(stage);
      const script = [() => emit('anEvent'), retarget, () => emit('anEvent'), () => emit('anotherEvent'), () => el.setAttribute('log', { event: 'anEvent', message: 'Hello, Metaverse!' })];
      stage.every(1400, (i) => script[(i - 1) % script.length]!());
    } else if (stage.bar) {
      button(stage.bar, "emit('anEvent')", () => emit('anEvent'));
      button(stage.bar, "emit('anotherEvent')", () => emit('anotherEvent'));
      button(stage.bar, 'Update event and message', retarget);
    }
  },
});
