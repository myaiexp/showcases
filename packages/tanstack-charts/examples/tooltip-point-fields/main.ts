// onFocusChange prints every field of the focused ChartPoint
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { scatter } from '../../shared/interact-data.ts';
import { reader } from '../../shared/interact-read.ts';
import { createStage } from '../../shared/stage.ts';

const rows = scatter(15, 3);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a dot to read the point behind it.' });
  if (stage.preview) stage.height -= 52; // leaves room for the caption lines under the chart
  const show = reader(stage);
  show('no focused point');

  const definition = defineChart({
    marks: [dot(rows, { id: 'blobs', x: 'x', y: 'y', key: 'id', color: 'group', r: 5 })],
    scales: {
      x: { scale: scaleLinear, nice: true },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    tooltip,
  });

  stage.own(
    mountChart(stage.box, {
      definition,
      height: stage.height,
      initialWidth: 640,
      ariaLabel: 'Scatter of 15 points',
      onFocusChange: (p) => {
        if (!p) return show('no focused point');
        const lines = [`key: ${p.key}  markId: ${p.markId}`, `group: ${String(p.group)} (${p.groupLabel})  datumIndex: ${p.datumIndex}`, `xValue: ${p.xValue}  yValue: ${p.yValue}`, `x: ${p.x.toFixed(1)}px  y: ${p.y.toFixed(1)}px  color: ${p.color}`];
        show(stage.preview ? lines.slice(0, 3).join('\n') : [...lines, `datum: ${JSON.stringify(p.datum)}`].join('\n'));
      },
    }),
  );
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
