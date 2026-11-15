// createMark: a decorative threshold rule whose value joins the y domain through a channel
import { barY, createMark, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

interface ThresholdDatum {
  id: string;
  value: number;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the slider: the rule is a custom mark, and the y axis grows when the value passes the data.' });

  const threshold = (value: number) =>
    createMark<ThresholdDatum, never, number>(({ markIndex }) => {
      const id = `threshold-${markIndex}`;
      const datum: ThresholdDatum = { id: 'target', value };
      return {
        id,
        // The channel puts the value in the y domain; render maps it through the final scale.
        channels: { y: { scale: 'y', values: [datum.value] } },
        render({ chart, scales, theme }) {
          const y = scales.y!.map(datum.value);
          return {
            nodes: [
              { kind: 'rule', key: datum.id, x1: chart.x, x2: chart.x + chart.width, y1: y, y2: y, style: { stroke: theme.foreground, strokeOpacity: 0.7, strokeDasharray: '6 4' } },
              { kind: 'label', key: `${datum.id}-label`, x: chart.x + chart.width, y: y - 5, text: `target ${datum.value}`, anchor: 'end', fontSize: 11, style: { fill: theme.foreground } },
            ],
          };
        },
      };
    });

  const options = (value: number) => ({
    definition: defineChart({
      marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#2563eb' }), threshold(value)],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
    }),
    height: stage.height,
    ariaLabel: 'Revenue with a target line',
  });
  const host = stage.own(mountChart(stage.box, options(75)));
  if (stage.bar) slider(stage.bar, 'target', 40, 140, 5, 75, (v) => host.update(options(v)));
  else stage.cycle([75, 100, 120], 1800, (v) => host.update(options(v)));
  return () => stage.dispose();
};

export default mount;
