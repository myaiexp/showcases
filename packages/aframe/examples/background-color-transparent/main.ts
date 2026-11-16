// background="color: …" and background="transparent: true"
import { color, toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  setup() {
    // The page behind the canvas: only visible when the background is transparent.
    document.body.style.background = 'linear-gradient(135deg, #ff9a5e, #6a5eff 60%, #5eead4)';
  },
  scene: `
    <a-scene background="color: #223344">
      <a-torus-knot position="0 1.6 -3.5" geometry="radius: 0.7; radiusTubular: 0.18" color="#ffffff"
                    animation="property: rotation; to: 0 360 0; dur: 9000; easing: linear; loop: true"></a-torus-knot>
    </a-scene>`,
  run(stage) {
    const show = (): void => {
      const b = stage.scene.getAttribute('background');
      stage.caption(`background: color ${b.color}, transparent ${b.transparent}`);
    };
    show();
    if (stage.bar) {
      color(stage.bar, 'color', '#223344', (r, g, b) => {
        const hex = '#' + [r, g, b].map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
        stage.scene.setAttribute('background', 'color', hex);
        show();
      });
      toggle(stage.bar, 'transparent', false, (v) => (stage.scene.setAttribute('background', 'transparent', v), show()));
    }
    if (stage.preview) stage.every(1800, (i) => (stage.scene.setAttribute('background', 'transparent', i % 2 === 1), show()));
  },
});
