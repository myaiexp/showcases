// focusAnchors: a decorative band mark that whenFocused reveals for the focused x value only
import { createMark, defineChart, lineY, mountChart, whenFocused } from '@tanstack/charts';
import type { ChartFocusAnchor, SceneNode } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { revenue, type Revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the line: a band appears behind the focused month.' });

  const bands = createMark<Revenue, string, number>(({ markIndex }) => {
    const id = `bands-${markIndex}`;
    return {
      id,
      channels: { x: { scale: 'x', values: revenue.map((d) => d.month) } },
      render({ chart, scales, theme }) {
        const w = chart.width / revenue.length;
        const nodes: SceneNode[] = [];
        const focusAnchors: ChartFocusAnchor[] = [];
        revenue.forEach((datum, datumIndex) => {
          const key = `band-${datum.month}`;
          const x = scales.x!.map(datum.month);
          nodes.push({ kind: 'rect', key, x: x - w / 2, y: chart.y, width: w, height: chart.height, style: { fill: theme.palette[0]!, fillOpacity: 0.18 } });
          // The anchor key names the node it reveals; xValue is what the match compares.
          focusAnchors.push({ key, markId: id, group: null, datum, datumIndex, xValue: datum.month });
        });
        return { nodes, focusAnchors };
      },
    };
  });

  const definition = defineChart({
    marks: [whenFocused(bands, { match: 'x' }), lineY(revenue, { x: 'month', y: 'revenue', stroke: '#60a5fa', strokeWidth: 2, points: true })],
    scales: { x: { scale: () => scalePoint<string>().padding(0.5) }, y: { scale: scaleLinear, nice: true, grid: true } },
    tooltip,
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Revenue with focus bands' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
