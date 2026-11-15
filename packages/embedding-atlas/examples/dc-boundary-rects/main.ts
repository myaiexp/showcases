// boundaryRectApproximation: clusters as rectangle stacks beside polygons
import { findClusters } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, readout } from '../../shared/controls.ts';
import { createDensityView, densityMap, samplePoints } from '../../shared/algo-density.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440, maxWidth: 520 });
  const status = readout(stage.box);
  const size = 128;
  const view = createDensityView(stage, size);
  const points = samplePoints(stage.preview ? 3000 : 10000, 6, 4);
  const map = densityMap(points, size, 2.5);
  const clusters = await findClusters(map, size, size);
  if (stage.disposed) return stage.dispose;

  let rects = true;
  let outline = true;
  const draw = (focus = -1): void => {
    view.clear();
    view.heat(map, size);
    for (const c of clusters) {
      const dim = focus >= 0 && c.identifier !== focus;
      if (rects) view.rects(c.boundaryRectApproximation ?? [], dim ? '#ffffff22' : '#fff8', `${view.color(c.identifier)}${dim ? '10' : '40'}`);
      if (outline) view.polygons(c.boundary ?? [], dim ? '#ffffff30' : view.color(c.identifier));
    }
    const n = clusters.reduce((s, c) => s + (c.boundaryRectApproximation?.length ?? 0), 0);
    status.textContent = `${clusters.length} clusters, ${n} rectangles in total`;
  };
  draw();
  if (stage.bar) {
    checkbox(stage.bar, 'boundaryRectApproximation', rects, (b) => ((rects = b), draw()));
    checkbox(stage.bar, 'boundary polygons', outline, (b) => ((outline = b), draw()));
  } else {
    // Cards: light up one cluster's rectangles at a time.
    let i = 0;
    stage.every(900, () => draw(clusters[i++ % clusters.length]?.identifier));
  }
  return stage.dispose;
};

export default mount;
