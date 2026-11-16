// A ground from a-plane rotated -90 degrees, made large, textured and tiled with repeat
import { aframeExample } from '../../shared/frame.ts';
import { slider } from '../../shared/controls.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

import * as images from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene>
      <a-assets>
        <img id="groundTexture" src="${images.grid(8)}">
        <img id="boxTexture" src="${images.bricks()}">
      </a-assets>
      <a-box src="#boxTexture" position="0 2 -5" rotation="0 45 45" scale="2 2 2"></a-box>
      <a-plane id="ground" src="#groundTexture" rotation="-90 0 0" width="30" height="30" repeat="10 10"></a-plane>
      <a-sky color="#223344"></a-sky>
    </a-scene>`,

  run(stage) {
    const ground = stage.scene.querySelector('#ground') as Entity;
    const set = (n: number): void => {
      ground.setAttribute('repeat', `${n} ${n}`);
      stage.caption(`rotation="-90 0 0" width="30" height="30" repeat="${n} ${n}"`);
    };
    set(10);
    if (stage.preview) {
      sway(stage, { yaw: 25 });
      stage.every(1800, (i) => set([10, 3, 20, 6][i % 4]!));
    } else if (stage.bar) {
      slider(stage.bar, 'repeat', [1, 30, 1], 10, set);
    }
  },
});
