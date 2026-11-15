// The same points blurred by different amounts before findClusters
import { findClusters } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout, slider } from '../../shared/controls.ts';
import { createDensityView, densityMap, samplePoints } from '../../shared/algo-density.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440, maxWidth: 520 });
  const status = readout(stage.box);
  const size = 128;
  const view = createDensityView(stage, size);
  const points = samplePoints(stage.preview ? 3000 : 12000, 8, 9);

  let token = 0;
  const run = async (sigma: number): Promise<void> => {
    const mine = ++token;
    const map = densityMap(points, size, sigma);
    const clusters = await findClusters(map, size, size);
    if (stage.disposed || mine !== token) return;
    view.clear();
    view.heat(map, size);
    for (const c of clusters) view.polygons(c.boundary ?? [], view.color(c.identifier), `${view.color(c.identifier)}30`);
    status.textContent = `blur ${sigma.toFixed(1)} px: ${clusters.length} clusters`;
  };
  await run(2.5);
  if (stage.bar) slider(stage.bar, 'blur (px)', 0.8, 8, 0.1, 2.5, (x) => void run(x), (x) => x.toFixed(1));
  else {
    let i = 0;
    stage.every(1200, () => void run([1, 1.8, 2.6, 4, 6, 3][i++ % 6]!));
  }
  return stage.dispose;
};

export default mount;
