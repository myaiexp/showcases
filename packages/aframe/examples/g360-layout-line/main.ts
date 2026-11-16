// A layout component lines up its children with a margin, so links no longer overlap
import { aframeExample } from '../../shared/frame.ts';
import { slider } from '../../shared/controls.ts';
import { sway } from '../../shared/card.ts';
import { photos, registerLayout, registerTemplate } from '../../shared/core-gallery.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    registerTemplate(AFRAME);
    registerLayout(AFRAME);
  },

  scene: () => {
    const p = photos();
    return `
    <a-scene>
      <a-assets>
        ${p.map((x) => `<img id="${x.id}-thumb" src="${x.thumb}">`).join('\n        ')}
      </a-assets>
      <script id="link" type="text/html">
        <a-entity class="link" geometry="primitive: plane; height: 1; width: 1" material="shader: flat; src: \${thumb}"></a-entity>
      </script>
      <a-sky color="#2a3548"></a-sky>
      <a-entity id="links" layout="type: line; margin: 1.5" position="-1.5 1.6 -4">
        <a-entity template="src: #link" data-thumb="#city-thumb"></a-entity>
        <a-entity template="src: #link" data-thumb="#cubes-thumb"></a-entity>
        <a-entity template="src: #link" data-thumb="#sechelt-thumb"></a-entity>
      </a-entity>
    </a-scene>`;
  },

  run(stage) {
    const links = stage.scene.querySelector('#links') as Entity;
    stage.caption('<a-entity id="links" layout="type: line; margin: 1.5" position="-1.5 1.6 -4">');
    if (stage.preview) {
      sway(stage);
      stage.every(1600, (i) => links.setAttribute('layout', 'margin', i % 2 ? 1.5 : 2.3));
    } else if (stage.bar) {
      slider(stage.bar, 'margin', [1, 3, 0.1], 1.5, (v) => links.setAttribute('layout', 'margin', v));
    }
  },
});
