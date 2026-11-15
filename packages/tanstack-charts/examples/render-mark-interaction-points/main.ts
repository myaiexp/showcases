// A custom mark whose dots carry ChartPoint records, so focus and tooltips work
import { createMark, defineChart, mountChart } from '@tanstack/charts';
import type { ChartPoint, SceneNode } from '@tanstack/charts';
import { scalePoint } from '@tanstack/charts/scales/point';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { revenue, type Revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a dot or press Tab then the arrow keys: the custom mark is a real focus target.' });
  if (stage.preview) stage.height -= 4;

  const lollipop = createMark<Revenue, string, number>(({ markIndex }) => {
    const id = `lollipop-${markIndex}`;
    return {
      id,
      channels: {
        x: { scale: 'x', values: revenue.map((d) => d.month) },
        y: { scale: 'y', values: revenue.map((d) => d.revenue), includeZero: true },
      },
      render({ chart, scales, color }) {
        const nodes: SceneNode[] = [];
        const points: ChartPoint<Revenue, string, number>[] = [];
        revenue.forEach((datum, datumIndex) => {
          const x = scales.x!.map(datum.month);
          const y = scales.y!.map(datum.revenue);
          const point: ChartPoint<Revenue, string, number> = {
            key: `month-${datum.month}`,
            markId: id,
            group: null,
            groupLabel: 'Revenue',
            datum,
            datumIndex,
            xValue: datum.month,
            yValue: datum.revenue,
            x,
            y,
            color: color(null),
          };
          points.push(point);
          nodes.push({ kind: 'rule', key: `stem-${datum.month}`, x1: x, x2: x, y1: chart.y + chart.height, y2: y, style: { stroke: point.color, strokeWidth: 2 } });
          // The same point object that goes in `points` is attached to the primitive that paints it.
          nodes.push({ kind: 'dot', key: `dot-${datum.month}`, x, y, radius: 8, style: { fill: point.color }, interaction: { point, affinity: 'x' } });
        });
        return { nodes, points };
      },
    };
  });

  const definition = defineChart({
    marks: [lollipop],
    scales: { x: { scale: () => scalePoint<string>().padding(0.5) }, y: { scale: scaleLinear, nice: true, grid: true } },
    tooltip,
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Revenue lollipops' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
