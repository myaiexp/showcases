// a-asset-item returns text unless response-type asks for an arraybuffer
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog, itemsLoaded } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

import { glb, obj } from '../../shared/models.ts';

export default aframeExample(import.meta.url, {
  scene: () => {
    const toy = glb.toy();
    return `
    <a-scene background="color: #0d1420">
      <a-assets>
        <a-asset-item id="gem" src="${obj.gem()}"></a-asset-item>
        <a-asset-item id="glb-text" src="${toy}"></a-asset-item>
        <a-asset-item id="glb-buffer" response-type="arraybuffer" src="${toy}"></a-asset-item>
      </a-assets>
      <a-entity gltf-model="#glb-buffer" position="0 0 -3" animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true"></a-entity>
      ${board('board', '0 3.6 -4', 7, 1.8, 70)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`;
  },

  async run(stage) {
    await itemsLoaded(stage.scene);
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const data = (id: string): unknown => (document.querySelector('#' + id) as unknown as { data: unknown }).data;
    const describe = (id: string, note: string): string => {
      const d = data(id);
      if (d == null) return `#${id}: data is ${d}, hasLoaded ${(document.querySelector('#' + id) as Entity).hasLoaded}`;
      return `#${id}: ${d instanceof ArrayBuffer ? `ArrayBuffer, ${d.byteLength} bytes` : `${typeof d}, ${(d as string).length} chars`}  (${note})`;
    };
    log.show([describe('gem', 'no response-type: text'), describe('glb-text', 'binary read as text'), describe('glb-buffer', 'response-type="arraybuffer"')].join('\n'));
    stage.caption('response-type="arraybuffer"');
    if (stage.preview) sway(stage);
  },
});
