// random-color sets a random colour in init; dependencies makes sure material exists first
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { sway } from '../../shared/card.ts';
import { registerRandomColor } from '../../shared/core-voxel.ts';
import * as images from '../../shared/images.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    registerRandomColor(AFRAME);
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="v" geometry="primitive: box; depth: 0.5; height: 0.5; width: 0.5" material="shader: standard" position="0 1.2 -2" random-color
                animation="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"></a-entity>
      <a-sphere random-color radius="0.3" position="-1.2 1.2 -2"></a-sphere>
      <a-cone random-color radius-bottom="0.3" height="0.6" position="1.2 1.2 -2"></a-cone>
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const els = [...stage.scene.querySelectorAll('[random-color]')] as Entity[];
    const reroll = (): void => {
      for (const e of els) {
        e.removeAttribute('random-color');
        e.setAttribute('random-color', '');
      }
      stage.caption(els.map((e) => e.getAttribute('material').color).join('  '));
    };
    reroll();
    if (stage.preview) {
      sway(stage);
      stage.every(1500, reroll);
    } else if (stage.bar) button(stage.bar, 'Re-attach random-color', reroll);
  },
});
