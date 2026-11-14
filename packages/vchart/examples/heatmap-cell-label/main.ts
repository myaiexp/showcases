// Heatmap cells: value labels, rounded cells with a stroke, a cellBackground track
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { slider } from '../../shared/chart.ts';
import { seeded } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const rand = seeded(61);
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const values = ['Dawn', 'Noon', 'Dusk', 'Night'].flatMap((part) => DAYS.map((day) => ({ day, part, value: Math.round(rand() * 99) })));

const mount: Mount = (el, ctx) =>
  mountLive<{ radius: number }>(el, ctx, {
    initial: { radius: 8 },
    build: ({ radius }) =>
      ({
        type: 'common',
        data: [{ id: 'data', values }],
        series: [
          {
            type: 'heatmap',
            xField: 'day',
            yField: 'part',
            valueField: 'value',
            cell: { style: { fill: { field: 'value', scale: 'color' }, cornerRadius: radius, stroke: '#14161a', lineWidth: 3 } },
            cellBackground: { visible: true, style: { fill: 'rgba(255,255,255,0.08)', cornerRadius: radius } },
            label: { visible: true, style: { fontSize: ctx.preview ? 10 : 14 } },
          },
        ],
        color: { type: 'linear', domain: [{ dataId: 'data', fields: ['value'] }], range: ['#1e3a8a', '#38bdf8', '#fde047'] },
        axes: [
          { orient: 'bottom', type: 'band', grid: { visible: false }, domainLine: { visible: false }, bandPadding: 0 },
          { orient: 'left', type: 'band', grid: { visible: false }, domainLine: { visible: false }, bandPadding: 0 },
        ],
      }) as ISpec,
    controls: (bar, live) => {
      slider(bar, 'cornerRadius', [0, 24, 1], 8, (radius) => live.set({ radius }));
    },
    step: (_s, i) => ({ radius: [0, 10, 20, 6][i % 4] ?? 8 }),
    previewMs: 1300,
  });

export default mount;
