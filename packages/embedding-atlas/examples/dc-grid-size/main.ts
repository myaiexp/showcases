// findClusters on the same points binned to 32, 64, 128 and 256 pixels a side
import { findClusters } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { createDensityView, densityMap, samplePoints } from '../../shared/algo-density.ts';
import { caption } from '../../shared/algo-umap.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440, maxWidth: 520 });
  const points = samplePoints(stage.preview ? 3000 : 12000, 6, 13);
  stage.variants('map size', ['32', '64', '128', '256'], async (label, host) => {
    const size = Number(label);
    const view = createDensityView(stage, size, host);
    // Keep the blur the same physical width (about 2.5 px at 128) so only the resolution changes.
    const map = densityMap(points, size, (2.5 * size) / 128);
    const t0 = performance.now();
    // unionThreshold depends on the grid: the same value that gives 6 clusters at 128 pixels
    // merges everything at 32, so it scales with the side length.
    const unionThreshold = (10 * size) / 128;
    const clusters = await findClusters(map, size, size, { unionThreshold });
    const ms = Math.round(performance.now() - t0);
    view.clear();
    view.heat(map, size);
    for (const c of clusters) view.polygons(c.boundary ?? [], view.color(c.identifier), `${view.color(c.identifier)}30`);
    caption(host, `${size} x ${size}, unionThreshold ${unionThreshold}: ${clusters.length} clusters, ${ms} ms`);
    return { destroy() {} };
  }, 2500);
  return stage.dispose;
};

export default mount;
