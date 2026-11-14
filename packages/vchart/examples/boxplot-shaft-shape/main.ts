// Box plot shapes: shaftShape line, bar and filled-line
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { boxRows, seeded } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = boxRows(seeded(7), ['Africa', 'Asia', 'Europe', 'Americas'], ['High income', 'Low income']);
const SHAPES = ['line', 'bar', 'filled-line'];

const mount: Mount = (el, ctx) =>
  mountLive<{ shape: string }>(el, ctx, {
    initial: { shape: 'bar' },
    build: ({ shape }) =>
      ({
        type: 'boxPlot',
        data: [{ id: 'data', values }],
        xField: ['x', 'group'],
        seriesField: 'group',
        minField: 'min',
        q1Field: 'q1',
        medianField: 'median',
        q3Field: 'q3',
        maxField: 'max',
        color: ['#62CDFF', '#C5528D'],
        boxPlot: { style: { shaftShape: shape, minMaxFillOpacity: 0.5 } },
        legends: [{ visible: !ctx.preview, orient: 'top' }],
      }) as ISpec,
    controls: (bar, live) => {
      select(bar, 'shaftShape', SHAPES, (shape) => live.set({ shape })).value = 'bar';
    },
    step: (_s, i) => ({ shape: SHAPES[i % SHAPES.length] ?? 'line' }),
    mode: 'rebuild',
    previewMs: 1500,
  });

export default mount;
