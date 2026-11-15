// model-loaded and model-error from gltf-model
import { q } from '../../shared/comp-dom.ts';
import { button } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { toyGlb } from '../../shared/gltf/props.ts';
import { logger } from '../../shared/comp-log.ts';

function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
}

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-entity id="good" gltf-model="data:model/gltf-binary;base64,${toBase64(toyGlb())}" position="-1.6 0.9 -3.5" scale="1.6 1.6 1.6" animation="property: rotation; to: 0 360 0; dur: 9000; easing: linear; loop: true"></a-entity>
      <a-entity id="broken" gltf-model="data:model/gltf-binary;base64,AAAAAAAAAAAAAAAA" position="1.6 0.9 -3.5" scale="1.6 1.6 1.6"></a-entity>
      <a-text value="valid glb" position="-1.6 0 -3.5" width="3" align="center" color="#7BC8A4"></a-text>
      <a-text value="not a glb" position="1.6 0 -3.5" width="3" align="center" color="#EF2D5E"></a-text>
    </a-scene>`,
  run(stage) {
    const log = logger(stage, 5);
    for (const id of ['good', 'broken']) {
      const el = q(stage, `#${id}`);
      el.addEventListener('model-loaded', () => log(`model-loaded on #${id}`));
      el.addEventListener('model-error', () => log(`model-error on #${id}`));
    }
    if (stage.bar) button(stage.bar, 'give #broken the good model', () => q(stage, '#broken').setAttribute('gltf-model', q(stage, '#good').getAttribute('gltf-model')));
  },
});
