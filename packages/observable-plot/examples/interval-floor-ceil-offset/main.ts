// floor, ceil and offset of one instant, for a period and a moment you choose
import * as Plot from '@observablehq/plot';
import type { LiteralTimeInterval } from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const PERIODS = ['hour', 'day', 'week', 'month', 'quarter', 'year', '2 days', 'friday'];
// The docs' own sample instant.
const T0 = Date.parse('2013-04-12T12:34:56Z');
const HOUR = 3600e3;

const mount: Mount = (el, ctx) =>
  mountPlot<{ period: string; shift: number }>(el, ctx, {
    initial: { period: 'day', shift: 0 },
    render: ({ period, shift }, { width, height, preview }) => {
      const interval = Plot.utcInterval(period as LiteralTimeInterval);
      const value = new Date(T0 + shift * HOUR);
      const marks = [
        { label: 'offset(value, -2)', at: interval.offset(value, -2), y: 'offset -2' },
        { label: 'floor(value)', at: interval.floor(value), y: 'floor' },
        { label: 'value', at: value, y: 'value' },
        { label: 'ceil(value)', at: interval.ceil(value), y: 'ceil' },
        { label: 'offset(value, 1)', at: interval.offset(value, 1), y: 'offset +1' },
      ];
      const lo = interval.offset(interval.floor(value), -3);
      const hi = interval.offset(interval.ceil(value), 3);
      return Plot.plot({
        width,
        height,
        marginLeft: 70,
        marginTop: 24,
        title: preview ? `utcInterval("${period}")` : undefined,
        x: { type: 'utc', domain: [lo, hi] },
        y: { domain: marks.map((m) => m.y), label: null },
        marks: [
          Plot.ruleX(interval.range(lo, hi), { strokeOpacity: 0.25 }),
          Plot.link(marks.slice(1), { x1: () => value, x2: 'at', y: 'y', stroke: 'orange', markerEnd: 'arrow' }),
          Plot.dot(marks, { x: 'at', y: 'y', fill: (d) => (d.y === 'value' ? 'currentColor' : 'orange') }),
          preview ? null : Plot.text(marks, { x: 'at', y: 'y', text: (d) => Plot.formatIsoDate(d.at), dy: -10, fontSize: 10 }),
        ],
      });
    },
    step: (_s, i) => ({ period: PERIODS[(i >> 1) % PERIODS.length], shift: (i % 2) * 9 }),
    previewMs: 1500,
    controls: (bar, live) => {
      select(bar, 'period', PERIODS, live.state.period, (period) => live.set({ period }));
      slider(bar, 'hours from 2013-04-12T12:34:56Z', [-400, 400, 1], live.state.shift, (shift) => live.set({ shift }));
    },
  });

export default mount;
