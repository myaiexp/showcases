// The finished 360 gallery: click a link, the sky fades to black, swaps its image and fades back
import { aframeExample } from '../../shared/frame.ts';
import { ghost } from '../../shared/ghost.ts';
import { registerEventSet } from '../../shared/core-event-set.ts';
import { photos, registerLayout, registerProxyEvent, registerTemplate } from '../../shared/core-gallery.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    registerTemplate(AFRAME);
    registerLayout(AFRAME);
    registerEventSet(AFRAME);
    registerProxyEvent(AFRAME);
  },

  scene: () => {
    const p = photos();
    return `
    <a-scene cursor="rayOrigin: mouse" raycaster="objects: .link">
      <a-assets>
        ${p.map((x) => `<img id="${x.id}" src="${x.full}">\n        <img id="${x.id}-thumb" src="${x.thumb}">`).join('\n        ')}
      </a-assets>
      <script id="link" type="text/html">
        <a-entity class="link"
          geometry="primitive: plane; height: 1; width: 1"
          material="shader: flat; src: \${thumb}"
          event-set__mouseenter="scale: 1.2 1.2 1"
          event-set__mouseleave="scale: 1 1 1"
          event-set__click="_target: #image-360; _delay: 300; material.src: \${src}"
          proxy-event="event: click; to: #image-360; as: fade"></a-entity>
      </script>
      <a-sky id="image-360" radius="10" src="#city"
        animation__fade="property: components.material.material.color; type: color; from: #FFF; to: #000; dur: 300; startEvents: fade"
        animation__fadeback="property: components.material.material.color; type: color; from: #000; to: #FFF; dur: 300; startEvents: animationcomplete__fade"></a-sky>
      <a-entity id="links" layout="type: line; margin: 1.5" position="-1.5 -1 -4">
        <a-entity template="src: #link" data-src="#city" data-thumb="#city-thumb"></a-entity>
        <a-entity template="src: #link" data-src="#cubes" data-thumb="#cubes-thumb"></a-entity>
        <a-entity template="src: #link" data-src="#sechelt" data-thumb="#sechelt-thumb"></a-entity>
      </a-entity>
    </a-scene>`;
  },

  run(stage) {
    stage.caption('click a thumbnail to change the 360 image');
    if (stage.preview) {
      const mouse = ghost(stage);
      const xs = [0.62, 0.5, 0.38];
      stage.every(2400, async (i) => {
        await mouse.glide(xs[i % 3]!, 0.62, 500);
        mouse.click();
      });
    }
  },
});
