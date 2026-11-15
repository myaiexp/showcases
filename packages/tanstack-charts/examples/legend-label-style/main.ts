// colorLegendItems label: size, weight, opacity, a fill from the item color and a text formatter
import { colorLegend, colorLegendItems, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { downloads, packageColors, packageNames } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle the styling and the label text rewrite.' });
  const build = (styled: boolean) =>
    defineChart({
      marks: [lineY(downloads, { x: 'week', y: 'downloads', z: 'package', strokeWidth: 2.5 })],
      scales: { x: { scale: () => scalePoint<string>().padding(0.2) }, y: { scale: scaleLinear, grid: true } },
      color: {
        domain: packageNames,
        range: packageColors,
        legend: colorLegend({
          items: colorLegendItems<string>(
            styled
              ? { justify: 'center', gap: 28, label: { fontSize: 14, fontWeight: 700, fillOpacity: 0.95, fill: (_series, { color }) => color, format: (v) => `@tanstack/${v}` } }
              : { justify: 'center', gap: 28 },
          ),
        }),
      },
    });
  const options = (styled: boolean) => ({ definition: build(styled), height: stage.height, ariaLabel: 'Weekly downloads for three packages' });
  const host = stage.own(mountChart(stage.box, options(true)));
  if (stage.bar) checkbox(stage.bar, 'styled labels', true, (v) => host.update(options(v)));
  else stage.cycle([true, false], 2200, (v) => host.update(options(v)));
  return () => stage.dispose();
};

export default mount;
