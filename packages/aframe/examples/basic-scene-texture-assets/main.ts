// Using the asset management system: an img in a-assets, referenced with src="#boxTexture"
import { aframeExample } from '../../shared/frame.ts';
import { sway } from '../../shared/card.ts';

import * as images from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene>
      <a-assets>
        <img id="boxTexture" src="${images.bricks()}">
      </a-assets>
      <a-box src="#boxTexture" position="-2 2 -5" rotation="0 45 45" scale="2 2 2"></a-box>
      <a-box src="#boxTexture" position="2.4 1 -4" color="#ffc65d"></a-box>
      <a-sky color="#222"></a-sky>
    </a-scene>`,

  run(stage) {
    stage.caption('one <img> in <a-assets>, used by two boxes (the second tints it with color)');
    if (stage.preview) sway(stage);
  },
});
