// updateIndicatorDataById: drive a donut's centre indicator from code
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, type ISpec } from '../../shared/chart.ts';
import { pick } from '../../shared/components-data.ts';

const DATA = [
  { type: 'Rent', value: 1200 },
  { type: 'Food', value: 640 },
  { type: 'Travel', value: 380 },
  { type: 'Fun', value: 260 },
  { type: 'Savings', value: 520 },
];
type Row = (typeof DATA)[number];
const total = DATA.reduce((s, d) => s + d.value, 0);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const spec = {
    type: 'pie',
    data: [{ id: 'spend', values: DATA }],
    valueField: 'value',
    categoryField: 'type',
    outerRadius: 0.85,
    innerRadius: 0.6,
    padAngle: 0.6,
    legends: { visible: false },
    label: { visible: false },
    indicator: {
      id: 'centre',
      visible: true,
      // trigger 'none': nothing hover- or select-driven, only the datum we push in.
      trigger: 'none',
      title: { visible: true, style: { fill: '#94a3b8', text: (d?: Row) => d?.type ?? 'Total', fontSize: ctx.preview ? 12 : 16 } },
      content: [
        { visible: true, style: { fill: '#f6bd16', fontWeight: 'bold', fontSize: ctx.preview ? 16 : 26, text: (d?: Row) => `${d?.value ?? total}` } },
        { visible: true, style: { fill: '#94a3b8', fontSize: ctx.preview ? 10 : 13, text: (d?: Row) => (d ? `${Math.round((d.value / total) * 100)}% of spend` : 'all categories') } },
      ],
    },
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec);
  let alive = true;
  const show = (d?: Row): void => {
    if (alive) vchart.updateIndicatorDataById('centre', d);
  };
  if (bar) {
    for (const d of DATA) button(bar, d.type, () => show(d));
    button(bar, 'Total', () => show(undefined));
    return () => {
      alive = false;
      release();
    };
  }
  let i = 0;
  const stop = every(1100, () => show(i % 6 === 5 ? undefined : pick(DATA, i++)));
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
