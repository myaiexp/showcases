// The quick start's line chart: define, mount, update the height, destroy on unmount
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

interface RevenueMonth {
  month: string;
  revenue: number;
}

const monthlyRevenue: readonly RevenueMonth[] = [
  { month: 'Jan', revenue: 42_000 },
  { month: 'Feb', revenue: 58_000 },
  { month: 'Mar', revenue: 76_000 },
  { month: 'Apr', revenue: 64_000 },
  { month: 'May', revenue: 81_000 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the line: the tooltip shows the original row.' });

  const monthlyRevenueChart = defineChart({
    marks: [
      lineY(monthlyRevenue, {
        id: 'monthly-revenue',
        x: 'month',
        y: 'revenue',
        points: true,
        stroke: '#2563eb',
      }),
    ],
    scales: {
      x: {
        scale: () => scalePoint<string>().padding(0.2),
        axis: { label: 'Month' },
      },
      y: {
        scale: scaleLinear,
        nice: true,
        grid: true,
        axis: { label: 'Revenue (USD)' },
      },
    },
    tooltip,
  });

  const options = {
    definition: monthlyRevenueChart,
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Monthly revenue',
  };
  // mountChart follows the container's width; host.destroy() runs when the stage is disposed.
  const host = stage.own(mountChart(stage.box, options));

  if (stage.bar) {
    // Host options cover mounting concerns only: a new height goes through host.update.
    slider(stage.bar, 'height', 200, 520, 10, stage.height, (height) => host.update({ ...options, height }), (v) => `${v}px`);
  } else {
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
