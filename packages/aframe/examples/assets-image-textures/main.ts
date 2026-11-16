// Images preloaded in a-assets, referenced by id from several entities
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

import * as images from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #0d1420">
      <a-assets>
        <img id="bricks" src="${images.bricks()}">
        <img id="checker" src="${images.checker(6)}">
        <img id="noise" src="${images.noise(4)}">
      </a-assets>
      <a-box src="#bricks" position="-2 1.2 -3.5"></a-box>
      <a-sphere src="#checker" radius="0.7" position="0 1.2 -3.5"></a-sphere>
      <a-cylinder src="#noise" radius="0.6" height="1.4" position="2 1.2 -3.5"></a-cylinder>
      <a-plane src="#checker" repeat="4 4" rotation="-90 0 0" width="10" height="10" position="0 0 -3.5"></a-plane>
      ${board('board', '0 3.5 -4.5', 6.4, 1, 64)}
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const assets = stage.scene.querySelector('a-assets') as Entity;
    const imgs = [...assets.querySelectorAll('img')] as unknown as HTMLImageElement[];
    log.show(`a-assets hasLoaded: ${assets.hasLoaded}\n` + imgs.map((i) => `#${i.id}: ${i.naturalWidth}x${i.naturalHeight}, complete ${i.complete}`).join('\n') + '\nchecker is used by two entities, loaded once');
    stage.caption('<img id="bricks"> in <a-assets>, then src="#bricks"');
    if (stage.preview) {
      sway(stage);
      stage.every(1000, (i) => (stage.scene.querySelector('a-box') as Entity).object3D.rotation.set(0, i * 0.5, 0));
    }
  },
});
