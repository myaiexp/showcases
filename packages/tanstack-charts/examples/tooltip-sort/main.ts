// tooltip.sort: 'visual', 'color-domain', 'focus' or a comparator on grouped rows
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { traffic } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

type Sort = 'visual' | 'color-domain' | 'focus' | 'ascending';
const sorts: readonly Sort[] = ['visual', 'color-domain', 'focus', 'ascending'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a month and read the order of the rows.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart

  const build = (sort: Sort) =>
    defineChart({
      marks: [lineY(traffic, { x: 'date', y: 'value', color: 'series', key: 'id', points: true })],
      scales: {
        x: { scale: scaleUtc },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
      focus: 'group-x',
      tooltip: { use: tooltip, sort: sort === 'ascending' ? (a, b) => a.yValue - b.yValue : sort },
    });
  const options = (sort: Sort) => ({ definition: build(sort), height: stage.height, initialWidth: 640, ariaLabel: 'Requests by channel' });
  const host = stage.own(mountChart(stage.box, options('visual')));

  if (stage.bar) select(stage.bar, 'sort', sorts.map((s) => [s, s === 'ascending' ? 'comparator (lowest first)' : s] as const), (s) => host.update(options(s)));
  else {
    stage.cycle(sorts, 2600, (s) => {
      host.update(options(s));
      stage.say(`sort: ${s}`);
    });
    stage.ghost((t) => [0.1 + 0.8 * t, 0.3 + 0.3 * Math.abs(Math.sin(t * 5))]);
  }
  return () => stage.dispose();
};

export default mount;
