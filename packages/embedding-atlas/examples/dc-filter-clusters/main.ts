// Dropping small clusters by pixelCount: noise peaks vanish, blobs stay
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
  const points = samplePoints(stage.preview ? 3000 : 12000, 6, 17);
  const map = densityMap(points, size, 1.8);
  // A tiny unionThreshold keeps every little peak apart, so there is plenty to filter.
  const clusters = await findClusters(map, size, size, { unionThreshold: 0.02 });
  if (stage.disposed) return stage.dispose;

  let last = -1;
  const draw = (value: number): void => {
    const min = Math.round(value);
    if (min === last) return;
    last = min;
    view.clear();
    view.heat(map, size);
    let kept = 0;
    for (const c of clusters) {
      const keep = c.pixelCount >= min;
      if (keep) kept++;
      view.polygons(c.boundary ?? [], keep ? view.color(c.identifier) : '#ffffff22', keep ? `${view.color(c.identifier)}30` : undefined);
    }
    status.textContent = `pixelCount >= ${min}: ${kept} of ${clusters.length} clusters kept`;
  };
  draw(0);
  if (stage.bar) slider(stage.bar, 'minimum pixelCount', 0, 1500, 10, 0, draw);
  else stage.loop((_dt, t) => draw(900 * (0.5 - 0.5 * Math.cos(t * 0.7))));
  return stage.dispose;
};

export default mount;
