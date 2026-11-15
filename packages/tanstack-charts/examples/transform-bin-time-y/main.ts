// binTimeY: calendar bins on the vertical axis
import { binTimeY, defineChart, rect } from '@tanstack/charts';
import type { TimeIntervalLike } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import { utcMonth, utcWeek } from 'd3';
import type { Mount } from '@/types.ts';
import { makeOrders } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const orders = makeOrders(120);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar for the count.' });

  const build = (interval: TimeIntervalLike) =>
    defineChart({
      marks: [rect(binTimeY(orders, { value: 'createdAt', interval }), { y1: 'y1', y2: 'y2', x1: () => 0, x2: 'value', fill: '#22d3ee', inset: 0.5 })],
      scales: {
        x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Orders' } },
        y: { scale: scaleUtc },
      },
      tooltip,
    });
  const states: readonly (readonly [TimeIntervalLike, string])[] = [[utcWeek, 'interval: utcWeek'], [utcMonth, 'interval: utcMonth']];
  lab(stage, { label: 'interval', ariaLabel: 'Orders per time bin, vertical', states, build, after: (_, name) => stage.say(name) });
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
