// Background noise with an audio element and a positional a-sound, both generated in code
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import type { Entity } from '../../shared/types.ts';

import { rumbleUrl } from '../../shared/core-audio.ts';
import * as images from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene>
      <a-assets>
        <audio id="noise" src="${rumbleUrl()}" autoplay preload></audio>
        <img id="boxTexture" src="${images.bricks()}">
      </a-assets>
      <a-box src="#boxTexture" position="0 2 -5" rotation="0 45 45" scale="2 2 2"></a-box>
      <a-sound id="source" src="#noise" autoplay="true" loop="true" position="-3 1 -4"></a-sound>
      <a-sphere position="-3 1 -4" radius="0.3" color="#ef2d5e"></a-sphere>
      <a-plane rotation="-90 0 0" width="30" height="30" color="#445566"></a-plane>
      <a-sky color="#222"></a-sky>
    </a-scene>`,

  run(stage) {
    stage.caption('click the page, then walk toward the red sphere: the sound gets louder');
    const sound = (stage.scene.querySelector('#source') as Entity).components.sound;
    if (stage.bar) {
      button(stage.bar, 'Play the positional sound', () => sound?.playSound());
      button(stage.bar, 'Stop it', () => sound?.stopSound());
    }
  },
});
