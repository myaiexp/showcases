// binTimeX domain: the data extent against a wider fixed range of dates
import { binTimeX, defineChart, rect } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { utcWeek } from 'd3';
import type { Mount } from '@/types.ts';
import { makeOrders } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const orders = makeOrders(60).filter((o) => o.createdAt.getUTCDate() % 9 < 6 || o.createdAt.getUTCMonth() === 0);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (domain: readonly [Date, Date] | undefined) => {
    const bins = binTimeX(orders, { value: 'createdAt', interval: utcWeek, domain });
    return defineChart({
      marks: [rect(bins, { x1: 'x1', x2: 'x2', y1: () => 0, y2: 'value', fill: '#f87171', inset: 0.5 })],
      scales: { x: { scale: scaleUtc }, y: { scale: scaleLinear().domain([0, 40]), grid: true, axis: { label: 'Orders per week' } } },
    });
  };
  const states: readonly (readonly [readonly [Date, Date] | undefined, string])[] = [
    [undefined, 'no domain: the data extent'],
    [[new Date('2024-12-01T00:00:00Z'), new Date('2025-05-01T00:00:00Z')], 'domain: Dec 2024 to May 2025'],
  ];
  lab(stage, { label: 'domain', ariaLabel: 'Orders per week', states, build, ms: 2400, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
