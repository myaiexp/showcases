// resizeByClientSize(pixelRatio): the drawing buffer follows the element's CSS size times a ratio
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Low ratios render fewer pixels; the browser stretches them over the element.' });
  const { engine, root } = stage;
  lit(stage, [0, 1.5, 6]);
  const torus = solid(root, PrimitiveMesh.createTorus(engine, 1.1, 0.4, 24, 32), phong(engine, PALETTE.violet));
  const info = panel(stage);
  let ratio = 0.3;
  const apply = (): void => engine.canvas.resizeByClientSize(ratio);
  if (!stage.preview) slider(stage.bar, 'pixelRatio', 0.1, 2, 0.05, ratio, (v) => ((ratio = v), apply()), (v) => v.toFixed(2));
  tick(root, (dt, t) => {
    torus.transform.rotate(30 * dt, 55 * dt, 0);
    if (stage.preview) ratio = 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(t * 0.8));
    apply();
    const { canvas } = engine;
    info.text(`resizeByClientSize(${ratio.toFixed(2)})\nelement ${stage.canvas.clientWidth} x ${stage.canvas.clientHeight} CSS px\nbuffer  ${canvas.width} x ${canvas.height} px`);
  });
  return stage.dispose;
};

export default mount;
