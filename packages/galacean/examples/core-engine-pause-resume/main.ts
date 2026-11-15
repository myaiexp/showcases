// engine.pause() freezes frames and time; engine.resume() starts both again
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Time counters stop while the engine is paused; the readout is DOM, so it keeps updating.' });
  const { engine, root } = stage;
  lit(stage, [0, 1.5, 6]);
  const cube = solid(root, PrimitiveMesh.createCuboid(engine, 1.5, 1.5, 1.5), phong(engine, PALETTE.green));
  tick(root, (dt) => cube.transform.rotate(40 * dt, 70 * dt, 0));
  const info = panel(stage);
  const show = (): void => {
    const { time } = engine;
    info.text(`engine.isPaused ${engine.isPaused}\nframeCount ${time.frameCount}\nelapsedTime ${time.elapsedTime.toFixed(2)} s\nactualElapsedTime ${time.actualElapsedTime.toFixed(2)} s`);
  };
  if (!stage.preview) {
    button(stage.bar, 'engine.pause()', () => engine.pause());
    button(stage.bar, 'engine.resume()', () => engine.resume());
  }
  const readout = setInterval(show, 100);
  const cycle = stage.preview
    ? setInterval(() => (engine.isPaused ? engine.resume() : engine.pause()), 1600)
    : undefined;
  stage.own(() => {
    clearInterval(readout);
    clearInterval(cycle);
  });
  return stage.dispose;
};

export default mount;
