// A thin cylinder as ground, textured through a-assets, so the raycaster has something to hit
import { aframeExample } from '../../shared/frame.ts';
import { sway } from '../../shared/card.ts';
import * as images from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene>
      <a-assets>
        <img id="groundTexture" src="${images.grid(8, '#2a3a2a', '#9fd09f')}">
      </a-assets>
      <a-cylinder id="ground" src="#groundTexture" radius="32" height="0.1"></a-cylinder>
      <a-sky color="#223344"></a-sky>
    </a-scene>`,

  run(stage) {
    stage.caption('<a-cylinder id="ground" src="#groundTexture" radius="32" height="0.1">');
    if (stage.preview) sway(stage, { yaw: 50, pitch: 4, seconds: 12 });
  },
});
