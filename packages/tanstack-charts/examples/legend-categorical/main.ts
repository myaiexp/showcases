// colorLegend: swatches from the resolved categorical scale, top or bottom
import { colorLegend, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { downloads } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The legend is hidden from the accessibility tree: name series elsewhere too.' });
  const build = (bottom: boolean) =>
    defineChart({
      marks: [lineY(downloads, { x: 'week', y: 'downloads', z: 'package', strokeWidth: 2.5 })],
      scales: {
        x: { scale: () => scalePoint<string>().padding(0.2), axis: { label: 'Week' } },
        y: { scale: scaleLinear, grid: true, axis: { ticks: { count: 5 }, label: 'Downloads' } },
      },
      color: { legend: colorLegend({ label: 'Package', placement: bottom ? 'bottom' : 'top' }) },
    });
  const options = (bottom: boolean) => ({ definition: build(bottom), height: stage.height, ariaLabel: 'Weekly downloads for three packages' });
  const host = stage.own(mountChart(stage.box, options(false)));
  if (stage.bar) checkbox(stage.bar, "placement: 'bottom'", false, (v) => host.update(options(v)));
  else stage.cycle([false, true], 2200, (v) => host.update(options(v)));
  return () => stage.dispose();
};

export default mount;
