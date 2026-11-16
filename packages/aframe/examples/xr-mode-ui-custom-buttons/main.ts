// xr-mode-ui: what the component builds or adopts for the Enter VR / Enter AR buttons
import { select, toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene xr-mode-ui="enterVRButton: #myEnterVRButton; enterARButton: #myEnterARButton; XRMode: xr;" background="color: #10151c">
      <!-- Style the button with images and/or custom CSS. -->
      <a id="myEnterVRButton" href="#" style="position: absolute; right: 12px; bottom: 12px; padding: 6px 12px; background: #4CC3D9; color: #111; font: 13px system-ui; border-radius: 4px; text-decoration: none;">my VR button</a>
      <a id="myEnterARButton" href="#" style="position: absolute; right: 12px; bottom: 48px; padding: 6px 12px; background: #FFC65D; color: #111; font: 13px system-ui; border-radius: 4px; text-decoration: none;">my AR button</a>
      <a-torus-knot position="0 1.6 -3" geometry="radius: 0.6; radiusTubular: 0.16" color="#c58bff"
                    animation="property: rotation; to: 0 360 0; dur: 9000; easing: linear; loop: true"></a-torus-knot>
    </a-scene>`,
  run(stage) {
    const report = (): void => {
      const d = stage.scene.getAttribute('xr-mode-ui');
      const doc = stage.scene.ownerDocument;
      const state = (sel: string): string => {
        const el = doc.querySelector(sel);
        return el ? (getComputedStyle(el).display === 'none' ? 'in the page, hidden (mode unsupported here)' : 'visible') : 'not present';
      };
      const text = `XRMode: ${d.XRMode}   enabled: ${d.enabled}\nmy VR button: ${state('#myEnterVRButton')}\nmy AR button: ${state('#myEnterARButton')}\ndefault buttons built: ${doc.querySelectorAll('.a-enter-vr, .a-enter-ar').length}`;
      stage.caption(`XRMode: ${d.XRMode}, enabled: ${d.enabled}`);
      const out = stage.readout();
      if (out) out.textContent = text;
    };
    stage.every(300, report);
    if (stage.bar) {
      select(stage.bar, 'XRMode', ['vr', 'ar', 'xr'] as const, 'xr', (v) => stage.scene.setAttribute('xr-mode-ui', 'XRMode', v));
      toggle(stage.bar, 'enabled', true, (v) => stage.scene.setAttribute('xr-mode-ui', 'enabled', v));
    }
  },
});
