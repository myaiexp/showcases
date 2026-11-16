// a-sky as a flat colour or a 360-degree image around the scene
import { aframeExample } from '../../shared/frame.ts';
import { select } from '../../shared/controls.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

import * as images from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene>
      <a-assets>
        <img id="boxTexture" src="${images.bricks()}">
        <img id="skyTexture" src="${images.panorama()}">
      </a-assets>
      <a-box src="#boxTexture" position="0 2 -5" rotation="0 45 45" scale="2 2 2"></a-box>
      <a-sky id="sky" color="#222"></a-sky>
    </a-scene>`,

  run(stage) {
    const sky = stage.scene.querySelector('#sky') as Entity;
    const set = (kind: string): void => {
      if (kind === 'src: #skyTexture') {
        sky.removeAttribute('color');
        sky.setAttribute('src', '#skyTexture');
      } else {
        sky.removeAttribute('src');
        sky.setAttribute('color', '#222');
      }
      stage.caption(kind === 'src: #skyTexture' ? '<a-sky src="#skyTexture">' : '<a-sky color="#222">');
    };
    set('color');
    if (stage.preview) {
      sway(stage, { yaw: 40 });
      stage.every(2500, (i) => set(i % 2 ? 'src: #skyTexture' : 'color'));
    } else if (stage.bar) {
      select(stage.bar, 'a-sky', ['color', 'src: #skyTexture'], 'color', set);
    }
  },
});
