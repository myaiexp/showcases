// The quick start lifecycle: mount once, update with a new definition, resize, destroy on unmount
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

interface Month {
  month: string;
  revenue: number;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
const datasets: readonly (readonly Month[])[] = [
  [42, 58, 76, 64, 81],
  [70, 52, 48, 66, 90],
  [30, 44, 61, 85, 97],
].map((values) => months.map((month, i) => ({ month, revenue: values[i]! * 1000 })));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Data changes need a new definition (host.update); size changes only need new host options.' });
  const readout = stage.preview ? null : stage.readout();

  // A new definition is how the application says "the captured data changed".
  const createChart = (rows: readonly Month[]) =>
    defineChart({
      svgAnimation: true,
      marks: [lineY(rows, { id: 'revenue', x: 'month', y: 'revenue', points: true, stroke: '#60a5fa' })],
      scales: {
        x: { scale: () => scalePoint<string>().padding(0.2) },
        y: { scale: scaleLinear().domain([0, 100_000]), grid: true, axis: { label: 'Revenue (USD)' } },
      },
    });

  let set = 0;
  let height = stage.height;
  const options = () => ({ definition: createChart(datasets[set]!), height, initialWidth: 640, ariaLabel: 'Monthly revenue' });
  const host = stage.own(mountChart(stage.box, options()));
  const show = (): void => {
    host.update(options());
    if (readout) readout.textContent = `dataset ${set + 1} of ${datasets.length}, height ${height}px, ${host.getScene().points.length} points`;
  };

  if (stage.bar) {
    button(stage.bar, 'Next dataset', () => {
      set = (set + 1) % datasets.length;
      show();
    });
    button(stage.bar, 'Taller', () => {
      height = height >= 500 ? 280 : height + 60;
      show();
    });
    show();
  } else {
    stage.cycle(datasets, 1800, (_, i) => {
      set = i;
      show();
    });
  }
  return () => stage.dispose();
};

export default mount;
