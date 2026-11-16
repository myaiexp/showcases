// A template component stamps one link definition three times, filling in data-thumb
import { aframeExample } from '../../shared/frame.ts';
import { sway } from '../../shared/card.ts';
import { photos, registerTemplate } from '../../shared/core-gallery.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    registerTemplate(AFRAME);
  },

  scene: () => {
    const p = photos();
    return `
    <a-scene>
      <a-assets>
        ${p.map((x) => `<img id="${x.id}-thumb" src="${x.thumb}">`).join('\n        ')}
      </a-assets>
      <script id="link" type="text/html">
        <a-entity class="link"
          geometry="primitive: plane; height: 1; width: 1"
          material="shader: flat; src: \${thumb}"></a-entity>
      </script>
      <a-sky color="#2a3548"></a-sky>
      <!-- Pass image sources to the template; without a layout they overlap at the origin. -->
      <a-entity template="src: #link" data-thumb="#city-thumb" position="-1.5 1.6 -3"></a-entity>
      <a-entity template="src: #link" data-thumb="#cubes-thumb" position="0 1.6 -3"></a-entity>
      <a-entity template="src: #link" data-thumb="#sechelt-thumb" position="1.5 1.6 -3"></a-entity>
    </a-scene>`;
  },

  run(stage) {
    stage.caption('<a-entity template="src: #link" data-thumb="#cubes-thumb">');
    if (stage.preview) sway(stage);
  },
});
