// Fixed-width mode: a 750 px wide drawing buffer scaled onto the page with setScale
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const FIXED_WIDTH = 750;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 380, hint: 'The canvas has no CSS size of its own, so setScale (a CSS transform) can fit its 750 px buffer to the box.' });
  const { engine, root, canvas } = stage;
  // The canvas sits in a clipping box and is laid out at its buffer size (CSS px = buffer px).
  const box = document.createElement('div');
  const visibleHeight = stage.preview ? 200 : 380;
  box.style.cssText = `width:100%;height:${visibleHeight}px;overflow:hidden;position:relative`;
  el.insertBefore(box, canvas);
  box.append(canvas);
  stage.own(() => box.remove());
  lit(stage, [0, 1.5, 6]);
  const cube = solid(root, PrimitiveMesh.createCuboid(engine, 1.6, 1.6, 1.6), phong(engine, PALETTE.amber));
  const info = panel(stage);
  const fit = (): void => {
    const scale = box.clientWidth / FIXED_WIDTH;
    const height = Math.round(visibleHeight / scale);
    canvas.style.width = `${FIXED_WIDTH}px`;
    canvas.style.height = `${height}px`;
    engine.canvas.width = FIXED_WIDTH;
    engine.canvas.height = height;
    engine.canvas.setScale(scale, scale);
    info.text(`fixedWidth = ${FIXED_WIDTH}\nscale = ${box.clientWidth} / ${FIXED_WIDTH} = ${scale.toFixed(3)}\nbuffer ${engine.canvas.width} x ${Math.round(engine.canvas.height)}`);
  };
  fit();
  const observer = new ResizeObserver(fit);
  observer.observe(box);
  observer.observe(canvas); // created after the stage's own observer, so this one has the last word
  stage.own(() => observer.disconnect());
  tick(root, (dt) => cube.transform.rotate(30 * dt, 60 * dt, 0));
  return stage.dispose;
};

export default mount;
