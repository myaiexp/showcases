// Plot.numberInterval(period): numbers floored onto multiples of a period
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const PERIODS = ['10', '5', '2', '1', '0.5', '-4', '-2'];
const rnd = d3.randomLcg(13);
const values = d3.range(14).map(() => rnd() * 30);

const mount: Mount = (el, ctx) =>
  mountPlot<{ period: string }>(el, ctx, {
    initial: { period: '5' },
    render: ({ period }, { width, height, preview }) => {
      const p = Number(period);
      const interval = Plot.numberInterval(p);
      const rows = values.map((v, i) => ({ v, i, floor: interval.floor(v) }));
      return Plot.plot({
        width,
        height,
        marginTop: 24,
        title: preview ? `numberInterval(${p})` : undefined,
        x: { domain: [0, 30], grid: false },
        y: { axis: null },
        marks: [
          Plot.ruleX(interval.range(0, 30.001), { strokeOpacity: 0.3 }),
          Plot.link(rows, { x1: 'v', x2: 'floor', y: 'i', stroke: 'orange', markerEnd: 'arrow' }),
          Plot.dot(rows, { x: 'v', y: 'i', fill: 'currentColor', r: 2.5 }),
        ],
      });
    },
    step: (_s, i) => ({ period: PERIODS[i % PERIODS.length] }),
    previewMs: 1700,
    controls: (bar, live) => {
      select(bar, 'period', PERIODS, live.state.period, (period) => live.set({ period }));
    },
  });

export default mount;
