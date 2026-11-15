// vSyncCount follows the display; with 0, targetFrameRate sets a fixed rate. The readout measures real frames.
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['vSyncCount = 1', 'vSyncCount = 2', 'vSyncCount = 0, targetFrameRate = 30', 'vSyncCount = 0, targetFrameRate = 60'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Non-vsync pacing is not recommended in the docs; try it only to see the difference.' });
  const { engine, root } = stage;
  lit(stage, [0, 1.5, 6]);
  const bar = solid(root, PrimitiveMesh.createCuboid(engine, 0.5, 2.4, 0.5), phong(engine, PALETTE.amber));
  const info = panel(stage);
  let mode: Mode = MODES[0];
  let rate = 30;
  const apply = (m: Mode): void => {
    mode = m;
    if (m.includes('targetFrameRate')) {
      engine.vSyncCount = 0;
      engine.targetFrameRate = m.endsWith('30') ? 30 : 60;
    } else {
      engine.vSyncCount = m.endsWith('2') ? 2 : 1;
    }
  };
  if (!stage.preview) {
    select(stage.bar, 'mode', [...MODES, 'custom frame rate'], (m) => (m === 'custom frame rate' ? ((engine.vSyncCount = 0), (engine.targetFrameRate = rate), (mode = MODES[3])) : apply(m as Mode)));
    slider(stage.bar, 'custom targetFrameRate', 5, 120, 1, rate, (v) => {
      rate = v;
      engine.targetFrameRate = v;
    });
  }
  let frames = 0;
  let since = performance.now();
  let fps = 0;
  tick(root, (dt, t) => {
    bar.transform.rotate(0, 180 * dt, 0);
    frames++;
    const now = performance.now();
    if (now - since >= 1000) {
      fps = (frames * 1000) / (now - since);
      frames = 0;
      since = now;
    }
    if (stage.preview) {
      const next = MODES[Math.floor(t / 3.5) % MODES.length]!;
      if (next !== mode) apply(next);
    }
    info.text(`${mode}\nvSyncCount ${engine.vSyncCount}, targetFrameRate ${engine.targetFrameRate}\nmeasured ${fps.toFixed(1)} frames per second`);
  });
  return stage.dispose;
};

export default mount;
