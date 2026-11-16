// A snap component pulls an entity onto a grid: one box glides, its twin steps in half-metre jumps
import { aframeExample } from '../../shared/frame.ts';
import { slider } from '../../shared/controls.ts';
import { sway } from '../../shared/card.ts';
import { registerSnap } from '../../shared/core-voxel.ts';
import * as images from '../../shared/images.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    registerSnap(AFRAME);
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-box color="#4CC3D9" width="0.5" height="0.5" depth="0.5" position="-2.4 1.25 -3.5" opacity="0.5" transparent="true"
             animation="property: position; to: 2.4 1.25 -3.5; dir: alternate; dur: 4000; easing: linear; loop: true"></a-box>
      <a-box id="snapped" color="#ef2d5e" width="0.5" height="0.5" depth="0.5" position="-2.4 0.25 -3.5"
             snap="offset: 0.25 0.25 0.25; snap: 0.5 0.5 0.5"
             animation="property: position; to: 2.4 0.25 -3.5; dir: alternate; dur: 4000; easing: linear; loop: true"></a-box>
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const snapped = stage.scene.querySelector('#snapped') as Entity;
    stage.caption('top: free movement; bottom: snap="offset: 0.25 0.25 0.25; snap: 0.5 0.5 0.5"');
    if (stage.preview) sway(stage);
    else if (stage.bar) {
      slider(stage.bar, 'snap spacing', [0.1, 1, 0.1], 0.5, (v) => snapped.setAttribute('snap', { snap: `${v} ${v} ${v}`, offset: `${v / 2} ${v / 2} ${v / 2}` }));
    }
  },
});
