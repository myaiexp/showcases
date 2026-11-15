// maximumDeltaTime caps deltaTime after a stalled frame; actualDeltaTime still reports the stall
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const stall = (ms: number): void => {
  const end = performance.now() + ms;
  while (performance.now() < end) {
    /* hold the main thread, as a long task would */
  }
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'A stall holds the page for 250 ms. With a low cap the ball hops a short way; with a high cap it jumps.' });
  const { engine, root } = stage;
  lit(stage, [0, 1.5, 8]);
  const ball = solid(root, PrimitiveMesh.createSphere(engine, 0.45, 20), phong(engine, PALETTE.amber));
  const info = panel(stage);
  const { time } = engine;
  time.maximumDeltaTime = stage.preview ? 0.02 : 0.1;
  let x = -3.5;
  let worst = 0;
  let worstActual = 0;
  let pendingStall = false;
  if (!stage.preview) {
    button(stage.bar, 'Stall 250 ms', () => (pendingStall = true));
    slider(stage.bar, 'maximumDeltaTime', 0.01, 0.5, 0.01, time.maximumDeltaTime, (v) => (time.maximumDeltaTime = v), (v) => `${v.toFixed(2)} s`);
  }
  let last = 0;
  tick(root, (dt, t) => {
    x += dt * 4;
    if (x > 3.5) x = -3.5;
    ball.transform.setPosition(x, 0, 0);
    worst = Math.max(worst * 0.995, time.deltaTime);
    worstActual = Math.max(worstActual * 0.995, time.actualDeltaTime);
    if ((stage.preview && t - last > 3) || pendingStall) {
      last = t;
      pendingStall = false;
      stall(stage.preview ? 80 : 250);
    }
    info.text(`maximumDeltaTime ${time.maximumDeltaTime.toFixed(2)} s\ndeltaTime       ${time.deltaTime.toFixed(3)}  (recent max ${worst.toFixed(3)})\nactualDeltaTime ${time.actualDeltaTime.toFixed(3)}  (recent max ${worstActual.toFixed(3)})`);
  });
  return stage.dispose;
};

export default mount;
