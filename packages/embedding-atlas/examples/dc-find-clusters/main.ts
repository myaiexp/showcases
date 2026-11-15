// findClusters on a density map of scattered points, drawn as polygons
import { findClusters } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, readout } from '../../shared/controls.ts';
import { createDensityView, densityMap, samplePoints } from '../../shared/algo-density.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440, maxWidth: 520 });
  const status = readout(stage.box);
  const size = 128;
  const view = createDensityView(stage, size);

  const render = async (seed: number): Promise<void> => {
    const points = samplePoints(stage.preview ? 3000 : 12000, 6, seed);
    // A Float32Array of width * height density values, row by row.
    const map = densityMap(points, size, 2.5);
    const clusters = await findClusters(map, size, size);
    if (stage.disposed) return;
    view.clear();
    view.heat(map, size);
    view.dots(points);
    for (const c of clusters) view.polygons(c.boundary ?? [], view.color(c.identifier), `${view.color(c.identifier)}22`);
    status.textContent = `${clusters.length} clusters found in a ${size} x ${size} density map (sample ${seed})`;
  };
  let seed = 7;
  await render(seed);
  // Each new sample moves the blobs, so the clusters (and their count) change.
  if (stage.bar) button(stage.bar, 'New sample', () => void render(++seed));
  else stage.every(2200, () => void render(++seed));
  return stage.dispose;
};

export default mount;
