// rect over binX rows: x1/x2 are the bin edges, the count is the bar height
import { binX, defineChart, mountChart, rect } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { groupedObservations } from '../../shared/marks1-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = groupedObservations({ latency: [120, 30, 400] });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bin for its range and count.' });

  const chart = (thresholds: number) => {
    const bins = binX(rows, { value: 'value', thresholds, outputs: { count: { reduce: 'count' } } });
    return defineChart({
      svgAnimation: true,
      marks: [rect(bins, { x1: 'x1', x2: 'x2', y1: () => 0, y2: 'count', key: 'x1', inset: 1 })],
      scales: {
        x: { scale: scaleLinear, axis: { label: 'Latency (ms)' } },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Requests' } },
      },
      tooltip,
    });
  };

  const options = { definition: chart(16), height: stage.height, initialWidth: 640, ariaLabel: 'Histogram of request latency' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (n: number): void => host.update({ ...options, definition: chart(n) });

  if (stage.bar) slider(stage.bar, 'thresholds', 4, 40, 1, 16, show);
  else {
    stage.cycle([8, 16, 28], 2000, show);
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
