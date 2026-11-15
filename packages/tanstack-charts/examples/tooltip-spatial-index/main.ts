// spatialIndex: a grid hash that finds the nearest of 1,200 points by looking at a few cells
import { defineChart, dot, mountChart } from '@tanstack/charts';
import type { ChartPoint, ChartSpatialIndexFactory, ChartValue } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { scatter, type Blob } from '../../shared/interact-data.ts';
import { reader } from '../../shared/interact-read.ts';
import { createStage } from '../../shared/stage.ts';

const rows = scatter(1200, 17);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move over the cloud: the readout shows how many points each lookup looked at.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  const show = reader(stage);
  let indexed = true;

  // Points go into square cells; a lookup walks the cells within maxDistance of the pointer.
  const gridIndex = <D, X extends ChartValue, Y extends ChartValue>(cell: number): ChartSpatialIndexFactory<D, X, Y> => (points) => {
    const cells = new Map<string, ChartPoint<D, X, Y>[]>();
    for (const p of points) {
      const k = `${Math.floor(p.x / cell)},${Math.floor(p.y / cell)}`;
      const list = cells.get(k) ?? [];
      list.push(p);
      cells.set(k, list);
    }
    return {
      findNearest(x, y, maxDistance = 48) {
        let best: ChartPoint<D, X, Y> | null = null;
        let bestD = maxDistance;
        let examined = 0;
        const span = Math.ceil(maxDistance / cell);
        const cx = Math.floor(x / cell);
        const cy = Math.floor(y / cell);
        for (let i = cx - span; i <= cx + span; i++) {
          for (let j = cy - span; j <= cy + span; j++) {
            for (const p of cells.get(`${i},${j}`) ?? []) {
              examined++;
              const d = Math.hypot(p.x - x, p.y - y);
              if (d <= bestD) {
                best = p;
                bestD = d;
              }
            }
          }
        }
        show(`grid index: ${examined} of ${points.length} points examined`);
        return best;
      },
    };
  };

  const options = () => ({
    definition: defineChart({
      marks: [dot(rows, { x: 'x', y: 'y', key: 'id', r: 2.2, color: 'group' })],
      scales: {
        x: { scale: scaleLinear, nice: true },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
      spatialIndex: indexed ? gridIndex<Blob, number, number>(24) : undefined,
      maxFocusDistance: 24,
      tooltip,
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Dense scatter of 1,200 points',
  });
  const host = stage.own(mountChart(stage.box, options()));
  show('grid index: move over the chart');

  if (stage.bar) {
    checkbox(stage.bar, 'grid index', true, (v) => {
      indexed = v;
      host.update(options());
      show(v ? 'grid index on: move over the chart' : 'default linear scan: every point is a candidate');
    });
  } else stage.ghost((t) => [0.2 + 0.6 * t, 0.5 + 0.2 * Math.sin(t * 12)]);
  return () => stage.dispose();
};

export default mount;
