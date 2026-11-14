// linearRegressionRowsY: eager fitted rows, drawn by ordinary marks and printed
import { defineChart, dot, lineY, linearRegressionRowsY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { noisyLines } from '../../shared/marks1-scatter.ts';
import { createStage } from '../../shared/stage.ts';

const rows = noisyLines({ a: [12, 0.7] }, 30, 4, 23);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const readout = stage.preview ? null : stage.readout();

  const chart = (samples: number) => {
    const fitted = linearRegressionRowsY(rows, { x: 'x', y: 'y', samples, ci: 0.9 });
    if (readout) {
      readout.textContent =
        `${fitted.length} samples, first three:\n` +
        fitted
          .slice(0, 3)
          .map((r) => `x ${r.x.toFixed(1)}  y ${r.y.toFixed(2)}  band ${r.y1?.toFixed(2)} to ${r.y2?.toFixed(2)}  (from ${r.source.length} rows)`)
          .join('\n');
    }
    return defineChart({
      svgAnimation: true,
      marks: [
        dot(rows, { x: 'x', y: 'y', fillOpacity: 0.4 }),
        lineY(fitted, { x: 'x', y: 'y', points: true, stroke: '#f59e0b' }),
      ],
      scales: {
        x: { scale: scaleLinear, nice: true },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });
  };

  const options = { definition: chart(6), height: stage.height, initialWidth: 640, ariaLabel: 'Scatter with fitted rows drawn as a line' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (n: number): void => host.update({ ...options, definition: chart(n) });

  if (stage.bar) slider(stage.bar, 'samples', 2, 40, 1, 6, show);
  else stage.cycle([2, 4, 8, 16], 1600, show);
  return () => stage.dispose();
};

export default mount;
