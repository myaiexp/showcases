// A url() path and a data: URL as the value of gltf-model
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { glb } from '../../shared/models.ts';
import { toyGlb } from '../../shared/gltf/props.ts';
import { logger } from '../../shared/comp-log.ts';

/** The glb's bytes as base64, the result of the docs' `base64 -w 0 model.glb`. */
function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
}

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-entity id="inline" gltf-model="url(${glb.toy()})" position="-1.6 0.9 -3.5" scale="1.6 1.6 1.6" animation="property: rotation; to: 0 360 0; dur: 9000; easing: linear; loop: true"></a-entity>
      <a-entity id="data" gltf-model="data:model/gltf-binary;base64,${toBase64(toyGlb())}" position="1.6 0.9 -3.5" scale="1.6 1.6 1.6" animation="property: rotation; to: 0 -360 0; dur: 9000; easing: linear; loop: true"></a-entity>
      <a-text value="url(...)" position="-1.6 0 -3.5" width="3" align="center" color="#cfd8e3"></a-text>
      <a-text value="data: URL" position="1.6 0 -3.5" width="3" align="center" color="#cfd8e3"></a-text>
    </a-scene>`,
  run(stage) {
    const log = logger(stage, 4);
    for (const id of ['inline', 'data']) stage.scene.querySelector(`#${id}`)!.addEventListener('model-loaded', () => log(`model-loaded: #${id}`));
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
