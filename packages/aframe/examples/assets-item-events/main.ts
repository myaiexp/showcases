// a-asset-item emits progress, loaded and error as its file is fetched
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog, itemsLoaded } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

import { glb } from '../../shared/models.ts';

const lines: string[] = [];

export default aframeExample(import.meta.url, {
  setup() {
    // Asset events fire before run(), so keep them from here.
    for (const name of ['progress', 'loaded', 'error']) {
      document.addEventListener(name, (evt) => {
        const el = evt.target as HTMLElement;
        if (el.tagName !== 'A-ASSET-ITEM') return;
        const d = (evt as CustomEvent<{ loadedBytes?: number; totalBytes?: number }>).detail;
        lines.push(name === 'progress' ? `#${el.id} progress: ${d.loadedBytes} of ${d.totalBytes} bytes` : `#${el.id} ${name}`);
      }, true);
    }
  },

  scene: () => {
    // A blob that is revoked at once cannot be fetched: the error event.
    const dead = URL.createObjectURL(new Blob(['x']));
    URL.revokeObjectURL(dead);
    return `
    <a-scene background="color: #0d1420">
      <a-assets>
        <a-asset-item id="tree" response-type="arraybuffer" src="${glb.tree()}"></a-asset-item>
        <a-asset-item id="missing" src="${dead}"></a-asset-item>
      </a-assets>
      <a-entity gltf-model="#tree" position="0 0 -3"></a-entity>
      ${board('board', '0 3.6 -4', 6.4, 1.6, 64)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`;
  },

  async run(stage) {
    await itemsLoaded(stage.scene);
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 6 });
    for (const l of lines) log(l);
    log(`#tree data: ${(document.querySelector('#tree') as unknown as { data: ArrayBuffer }).data.byteLength} bytes`);
    stage.caption('<a-asset-item> events: progress, loaded, error');
    if (stage.preview) sway(stage);
  },
});
