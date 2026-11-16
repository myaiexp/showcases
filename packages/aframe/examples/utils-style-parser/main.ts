// utils.styleParser turns a CSS-like string into an object and back
import { aframeExample } from '../../shared/frame.ts';
import { select } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="box" color="#ef2d5e" position="0 1.5 -3"></a-box>
      ${board('board', '0 4 -5', 7, 1.6, 70)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const { styleParser } = stage.AFRAME.utils;
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const box = stage.scene.querySelector('#box') as Entity;
    const samples = ['property: rotation; to: 0 360 0; dur: 3000; loop: true;', 'attribute: color; dur: 5000;', 'height: 10; width: 5'];
    const apply = (text: string): void => {
      const parsed = styleParser.parse(text);
      log.show([`parse('${text}')`, `-> ${JSON.stringify(parsed)}`, `stringify(parsed) -> "${styleParser.stringify(parsed)}"`].join('\n'));
      // The parsed string is just data: feed it to a component as an object.
      box.setAttribute('animation', { property: 'rotation', to: '0 360 0', dur: Number(parsed.dur) || 2000, loop: true, easing: 'linear' });
    };
    apply(samples[0]!);
    stage.caption('AFRAME.utils.styleParser.parse / stringify');
    if (stage.preview) {
      sway(stage);
      stage.every(1800, (i) => apply(samples[i % samples.length]!));
    } else if (stage.bar) {
      select(stage.bar, 'string', samples, samples[0]!, apply);
    }
  },
});
