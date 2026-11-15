// Cluster fields (meanX, pixelCount, maxDensity, ...) shown as labels
import { findClusters } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout } from '../../shared/controls.ts';
import { createDensityView, densityMap, samplePoints } from '../../shared/algo-density.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440, maxWidth: 520 });
  const size = 96;
  const view = createDensityView(stage, size);
  const points = samplePoints(stage.preview ? 3000 : 10000, 6, 11);
  const map = densityMap(points, size, 2);
  const clusters = await findClusters(map, size, size);
  if (stage.disposed) return stage.dispose;
  const table = readout(stage.box);
  if (!stage.preview) {
    table.textContent = ['id  pixelCount  sumDensity  maxDensity  mean (x, y)         peak (x, y)']
      .concat(
        clusters.map((c) =>
          [
            String(c.identifier).padEnd(4),
            String(c.pixelCount).padEnd(12),
            c.sumDensity.toFixed(1).padEnd(12),
            c.maxDensity.toFixed(2).padEnd(12),
            `(${c.meanX.toFixed(1)}, ${c.meanY.toFixed(1)})`.padEnd(20),
            `(${c.maxDensityLocation[0]}, ${c.maxDensityLocation[1]})`,
          ].join(''),
        ),
      )
      .join('\n');
  }

  const draw = (focus = -1): void => {
    view.clear();
    view.heat(map, size);
    for (const c of clusters) {
      const on = focus < 0 || c.identifier === focus;
      view.polygons(c.boundary ?? [], on ? view.color(c.identifier) : '#ffffff25');
      view.marker(c.meanX, c.meanY, '#fff', 'cross'); // density-weighted centre
      view.marker(c.maxDensityLocation[0], c.maxDensityLocation[1], view.color(c.identifier)); // the peak
      if (on) view.text(c.meanX, c.meanY - 9, `#${c.identifier}: ${c.pixelCount} px`);
    }
  };
  draw();
  if (stage.bar) {
    stage.bar.textContent = 'white cross: meanX, meanY   coloured dot: maxDensityLocation';
    stage.bar.style.fontSize = '12px';
  } else {
    let i = 0;
    stage.every(1000, () => draw(clusters[i++ % clusters.length]?.identifier));
  }
  return stage.dispose;
};

export default mount;
