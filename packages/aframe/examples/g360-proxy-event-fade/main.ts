// proxy-event forwards a link's click to the sky as fade, which animates to black and back
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { ghost } from '../../shared/ghost.ts';
import { photos, registerProxyEvent } from '../../shared/core-gallery.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    registerProxyEvent(AFRAME);
  },

  scene: () => {
    const p = photos();
    return `
    <a-scene cursor="rayOrigin: mouse" raycaster="objects: .link">
      <a-assets>
        <img id="city" src="${p[0]!.full}">
        <img id="city-thumb" src="${p[0]!.thumb}">
      </a-assets>
      <a-sky id="image-360" radius="10" src="#city"
        animation__fade="property: components.material.material.color; type: color; from: #FFF; to: #000; dur: 300; startEvents: fade"
        animation__fadeback="property: components.material.material.color; type: color; from: #000; to: #FFF; dur: 300; startEvents: animationcomplete__fade"></a-sky>
      <a-entity class="link" position="0 1.2 -3" geometry="primitive: plane; height: 1; width: 1" material="shader: flat; src: #city-thumb"
                proxy-event="event: click; to: #image-360; as: fade"></a-entity>
      ${board('board', '0 3.2 -5', 5, 0.9, 50)}
    </a-scene>`;
  },

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 3 });
    const sky = stage.scene.querySelector('#image-360') as Entity;
    for (const name of ['fade', 'animationcomplete__fade']) sky.addEventListener(name, () => log(`sky got ${name}`));
    stage.caption('click the link: the sky fades to black and back');
    if (stage.preview) {
      const mouse = ghost(stage);
      stage.every(2600, async () => {
        await mouse.glide(0.5, 0.58, 500);
        mouse.click();
      });
    }
  },
});
