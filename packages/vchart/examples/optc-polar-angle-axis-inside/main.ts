// Polar angle axis with inside: true, drawn in the hole of a donut rose
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const VALUES = [30, 28, 40, 55, 70, 85, 92, 88, 66, 50, 38, 32];

const mount: Mount = (el, ctx) =>
  mountLive<{ inside: boolean }>(el, ctx, {
    initial: { inside: true },
    previewMs: 1800,
    step: (s) => ({ inside: !s.inside }),
    build: (s, preview) => ({
      type: 'rose',
      data: [{ id: 'd', values: MONTHS.map((m, i) => ({ month: m, value: VALUES[i] })) }],
      categoryField: 'month',
      valueField: 'value',
      outerRadius: 0.9,
      innerRadius: 0.5,
      axes: [
        { orient: 'radius', visible: false },
        {
          orient: 'angle',
          inside: s.inside,
          label: { visible: true, style: { fontSize: preview ? 9 : 12 } },
          domainLine: { visible: true, style: { stroke: '#fbbf24' } },
          tick: { visible: true, tickSize: 5, style: { stroke: '#fbbf24' } },
        },
      ],
    }),
    controls: (bar, live) => {
      select(bar, 'inside', ['true', 'false'], (v) => live.set({ inside: v === 'true' }));
    },
  });

export default mount;
