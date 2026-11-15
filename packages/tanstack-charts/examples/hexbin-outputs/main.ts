// hexbin outputs: named reducers (count, mean, max) per bin, and which one drives the color
import { colorGradientLegend, defineChart, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { hexbin } from '@tanstack/charts/spatial/hexbin';
import { tooltip } from '@tanstack/charts/tooltip';
import { scaleSequential } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { heat } from '../../shared/marks2-color.ts';
import { cars } from '../../shared/marks2-points.ts';
import { createStage } from '../../shared/stage.ts';

const rows = cars(600, 5);
type Output = 'count' | 'cylinders' | 'heaviest';
const labels: Record<Output, string> = { count: 'Cars per bin', cylinders: 'Mean cylinders', heaviest: 'Heaviest car (lb)' };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The tooltip lists every output of the bin, whichever one colors it.' });

  const build = (output: Output) =>
    defineChart({
      svgAnimation: true,
      marks: [
        hexbin(rows, {
          x: 'weight',
          y: 'economy',
          binWidth: 26,
          outputs: {
            count: { reduce: 'count' },
            cylinders: { value: 'cylinders', reduce: 'mean' },
            heaviest: { value: 'weight', reduce: 'max' },
          },
          color: output,
          stroke: '#111',
        }),
      ],
      scales: {
        x: { scale: scaleLinear, nice: true },
        y: { scale: scaleLinear, nice: true },
      },
      color: {
        scale: () => scaleSequential(heat),
        ...(stage.preview ? {} : { legend: colorGradientLegend({ label: labels[output] }) }),
      },
      tooltip: {
        use: tooltip,
        format: (point) => `${point.datum.count} cars\nmean cylinders ${point.datum.cylinders.toFixed(1)}\nheaviest ${point.datum.heaviest} lb`,
      },
    });

  const options = (output: Output) => ({ definition: build(output), height: stage.height, ariaLabel: 'Hexagonal bins with reducer outputs' });
  const host = stage.own(mountChart(stage.box, options('count')));
  const show = (output: Output): void => {
    host.update(options(output));
    stage.say(`color: '${output}'`);
  };
  const modes = (Object.keys(labels) as Output[]).map((o) => [o, labels[o]] as const);
  if (stage.bar) select(stage.bar, 'color by output', modes, show);
  else {
    stage.cycle(modes.map((m) => m[0]), 1800, show);
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
