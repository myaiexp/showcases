// Updating position at the three.js level skips setAttribute's overhead
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-sphere id="a" radius="0.4" color="#ef2d5e" position="-1.2 1.3 -3"></a-sphere>
      <a-sphere id="b" radius="0.4" color="#4CC3D9" position="1.2 1.3 -3"></a-sphere>
      ${board('board', '0 3.6 -4.5', 7, 1.4, 70)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const a = stage.scene.querySelector('#a') as Entity;
    const b = stage.scene.querySelector('#b') as Entity;
    const N = 20000;
    const bench = (): void => {
      const pos = { x: 0, y: 0, z: 0 };
      let t = performance.now();
      for (let i = 0; i < N; i++) {
        pos.y = 1.3 + (i % 10) * 0.01;
        a.setAttribute('position', pos);
      }
      const viaSet = performance.now() - t;
      t = performance.now();
      for (let i = 0; i < N; i++) b.object3D.position.y = 1.3 + (i % 10) * 0.01;
      const viaObject = performance.now() - t;
      log.show(`${N} updates of position.y\nsetAttribute('position', obj): ${viaSet.toFixed(1)} ms\nobject3D.position.y = ...:    ${viaObject.toFixed(1)} ms\nBoth end at the same place: ${a.getAttribute('position').y.toFixed(2)} / ${b.getAttribute('position').y.toFixed(2)}`);
    };
    bench();
    stage.caption('setAttribute vs object3D.position');
    if (stage.preview) {
      sway(stage);
      stage.every(2500, bench);
    } else if (stage.bar) {
      button(stage.bar, 'Run the comparison again', bench);
    }
  },
});
