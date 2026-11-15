// A-Frame's injected default lights, and the two ways they go away
import { sway } from '../../shared/card.ts';
import { qa } from '../../shared/comp-dom.ts';
import { button } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-sphere position="-1.2 1.6 -3" color="#4CC3D9"></a-sphere>
      <a-box position="1.2 1.6 -3" color="#EF2D5E" animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true"></a-box>
    </a-scene>`,
  run(stage) {
    const report = (): void => {
      const text = `default lights in the DOM: ${qa(stage, '[data-aframe-default-light]').length}   (light elements: ${qa(stage, '[light]').length})`;
      stage.caption(text);
      const out = stage.readout();
      if (out) out.textContent = text;
    };
    stage.every(300, report);
    if (stage.preview) {
      sway(stage, { yaw: 8 });
      stage.every(2600, (i) => stage.scene.setAttribute('light', 'defaultLightsEnabled', i % 2 === 0));
      return;
    }
    let enabled = true;
    button(stage.bar!, 'defaultLightsEnabled: toggle', () => stage.scene.setAttribute('light', 'defaultLightsEnabled', (enabled = !enabled)));
    button(stage.bar!, 'add a point light', () => {
      const el = document.createElement('a-entity');
      el.setAttribute('light', 'type: point; color: #ffd9a0; intensity: 1.2; distance: 12');
      el.setAttribute('position', '0 3 -1');
      stage.scene.append(el);
    });
  },
});
