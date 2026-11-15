// The raw DOM attribute versus component data, with and without the debug component
import { q } from '../../shared/comp-dom.ts';
import { button, toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { fmt } from '../../shared/comp-log.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-box id="mover" position="-2 1.6 -4" color="#7BC8A4"
             animation="property: position; to: 2 1.6 -4; dur: 3000; dir: alternate; easing: easeInOutSine; loop: true"></a-box>
    </a-scene>`,
  run(stage) {
    const el = q(stage, '#mover');
    const raw = (): string => Element.prototype.getAttribute.call(el, 'position') as string;
    stage.every(200, () => {
      const text = `debug on: ${stage.scene.hasAttribute('debug')}\nDOM attribute  position="${raw()}"\ncomponent data  ${fmt(el.object3D.position)}`;
      stage.caption(`DOM position="${raw()}"`);
      const out = stage.readout();
      if (out) out.textContent = text;
    });
    if (stage.bar) {
      toggle(stage.bar, 'debug', false, (v) => (v ? stage.scene.setAttribute('debug', '') : stage.scene.removeAttribute('debug')));
      button(stage.bar, 'el.flushToDOM()', () => el.flushToDOM());
    }
    if (stage.preview) {
      stage.every(2600, (i) => (i % 2 ? stage.scene.setAttribute('debug', '') : stage.scene.removeAttribute('debug')));
    }
  },
});
