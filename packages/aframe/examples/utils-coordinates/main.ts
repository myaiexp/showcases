// utils.coordinates parses and stringifies vec3 and vec4 strings and tests whether a string is one
import { aframeExample } from '../../shared/frame.ts';
import { select } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-sphere id="dot" radius="0.3" color="#ffc65d" position="0 1.5 -3"></a-sphere>
      ${board('board', '0 4 -5', 6.4, 1.7, 64)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const { coordinates } = stage.AFRAME.utils;
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const dot = stage.scene.querySelector('#dot') as Entity;
    const samples = ['1 2 -3', '-1 1.5 -2', '2 1 -4 0.5', 'not coordinates'];
    const apply = (text: string): void => {
      const ok = coordinates.isCoordinates(text);
      const parsed = ok ? coordinates.parse(text) : null;
      log.show(
        [
          `isCoordinates('${text}') -> ${ok}`,
          `parse('${text}') -> ${parsed ? JSON.stringify(parsed) : 'n/a'}`,
          `stringify(parsed) -> ${parsed ? `"${coordinates.stringify(parsed)}"` : 'n/a'}`,
        ].join('\n'),
      );
      if (parsed) dot.setAttribute('position', { x: parsed.x, y: parsed.y + 1, z: parsed.z - 1 });
    };
    apply(samples[0]!);
    stage.caption('AFRAME.utils.coordinates');
    if (stage.preview) {
      sway(stage);
      stage.every(1700, (i) => apply(samples[i % samples.length]!));
    } else if (stage.bar) {
      select(stage.bar, 'string', samples, samples[0]!, apply);
    }
  },
});
