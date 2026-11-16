// Three ways to reach the component's this from an event listener
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    const note = (c: { el: Entity }, how: string): void => c.el.sceneEl.emit('note', `${how}: this.el.id is "${c.el.id}"`);
    AFRAME.registerComponent('bound', {
      events: {
        // 2. The events object: bound to the component, added and removed for us.
        click(this: { el: Entity }) {
          note(this, '2. events object');
        },
      },
      init() {
        // 1. An arrow function keeps this.
        this.el.addEventListener('click', () => note(this, '1. arrow function'));
        // 3. A bound copy of a method.
        this.listeners = { clickListener: this.clickListener.bind(this) };
        this.el.addEventListener('click', this.listeners.clickListener);
        // A plain function loses this: it is the element, not the component.
        this.el.addEventListener('click', function (this: HTMLElement) {
          (this as Entity).sceneEl.emit('note', `plain function: this is <${this.tagName.toLowerCase()}>, not the component`);
        });
      },
      clickListener() {
        note(this, '3. bound method');
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="target" bound color="#4CC3D9" position="0 1.3 -3"></a-box>
      ${board('board', '0 3.6 -4.5', 7.4, 1.8, 74)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 5 });
    stage.scene.addEventListener('note', (evt) => log((evt as CustomEvent<string>).detail));
    const target = stage.scene.querySelector('#target') as Entity;
    if (stage.preview) {
      sway(stage);
      stage.every(1800, () => target.emit('click'));
    } else if (stage.bar) {
      button(stage.bar, "emit('click')", () => target.emit('click'));
    }
  },
});
