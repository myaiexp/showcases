// A custom ChartColorLegend: reserved height plus one renderer-neutral scene node
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import type { ChartColorLegend } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { downloads } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const latest = new Map(downloads.filter((d) => d.week === 'Jun 8').map((d) => [d.package, d.downloads]));

/** A strip of "name  value" labels, each with a dot in the series color. */
const strip: ChartColorLegend = {
  placement: 'top',
  height: () => 26,
  render: ({ colors, bounds }) => {
    const gap = bounds.width / Math.max(1, colors.domain.length);
    return {
      kind: 'group',
      key: 'custom-legend',
      children: colors.domain.flatMap((value, i) => {
        const x = bounds.x + i * gap + 8;
        const y = bounds.y + 13;
        return [
          { kind: 'dot' as const, key: `legend-dot-${value}`, x, y, radius: 5, style: { fill: colors.map(value) } },
          { kind: 'label' as const, key: `legend-text-${value}`, x: x + 10, y, text: `${value}  ${latest.get(String(value))?.toLocaleString('en-US') ?? ''}`, baseline: 'middle' as const, fontSize: 12 },
        ];
      }),
    };
  },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each legend entry shows the last week value next to its swatch.' });
  const definition = defineChart({
    marks: [lineY(downloads, { x: 'week', y: 'downloads', z: 'package', strokeWidth: 2.5 })],
    scales: { x: { scale: () => scalePoint<string>().padding(0.2) }, y: { scale: scaleLinear, grid: true } },
    color: { legend: strip },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Weekly downloads for three packages' }));
  return () => stage.dispose();
};

export default mount;
