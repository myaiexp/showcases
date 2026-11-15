// onFocusChange and onFocusGroupChange read back into the readout
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { traffic } from '../../shared/interact-data.ts';
import { reader } from '../../shared/interact-read.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover or use the arrow keys: the readout shows the primary point and its group.' });
  if (stage.preview) stage.height -= 36; // leaves room for the caption lines under the chart
  const show = reader(stage);
  let primary = 'none';
  let group = '[]';
  const update = (): void => show(stage.preview ? `${primary}\n${group}` : `onFocusChange: ${primary}\nonFocusGroupChange: ${group}`);
  update();

  const definition = defineChart({
    marks: [lineY(traffic, { x: 'date', y: 'value', color: 'series', key: 'id', points: true })],
    scales: {
      x: { scale: scaleUtc },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    focus: 'group-x',
    tooltip,
  });

  stage.own(
    mountChart(stage.box, {
      definition,
      height: stage.height,
      initialWidth: 640,
      ariaLabel: 'Requests by channel',
      onFocusChange: (point) => {
        primary = point ? `${point.datum.series} ${point.datum.month} = ${point.datum.value}` : 'null';
        update();
      },
      onFocusGroupChange: (points) => {
        group = `[${points.map((p) => `${p.datum.series} ${p.datum.value}`).join(', ')}]`;
        update();
      },
    }),
  );
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
