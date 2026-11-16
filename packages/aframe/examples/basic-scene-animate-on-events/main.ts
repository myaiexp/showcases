// animation with startEvents: scale on mouseenter and mouseleave, a spin on click
import { aframeExample } from '../../shared/frame.ts';
import { ghost } from '../../shared/ghost.ts';

import * as images from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene cursor="rayOrigin: mouse">
      <a-assets><img id="boxTexture" src="${images.bricks()}"></a-assets>
      <a-box src="#boxTexture" position="0 2 -5" rotation="0 45 45" scale="2 2 2"
             animation__position="property: object3D.position.y; to: 2.2; dir: alternate; dur: 2000; loop: true"
             animation__mouseenter="property: scale; to: 2.3 2.3 2.3; dur: 300; startEvents: mouseenter"
             animation__mouseleave="property: scale; to: 2 2 2; dur: 300; startEvents: mouseleave"
             animation__click="property: rotation; from: 0 45 45; to: 0 405 45; dur: 1000; startEvents: click"></a-box>
      <a-plane rotation="-90 0 0" width="30" height="30" color="#445566"></a-plane>
      <a-sky color="#222"></a-sky>
    </a-scene>`,

  run(stage) {
    stage.caption('hover to grow, click to spin');
    if (stage.preview) {
      const mouse = ghost(stage);
      const steps: [number, number, boolean][] = [[0.5, 0.45, false], [0.5, 0.45, true], [0.1, 0.1, false]];
      stage.every(1500, async (i) => {
        const [x, y, click] = steps[i % steps.length]!;
        await mouse.glide(x, y, 500);
        if (click) mouse.click();
      });
    }
  },
});
