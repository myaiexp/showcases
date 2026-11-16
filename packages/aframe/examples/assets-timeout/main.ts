// The scene waits for blocking assets until a-assets' timeout, then starts without them
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

const seen: string[] = [];

export default aframeExample(import.meta.url, {
  setup() {
    // Assets load before run(): catch the a-assets events from the document.
    const t0 = performance.now();
    for (const name of ['timeout', 'loaded']) {
      document.addEventListener(name, (evt) => {
        if ((evt.target as HTMLElement).tagName === 'A-ASSETS') seen.push(`a-assets ${name} after ${Math.round(performance.now() - t0)} ms`);
      }, true);
    }
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-assets timeout="1500">
        <!-- preload="auto" makes the scene wait for it; with no source it never finishes loading. -->
        <video id="slow" preload="auto"></video>
      </a-assets>
      <a-box color="#4CC3D9" position="0 1.4 -3" animation="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"></a-box>
      ${board('board', '0 3.5 -4', 6.4, 1.4, 64)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const assets = stage.scene.querySelector('a-assets') as Entity;
    log.show([...seen, `assets.hasLoaded: ${assets.hasLoaded}, scene.hasLoaded: ${stage.scene.hasLoaded}`, 'The scene began after 1500 ms though #slow never loaded.'].join('\n'));
    stage.caption('<a-assets timeout="1500">');
    if (stage.preview) sway(stage);
  },
});
