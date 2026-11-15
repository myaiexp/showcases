// createUMAP seed (random start): two instances on seed 1, one on 2
import { createUMAP } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout } from '../../shared/controls.ts';
import { clusteredVectors } from '../../shared/vectors.ts';
import { panels } from '../../shared/algo-umap.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const ps = panels(stage, ['seed: 1', 'seed: 1 (again)', 'seed: 2']);
  const status = readout(stage.box);
  const v = clusteredVectors(stage.preview ? 600 : 1500, 30, 5, 31, 2);
  const umaps = await Promise.all([1, 1, 2].map((seed) => createUMAP(v.count, v.dim, 2, v.data, { seed, initializeMethod: 'random' })));
  umaps.forEach((u) => stage.own(u));
  if (stage.disposed) return stage.dispose;
  await Promise.all(umaps.map((u) => u.run()));
  if (stage.disposed) return stage.dispose;

  const out = umaps.map((u) => new Float32Array(u.embedding)); // embedding is a reused buffer
  out.forEach((xy, i) => ps[i]!.plot.draw(xy, v.label));
  const maxDiff = (p: Float32Array, q: Float32Array): number => p.reduce((m, x, i) => Math.max(m, Math.abs(x - q[i]!)), 0);
  const same = maxDiff(out[0]!, out[1]!);
  const other = maxDiff(out[0]!, out[2]!);
  status.textContent = `largest coordinate difference: seed 1 vs seed 1 = ${same.toExponential(1)}, seed 1 vs seed 2 = ${other.toFixed(2)}`;
  return stage.dispose;
};

export default mount;
