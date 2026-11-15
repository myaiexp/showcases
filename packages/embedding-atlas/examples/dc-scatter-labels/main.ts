// Clusters as text labels on a scatter, named by their most common topic
import { findClusters } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { createDensityView, densityMap, EXTENT, samplePoints } from '../../shared/algo-density.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440, maxWidth: 520 });
  const size = 128;
  const view = createDensityView(stage, size);

  const render = async (seed: number): Promise<void> => {
    const p = samplePoints(stage.preview ? 3000 : 12000, 7, seed);
    const map = densityMap(p, size, 2.5);
    const clusters = await findClusters(map, size, size);
    if (stage.disposed) return;
    view.clear();
    // Each point is coloured by its true topic; the cluster labels come from the density map alone.
    const palette = Array.from({ length: p.names.length }, (_, i) => view.color(i));
    for (let i = 0; i < p.count; i++) {
      view.g.fillStyle = palette[p.category[i]!]!;
      view.g.globalAlpha = 0.6;
      const x = ((p.x[i]! + EXTENT) / (2 * EXTENT)) * size * view.scale;
      const y = ((p.y[i]! + EXTENT) / (2 * EXTENT)) * size * view.scale;
      view.g.fillRect(x - 0.8, y - 0.8, 1.6, 1.6);
    }
    view.g.globalAlpha = 1;
    for (const c of clusters) {
      const rects = c.boundaryRectApproximation ?? [];
      const votes = new Map<number, number>();
      for (let i = 0; i < p.count; i++) {
        const px = ((p.x[i]! + EXTENT) / (2 * EXTENT)) * size;
        const py = ((p.y[i]! + EXTENT) / (2 * EXTENT)) * size;
        if (rects.some(([x1, y1, x2, y2]) => px >= x1 && px < x2 && py >= y1 && py < y2)) {
          votes.set(p.category[i]!, (votes.get(p.category[i]!) ?? 0) + 1);
        }
      }
      const best = [...votes.entries()].sort((a, b) => b[1] - a[1])[0];
      if (!best) continue;
      view.polygons(c.boundary ?? [], '#ffffff55');
      view.text(c.meanX, c.meanY, p.names[best[0]]!);
    }
  };
  let seed = 5;
  await render(seed);
  if (stage.bar) button(stage.bar, 'New sample', () => void render(++seed));
  else stage.every(2400, () => void render(++seed));
  return stage.dispose;
};

export default mount;
