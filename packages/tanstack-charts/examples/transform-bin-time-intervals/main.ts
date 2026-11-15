// binTimeX with utcDay, utcWeek and utcMonth: calendar-aligned bins
import { binTimeX, defineChart, rect } from '@tanstack/charts';
import type { TimeIntervalLike } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import { utcDay, utcMonth, utcWeek } from 'd3';
import type { Mount } from '@/types.ts';
import { makeOrders } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const orders = makeOrders(120);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar: its x1 and x2 are interval boundaries.' });

  const build = (interval: TimeIntervalLike) => {
    const bins = binTimeX(orders, { value: 'createdAt', interval });
    return defineChart({
      marks: [rect(bins, { x1: 'x1', x2: 'x2', y1: () => 0, y2: 'value', fill: '#fb923c', inset: 0.5 })],
      scales: {
        x: { scale: scaleUtc },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Orders' } },
      },
      tooltip,
    });
  };
  const states: readonly (readonly [TimeIntervalLike, string])[] = [[utcDay, 'interval: utcDay'], [utcWeek, 'interval: utcWeek'], [utcMonth, 'interval: utcMonth']];
  lab(stage, { label: 'interval', ariaLabel: 'Orders per time bin', states, build, ms: 1800, after: (_, name) => stage.say(name) });
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
