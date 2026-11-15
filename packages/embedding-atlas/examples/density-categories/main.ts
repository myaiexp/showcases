// maxDensityModeCategories(): the most categories density mode will colour
import { EmbeddingView, maxDensityModeCategories } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout, select } from '../../shared/controls.ts';
import { gauss, rng } from '../../shared/data.ts';

/** `k` small blobs on a spiral, one category each. */
function spiral(k: number, count: number): { x: Float32Array<ArrayBuffer>; y: Float32Array<ArrayBuffer>; category: Uint8Array<ArrayBuffer> } {
  const r = rng(k);
  const x = new Float32Array(count), y = new Float32Array(count), category = new Uint8Array(count);
  for (let i = 0; i < count; i++) {
    const c = Math.floor(r() * k);
    const a = c * 0.55, d = 1 + c * 0.22;
    category[i] = c;
    x[i] = Math.cos(a) * d + gauss(r) * 0.18;
    y[i] = Math.sin(a) * d + gauss(r) * 0.18;
  }
  return { x, y, category };
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const limit = maxDensityModeCategories();
  const counts = [8, limit, limit + 8].map(String);
  const n = stage.preview ? 20000 : 100000;
  if (!stage.preview) readout(stage.box, `maxDensityModeCategories() = ${limit}`);

  const view = new EmbeddingView(stage.view, {
    data: spiral(8, n),
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark', mode: 'density' },
  });
  stage.own(view);

  const show = (k: number): void => view.update({ data: spiral(k, n) });
  if (stage.bar) select(stage.bar, 'categories', counts, (v) => show(Number(v)));
  let i = 0;
  if (stage.preview) stage.every(2500, () => show(Number(counts[(i = (i + 1) % counts.length)])));
  return stage.dispose;
};

export default mount;
