// The animation component bobbing a box: property, to, dir, dur and loop
import { aframeExample } from '../../shared/frame.ts';
import { slider } from '../../shared/controls.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

import * as images from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene>
      <a-assets><img id="boxTexture" src="${images.bricks()}"></a-assets>
      <a-box id="box" src="#boxTexture" position="0 2 -5" rotation="0 45 45" scale="2 2 2"
             animation="property: object3D.position.y; to: 2.2; dir: alternate; dur: 2000; loop: true"></a-box>
      <a-plane rotation="-90 0 0" width="30" height="30" color="#445566"></a-plane>
      <a-sky color="#222"></a-sky>
    </a-scene>`,

  run(stage) {
    const box = stage.scene.querySelector('#box') as Entity;
    stage.caption('animation="property: object3D.position.y; to: 2.2; dir: alternate; dur: 2000; loop: true"');
    if (stage.preview) sway(stage);
    else if (stage.bar) {
      slider(stage.bar, 'to (y)', [2, 4, 0.1], 2.2, (v) => box.setAttribute('animation', 'to', v));
      slider(stage.bar, 'dur (ms)', [300, 4000, 100], 2000, (v) => box.setAttribute('animation', 'dur', v));
    }
  },
});
