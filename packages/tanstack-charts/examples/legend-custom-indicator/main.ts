// indicator.render: scene nodes for the legend symbol, positioned by the legend's own layout
import { barY, colorLegend, colorLegendItems, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { downloads } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const latest = downloads.filter((d) => d.week === 'Jun 8');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const definition = defineChart({
    marks: [barY(latest, { x: 'package', y: 'downloads', color: 'package' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.3) }, y: { scale: scaleLinear, nice: true, grid: true } },
    color: {
      legend: colorLegend({
        label: 'Package',
        items: colorLegendItems<string>({
          justify: 'center',
          gap: 22,
          indicator: {
            width: 18,
            height: 14,
            gap: 6,
            render: (value, { bounds, color }) => [
              { kind: 'rect', key: `legend-box-${value}`, x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height, radius: 4, style: { fill: color, fillOpacity: 0.35, stroke: color, strokeWidth: 1.5 } },
              { kind: 'rule', key: `legend-rule-${value}`, x1: bounds.x + 3, y1: bounds.y + bounds.height / 2, x2: bounds.x + bounds.width - 3, y2: bounds.y + bounds.height / 2, style: { stroke: color, strokeWidth: 2 } },
            ],
          },
        }),
      }),
    },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Downloads by package, latest week' }));
  return () => stage.dispose();
};

export default mount;
