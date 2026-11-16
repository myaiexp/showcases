// Building a link from standard components: an empty entity, then geometry, then a flat material
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { sway } from '../../shared/card.ts';
import { photos } from '../../shared/core-gallery.ts';
import type { Entity } from '../../shared/types.ts';

const STEPS = [
  '<a-entity class="link"></a-entity>   (renders nothing)',
  '<a-entity class="link" geometry="primitive: plane; height: 1; width: 1">',
  '<a-entity class="link" geometry="primitive: plane; height: 1; width: 1" material="shader: flat; src: #cubes-thumb">',
];

export default aframeExample(import.meta.url, {
  scene: () => {
    const p = photos();
    return `
    <a-scene>
      <a-assets>
        ${p.map((x) => `<img id="${x.id}-thumb" src="${x.thumb}">`).join('\n        ')}
      </a-assets>
      <a-sky color="#2a3548"></a-sky>
      <a-entity id="link" class="link" position="0 1.6 -3"></a-entity>
    </a-scene>`;
  },

  run(stage) {
    const link = stage.scene.querySelector('#link') as Entity;
    let step = 0;
    const apply = (i: number): void => {
      step = i;
      if (i >= 1) link.setAttribute('geometry', 'primitive: plane; height: 1; width: 1');
      else link.removeAttribute('geometry');
      if (i >= 2) link.setAttribute('material', 'shader: flat; src: #cubes-thumb');
      else link.removeAttribute('material');
      stage.caption(STEPS[i]!);
      const out = stage.readout();
      if (out) out.textContent = STEPS.join('\n') + `\n\nshowing step ${i + 1}`;
    };
    apply(0);
    if (stage.preview) {
      sway(stage);
      stage.every(1700, () => apply((step + 1) % STEPS.length));
    } else if (stage.bar) {
      button(stage.bar, 'Add the next component', () => apply((step + 1) % STEPS.length));
      button(stage.bar, 'Start over', () => apply(0));
    }
  },
});
