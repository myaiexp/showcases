// Guides explain the scale: tick count, a tick formatter, a title and grid lines live next to it
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const rows = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => ({ month, revenue: [12_000, 31_000, 27_000, 44_000, 52_000, 49_000][i]! }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  let count = 5;
  let thousands = true;
  let grid = true;

  const build = () =>
    defineChart({
      marks: [lineY(rows, { x: 'month', y: 'revenue', stroke: '#60a5fa', points: true })],
      scales: {
        x: { scale: () => scalePoint<string>().padding(0.2), axis: { label: 'Month' } },
        y: {
          scale: scaleLinear,
          nice: true,
          grid,
          axis: {
            label: 'Monthly revenue',
            ticks: { count, format: thousands ? (value: number) => `${Math.round(value / 1000)}k` : undefined },
          },
        },
      },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Monthly revenue' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => host.update(options());

  if (stage.bar) {
    slider(stage.bar, 'tick count', 2, 10, 1, count, (v) => { count = v; refresh(); });
    checkbox(stage.bar, 'format as k', thousands, (v) => { thousands = v; refresh(); });
    checkbox(stage.bar, 'grid', grid, (v) => { grid = v; refresh(); });
  } else {
    stage.cycle([3, 5, 8], 1500, (n) => { count = n; thousands = n !== 8; refresh(); });
  }
  return () => stage.dispose();
};

export default mount;
