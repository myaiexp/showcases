// Links scale up on mouseenter, back on mouseleave and down while clicked, with event-set instances
import { aframeExample } from '../../shared/frame.ts';
import { ghost } from '../../shared/ghost.ts';
import { registerEventSet } from '../../shared/core-event-set.ts';
import { photos, registerLayout, registerTemplate } from '../../shared/core-gallery.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    registerTemplate(AFRAME);
    registerLayout(AFRAME);
    registerEventSet(AFRAME);
  },

  scene: () => {
    const p = photos();
    return `
    <a-scene cursor="rayOrigin: mouse" raycaster="objects: .link">
      <a-assets>
        ${p.map((x) => `<img id="${x.id}-thumb" src="${x.thumb}">`).join('\n        ')}
      </a-assets>
      <script id="link" type="text/html">
        <a-entity class="link" geometry="primitive: plane; height: 1; width: 1" material="shader: flat; src: \${thumb}"
          event-set__mouseenter="scale: 1.2 1.2 1"
          event-set__mouseleave="scale: 1 1 1"
          event-set__mousedown="scale: 0.9 0.9 1"
          event-set__mouseup="scale: 1.2 1.2 1"></a-entity>
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
    stage.caption('hover and press the links');
    if (stage.preview) {
      const mouse = ghost(stage);
      const xs = [0.3, 0.5, 0.7];
      stage.every(1200, async (i) => {
        await mouse.glide(xs[i % 3]!, 0.46, 500);
        if (i % 3 === 1) {
          mouse.click();
        }
      });
    }
  },
});
