// findClusters unionThreshold: how readily nearby peaks merge
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
  const points = samplePoints(stage.preview ? 3000 : 12000, 8, 3);
  const map = densityMap(points, size, 2.2);

  let token = 0;
  const run = async (threshold: number): Promise<void> => {
    const mine = ++token;
    const clusters = await findClusters(map, size, size, { unionThreshold: threshold });
    if (stage.disposed || mine !== token) return;
    view.clear();
    view.heat(map, size);
    for (const c of clusters) view.polygons(c.boundary ?? [], view.color(c.identifier), `${view.color(c.identifier)}30`);
    status.textContent = `unionThreshold ${threshold.toPrecision(2)}: ${clusters.length} clusters`;
  };
  // The threshold is in the map's own density units (this map's peak is 1) and its effect is
  // roughly logarithmic, so the slider moves the exponent: 0.01 to 300.
  await run(10);
  if (stage.bar) slider(stage.bar, 'unionThreshold', -2, 2.5, 0.05, 1, (x) => void run(10 ** x), (x) => (10 ** x).toPrecision(2));
  else {
    let i = 0;
    stage.every(1300, () => void run([0.05, 1.5, 3, 10, 30][i++ % 5]!));
  }
  return stage.dispose;
};

export default mount;
