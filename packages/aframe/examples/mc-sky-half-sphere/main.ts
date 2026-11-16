// a-sky with theta-length 90 and radius 30 chops the sphere in half to match the ground
import { aframeExample } from '../../shared/frame.ts';
import { slider } from '../../shared/controls.ts';
import { sway } from '../../shared/card.ts';
import * as images from '../../shared/images.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene>
      <a-assets>
        <img id="groundTexture" src="${images.grid(8, '#2a3a2a', '#9fd09f')}">
        <img id="skyTexture" src="${images.panorama({ ground: '#bcd6ea', hills: null })}">
      </a-assets>
      <a-cylinder id="ground" src="#groundTexture" radius="30" height="0.1"></a-cylinder>
      <a-sky id="background" src="#skyTexture" theta-length="90" radius="30"></a-sky>
    </a-scene>`,

  run(stage) {
    const sky = stage.scene.querySelector('#background') as Entity;
    stage.caption('<a-sky src="#skyTexture" theta-length="90" radius="30">');
    if (stage.preview) sway(stage, { yaw: 60, seconds: 12 });
    else if (stage.bar) slider(stage.bar, 'theta-length', [30, 180, 5], 90, (v) => sky.setAttribute('theta-length', v));
  },
});
