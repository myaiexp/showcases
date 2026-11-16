// The text component: value, color, width and anchor on a plain entity
import { aframeExample } from '../../shared/frame.ts';
import { select, slider } from '../../shared/controls.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene>
      <a-entity id="label" text="value: Hello, A-Frame; color: #FAFAFA; width: 5; anchor: align"
                position="-0.9 0.2 -3" scale="1.5 1.5 1.5"></a-entity>
      <a-plane rotation="-90 0 0" width="30" height="30" position="0 -0.5 0" color="#445566"></a-plane>
      <a-sky color="#222"></a-sky>
    </a-scene>`,

  run(stage) {
    const label = stage.scene.querySelector('#label') as Entity;
    stage.caption('text="value: Hello, A-Frame; color: #FAFAFA; width: 5; anchor: align"');
    const words = ['Hello, A-Frame', 'Text is SDF', 'Sharp at any size'];
    if (stage.preview) {
      sway(stage);
      stage.every(1800, (i) => label.setAttribute('text', 'value', words[i % words.length]));
    } else if (stage.bar) {
      select(stage.bar, 'value', words, words[0]!, (v) => label.setAttribute('text', 'value', v));
      slider(stage.bar, 'width', [2, 8, 0.5], 5, (v) => label.setAttribute('text', 'width', v));
    }
  },
});
