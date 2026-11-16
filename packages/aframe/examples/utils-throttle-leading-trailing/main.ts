// throttleLeadingAndTrailing runs at once and again at the end of a burst of calls
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-sphere id="dot" radius="0.3" color="#7be0c3" position="-2 1.5 -3"></a-sphere>
      ${board('board', '0 3.8 -4', 6.4, 1.8, 64)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const { throttleLeadingAndTrailing } = stage.AFRAME.utils as unknown as { throttleLeadingAndTrailing<F extends (...a: never[]) => void>(f: F, ms: number): F };
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 6 });
    const dot = stage.scene.querySelector('#dot') as Entity;
    const t0 = performance.now();
    let calls = 0;
    // Each call syncs the dot to the latest x; the final call of a burst is deferred, not lost.
    const sync = throttleLeadingAndTrailing((x: number) => {
      dot.object3D.position.x = x;
      log(`ran with x ${x.toFixed(1)} at +${Math.round(performance.now() - t0)} ms (call ${calls} so far)`);
    }, 500);
    const burst = (): void => {
      for (let k = 0; k < 10; k++) {
        setTimeout(() => {
          calls++;
          sync(-2 + k * 0.4);
        }, k * 60);
      }
    };
    stage.caption('10 calls in 600 ms, throttled to 500 ms');
    if (stage.preview) {
      sway(stage);
      stage.every(2500, burst);
    } else if (stage.bar) {
      button(stage.bar, 'Send a burst of 10 calls', burst);
    }
  },
});
