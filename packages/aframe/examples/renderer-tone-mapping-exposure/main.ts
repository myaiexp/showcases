// renderer="toneMapping: …; exposure: …" changes how bright colours are compressed
import { sway } from '../../shared/card.ts';
import { select, slider } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

const mappings = ['no', 'ACESFilmic', 'linear', 'reinhard', 'cineon', 'AgX', 'neutral'] as const;

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c" renderer="toneMapping: ACESFilmic; exposure: 1.4">
      <a-entity light="type: ambient; intensity: 1"></a-entity>
      <a-entity light="type: directional; intensity: 2.4" position="-1 3 2"></a-entity>
      <a-sphere position="-2.4 1.6 -4" radius="0.7" color="#ff2a2a"></a-sphere>
      <a-sphere position="-0.8 1.6 -4" radius="0.7" color="#2aff4a"></a-sphere>
      <a-sphere position="0.8 1.6 -4" radius="0.7" color="#2a6bff"></a-sphere>
      <a-sphere position="2.4 1.6 -4" radius="0.7" color="#ffe02a"></a-sphere>
      <a-box position="0 0.4 -3" width="5" height="0.3" depth="0.4" color="#ffffff"></a-box>
    </a-scene>`,
  run(stage) {
    const set = (k: string) => (v: string | number): void => {
      stage.scene.setAttribute('renderer', k, v);
      const r = stage.scene.getAttribute('renderer');
      stage.caption(`renderer: toneMapping ${r.toneMapping}, exposure ${r.exposure}`);
    };
    stage.caption('renderer: toneMapping ACESFilmic, exposure 1.4');
    if (stage.preview) {
      sway(stage, { yaw: 5 });
      stage.every(1200, (i) => set('toneMapping')(mappings[i % mappings.length]!));
      return;
    }
    select(stage.bar!, 'toneMapping', mappings, 'ACESFilmic', set('toneMapping'));
    slider(stage.bar!, 'exposure', [0.2, 3, 0.1], 1.4, set('exposure'));
  },
});
