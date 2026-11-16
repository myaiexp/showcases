// A component handles mouseenter and mouseleave in JavaScript, the by-hand version of event-set
import { aframeExample } from '../../shared/frame.ts';
import { ghost } from '../../shared/ghost.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent<{ color: string }>('change-color-on-hover', {
      schema: {
        color: { default: 'red' },
      },
      init() {
        const data = this.data;
        const el = this.el; // <a-box>
        const defaultColor = el.getAttribute('material').color;
        el.addEventListener('mouseenter', () => {
          el.setAttribute('color', data.color);
        });
        el.addEventListener('mouseleave', () => {
          el.setAttribute('color', defaultColor);
        });
      },
    });
  },

  scene: `
    <a-scene cursor="rayOrigin: mouse" raycaster="objects: [change-color-on-hover]" background="color: #0d1420">
      <a-box color="#EF2D5E" position="-1.5 1.4 -4" change-color-on-hover="color: blue"></a-box>
      <a-box color="#4CC3D9" position="1.5 1.4 -4" change-color-on-hover="color: #ffc65d"></a-box>
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    stage.caption('mouseenter / mouseleave from the cursor component');
    if (stage.preview) {
      const mouse = ghost(stage);
      stage.every(1200, (i) => mouse.glide(i % 3 === 0 ? 0.3 : i % 3 === 1 ? 0.7 : 0.5, i % 3 === 2 ? 0.05 : 0.5, 500));
    }
  },
});
