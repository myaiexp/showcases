// Indicator card in a donut: title and content text callbacks, updated by the trigger option
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';
import { pick } from '../../shared/components-data.ts';

const data = [
  { type: 'oxygen', value: 46.6, formula: 'O' },
  { type: 'silicon', value: 27.7, formula: 'Si' },
  { type: 'aluminum', value: 8.1, formula: 'Al' },
  { type: 'iron', value: 5, formula: 'Fe' },
  { type: 'calcium', value: 3.6, formula: 'Ca' },
  { type: 'others', value: 9, formula: '...' },
];

type Datum = Record<string, unknown> | undefined;
const row = (d: Datum): (typeof data)[number] => (d as (typeof data)[number] | undefined) ?? (data[0] as (typeof data)[number]);

const build = (trigger: 'hover' | 'select' | 'none'): ISpec => ({
  type: 'pie',
  data: [{ id: 'elements', values: data }],
  valueField: 'value',
  categoryField: 'type',
  outerRadius: 0.8,
  innerRadius: 0.55,
  padAngle: 0.6,
  pie: { state: { hover: { outerRadius: 0.85 }, selected: { outerRadius: 0.85 } } },
  legends: { visible: false },
  indicator: {
    visible: true,
    trigger,
    limitRatio: 0.5,
    // The datum is the hovered or selected slice; undefined means nothing is, so show the first row.
    title: {
      visible: true,
      autoFit: true,
      style: { fontWeight: 'bold', fill: '#94a3b8', text: (d: Datum) => row(d).formula },
    },
    content: [
      { visible: true, style: { fontSize: 18, fill: '#fbbf24', fontWeight: 'bold', text: (d: Datum) => row(d).type } },
      { visible: true, style: { fontSize: 16, fill: '#fbbf24', text: (d: Datum) => `${row(d).value}%` } },
    ],
  },
});

const mount: Mount = (el, ctx) => {
  // A card has no pointer, so it runs the same indicator off the select trigger and setSelected.
  const { vchart, release } = createChart(el, ctx, build(ctx.preview ? 'select' : 'hover'));
  let released = false;

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1200, () => {
      i += 1;
      vchart.setSelected({ type: pick(data, i).type });
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'indicator.trigger', ['hover', 'select', 'none'], (v) => {
      if (!released) void vchart.updateSpec(build(v as 'hover' | 'select' | 'none'));
    });
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
