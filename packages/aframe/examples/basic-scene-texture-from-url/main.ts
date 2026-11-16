// An image texture on a box with src, straight from a URL-like value
import { aframeExample } from '../../shared/frame.ts';
import { sway } from '../../shared/card.ts';

import * as images from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  // The docs use a URL; offline, the same attribute takes a painted data: URL.
  scene: () => `
    <a-scene>
      <a-box src="${images.bricks()}" position="0 2 -5" rotation="0 45 45" scale="2 2 2"></a-box>
      <a-sky color="#222"></a-sky>
    </a-scene>`,

  run(stage) {
    stage.caption('<a-box src="…image…">: no color, so the texture shows as it is');
    if (stage.preview) sway(stage);
  },
});
