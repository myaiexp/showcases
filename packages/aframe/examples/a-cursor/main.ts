// <a-cursor> in the camera: a gaze ring that clicks by fusing on a target
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    // Swap colours on each click, whether it came from the mouse or from fusing.
    AFRAME.registerComponent('swap-on-click', {
      init() {
        let on = false;
        this.el.addEventListener('click', () => {
          on = !on;
          this.el.setAttribute('color', on ? '#EF2D5E' : '#4CC3D9');
        });
      },
    });
  },

  scene: `
    <a-scene background="color: #121a24">
      <a-camera>
        <!-- fuse: staring at an entity for fuse-timeout ms clicks it. objects limits what the ray tests. -->
        <a-cursor fuse="true" fuse-timeout="900" objects=".target" color="#FFF"
                  animation__fusing="property: scale; startEvents: fusing; from: 1 1 1; to: 0.3 0.3 0.3; dur: 900"
                  animation__leave="property: scale; startEvents: mouseleave, click; to: 1 1 1; dur: 150"></a-cursor>
      </a-camera>
      <a-box class="target" swap-on-click color="#4CC3D9" position="-1.4 1.6 -3"></a-box>
      <a-sphere class="target" swap-on-click color="#4CC3D9" radius="0.5" position="0 1.6 -3"></a-sphere>
      <a-cylinder class="target" swap-on-click color="#4CC3D9" radius="0.4" position="1.4 1.6 -3"></a-cylinder>
      <!-- Not in objects: the cursor passes over it. -->
      <a-box color="#555" position="0 0.2 -3" width="4" height="0.2"></a-box>
    </a-scene>`,

  run(stage) {
    // The gaze sweeps across the three targets; each fuses while the ring is on it.
    if (stage.preview) sway(stage, { yaw: 28, seconds: 10 });
    stage.caption(stage.preview ? 'The gaze fuses on each target in turn' : 'Look at a shape and hold still');
  },
});
