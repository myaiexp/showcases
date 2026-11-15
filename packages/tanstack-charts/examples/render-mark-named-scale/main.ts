// createMark with a named positional scale id: a second y axis only this mark uses
import { barY, createMark, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

interface Row {
  month: string;
  sales: number;
  rate: number;
}
const rows: readonly Row[] = [
  { month: 'Jan', sales: 120, rate: 2.1 },
  { month: 'Feb', sales: 150, rate: 2.6 },
  { month: 'Mar', sales: 90, rate: 1.8 },
  { month: 'Apr', sales: 180, rate: 3.4 },
  { month: 'May', sales: 160, rate: 3.0 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Bars read the left axis; the custom step line reads the right axis, a scale named rate.' });

  // The last type parameter names the y scale this mark uses.
  const rateSteps = createMark<Row, string, number, 'x', 'rate'>(({ markIndex }) => ({
    id: `rate-${markIndex}`,
    channels: {
      x: { scale: 'x', values: rows.map((r) => r.month) },
      rate: { scale: 'rate', values: rows.map((r) => r.rate), includeZero: true },
    },
    render({ scales }) {
      const band = scales.x!.bandwidth;
      const pts: [number, number][] = rows.flatMap((r) => {
        const x = scales.x!.map(r.month);
        const y = scales.rate!.map(r.rate);
        return [[x, y], [x + band, y]] as [number, number][];
      });
      return { nodes: [{ kind: 'polyline', key: 'rate-line', points: pts, style: { stroke: '#fb923c', strokeWidth: 3, fill: 'none' } }] };
    },
  }));

  const definition = defineChart({
    marks: [barY(rows, { x: 'month', y: 'sales', fill: '#2563eb', fillOpacity: 0.7 }), rateSteps],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.2) },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Sales' } },
      rate: { channel: 'y', scale: scaleLinear, nice: true, side: 'right', axis: { label: 'Rate (%)' } },
    },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Sales and rate' }));
  return () => stage.dispose();
};

export default mount;
