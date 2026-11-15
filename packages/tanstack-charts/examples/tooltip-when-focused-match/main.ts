// whenFocused(dot(...), { match }) over a line chart with group-x focus, one match mode at a time
import { defineChart, dot, lineY, mountChart, whenFocused } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { traffic } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

type Match = 'primary' | 'group' | 'key' | 'x' | 'y' | 'series';
const matches: readonly Match[] = ['primary', 'group', 'key', 'x', 'y', 'series'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a point: the large dots are the rows that match the chosen mode.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart

  const build = (match: Match) =>
    defineChart({
      marks: [
        lineY(traffic, { x: 'date', y: 'value', color: 'series', key: 'id', strokeWidth: 1.5 }),
        whenFocused(dot(traffic, { x: 'date', y: 'value', color: 'series', key: 'id', r: 7, fillOpacity: 0.85 }), { match }),
      ],
      scales: {
        x: { scale: scaleUtc },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Requests (thousands)' } },
      },
      focus: 'group-x',
      tooltip,
    });
  const options = (match: Match) => ({ definition: build(match), height: stage.height, initialWidth: 640, ariaLabel: 'Requests by channel' });
  const host = stage.own(mountChart(stage.box, options('primary')));

  if (stage.bar) select(stage.bar, 'match', matches.map((m) => [m, m] as const), (m) => host.update(options(m)));
  else {
    stage.cycle(matches, 2400, (m) => {
      host.update(options(m));
      stage.say(`match: '${m}'`);
    });
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
