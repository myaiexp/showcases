// An entity does nothing until components are attached: geometry and material, then light
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

const STEPS = [
  '<a-entity>  (no appearance, no behaviour)',
  '<a-entity geometry="primitive: box" material="color: red">',
  '<a-entity geometry="primitive: box" material="color: red" light="type: point; intensity: 2.0">',
];

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="thing" position="0 1.5 -3"
                animation="property: rotation; to: 0 360 0; dur: 9000; easing: linear; loop: true"></a-entity>
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const el = stage.scene.querySelector('#thing') as Entity;
    let step = 0;

    // Each step plugs components into the same entity with setAttribute.
    const apply = (to: number): void => {
      step = to;
      if (to >= 1) {
        el.setAttribute('geometry', 'primitive: box');
        el.setAttribute('material', 'color: red');
      } else {
        el.removeAttribute('geometry');
        el.removeAttribute('material');
      }
      if (to >= 2) el.setAttribute('light', 'type: point; intensity: 2.0');
      else el.removeAttribute('light');
      stage.caption(STEPS[to]!);
    };
    apply(0);

    if (stage.preview) {
      sway(stage);
      stage.every(1600, () => apply((step + 1) % STEPS.length));
    } else if (stage.bar) {
      button(stage.bar, 'Add the next component', () => apply((step + 1) % STEPS.length));
      button(stage.bar, 'Start over', () => apply(0));
      const out = stage.readout();
      if (out) out.textContent = STEPS.join('\n');
    }
  },
});
