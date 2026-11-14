// A grid layout with one region and left axis per row, one shared bottom axis and one legend
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const METRICS = ['temperature', 'humidity', 'wind'];

const mount: Mount = (el, ctx) => {
  const rows = ctx.preview ? 2 : 3;
  const metrics = METRICS.slice(0, rows);
  const r = rng(8);
  const rowsData = (m: string) =>
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].flatMap((date) => ['high', 'low'].map((kind) => ({ date, type: `${m} ${kind}`, value: Math.round(10 + r() * 30 + (kind === 'high' ? 15 : 0)) })));
  const leftCommon = { expand: { max: 0.2 }, label: { flush: true, visible: true }, tick: { visible: false }, forceTickCount: 3 };
  const { vchart, release } = createChart(el, ctx, {
    type: 'common',
    layout: {
      type: 'grid',
      col: 2,
      row: rows + 1 + (ctx.preview ? 0 : 1),
      elements: [
        ...metrics.flatMap((m, i) => [
          { modelId: m, col: 1, row: i },
          { modelId: `${m}-left`, col: 0, row: i },
        ]),
        { modelId: 'axis-bottom', col: 1, row: rows },
        ...(ctx.preview ? [] : [{ modelId: 'legend', col: 0, colSpan: 2, row: rows + 1 }]),
      ],
    },
    region: metrics.map((id) => ({ id })),
    legends: { visible: !ctx.preview, id: 'legend', orient: 'bottom', regionId: metrics },
    series: metrics.map((m) => ({ type: 'line', regionId: m, seriesField: 'type', data: { id: m, values: rowsData(m) }, xField: 'date', yField: 'value' })),
    axes: [
      ...metrics.map((m) => ({ id: `${m}-left`, regionId: m, orient: 'left', title: { visible: !ctx.preview, text: m }, ...leftCommon })),
      { id: 'axis-bottom', regionId: metrics, orient: 'bottom', label: { visible: true, firstVisible: true, lastVisible: true }, tick: { visible: false }, paddingInner: 0.99, paddingOuter: 0 },
    ],
  } as never);
  let alive = true;
  const stop = every(2400, () => {
    if (!alive) return;
    for (const m of metrics) void vchart.updateData(m, rowsData(m));
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
