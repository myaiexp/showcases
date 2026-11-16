// Assets are fetched once: a-assets.fileLoader and THREE.Cache hold the responses
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog, itemsLoaded } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

import { glb } from '../../shared/models.ts';

let url = '';

export default aframeExample(import.meta.url, {
  scene: () => {
    url = glb.lantern();
    return `
    <a-scene background="color: #0d1420">
      <a-assets>
        <a-asset-item id="lantern" response-type="arraybuffer" src="${url}"></a-asset-item>
      </a-assets>
      <a-entity gltf-model="#lantern" position="0 1 -3" animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true"></a-entity>
      ${board('board', '0 3.6 -4', 7, 1.8, 70)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`;
  },

  async run(stage) {
    await itemsLoaded(stage.scene);
    const { THREE } = stage.AFRAME;
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const assets = stage.scene.querySelector('a-assets') as unknown as { fileLoader: unknown };
    const cache = THREE.Cache as unknown as { enabled: boolean; files: Record<string, unknown>; get(k: string): unknown };
    const show = (): void =>
      log.show(
        [
          `a-assets.fileLoader is a ${assets.fileLoader instanceof THREE.FileLoader ? 'THREE.FileLoader' : 'something else'}`,
          `THREE.Cache.enabled: ${cache.enabled}, entries: ${Object.keys(cache.files).length}`,
          `THREE.Cache.get('file:' + url) is a ${cache.get(`file:${url}`)?.constructor?.name ?? 'miss'}`,
        ].join('\n'),
      );
    show();
    stage.caption('document.querySelector("a-assets").fileLoader, THREE.Cache');
    if (stage.preview) sway(stage);
  },
});
