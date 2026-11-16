// Primitives are entities underneath: extra components attach to them by attribute
import { aframeExample } from '../../shared/frame.ts';
import { sway } from '../../shared/card.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    // A tiny stand-in for a physics component: falls and bounces on the ground.
    AFRAME.registerComponent<{ bounce: number }>('dynamic-body', {
      schema: { bounce: { default: 0.75 } },
      init() {
        this.vy = 0;
        this.rest = this.el.object3D.position.y;
      },
      tick(_t, dt) {
        const p = this.el.object3D.position;
        this.vy -= 9.8 * Math.min(dt, 50) / 1000;
        p.y += this.vy * Math.min(dt, 50) / 1000;
        if (p.y < 0.5) {
          p.y = 0.5;
          this.vy = Math.abs(this.vy) * this.data.bounce;
          if (this.vy < 0.5) this.vy = 6;
        }
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-box dynamic-body color="#4CC3D9" position="-1 4 -3" rotation="0 45 0"></a-box>
      <a-sphere dynamic-body="bounce: 0.9" radius="0.5" color="#ef2d5e" position="1 5 -3.5"></a-sphere>
      <a-plane position="0 0 -4" rotation="-90 0 0" width="6" height="6" color="#7BC8A4"></a-plane>
    </a-scene>`,

  run(stage) {
    stage.caption('<a-box dynamic-body>: a component on a primitive');
    if (stage.preview) sway(stage);
  },
});
