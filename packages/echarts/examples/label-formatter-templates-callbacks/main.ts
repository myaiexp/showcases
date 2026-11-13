// Bar labels formatted by string templates, a params callback, a rich-text callback and a hiding callback
import type { DefaultLabelFormatterCallbackParams as Params, EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const source = [
  ['product', 'score', 'amount', 'region'],
  ['Matcha Latte', 89.3, 58212, 'North'],
  ['Milk Tea', 57.1, 78254, 'East'],
  ['Cheese Cocoa', 74.4, 41032, 'South'],
  ['Walnut Brownie', 32.7, 20112, 'West'],
  ['Orange Juice', 19.6, 91852, 'North'],
];

// The formatter is either a template string or a callback; \n starts a new line in both.
const formatters: Record<string, string | ((p: Params) => string)> = {
  '{b}: {c}': '{b}: {c}',
  '{a} (series name)\n{@score}': '{a}\n{@score}',
  '{@amount} (by dimension name)': '{@amount}',
  '{@[3]} (by dimension index)': '{@[3]}',
  'callback: params': (p: Params) => `#${(p.dataIndex ?? 0) + 1} ${p.name}\n${(p.value as (string | number)[])[1]}`,
  'callback: rich text': (p: Params) => {
    const v = p.value as (string | number)[];
    return `{name|${p.name}}\n{big|${v[1]}} {unit|pts}`;
  },
  'callback: hide when score < 30': (p: Params) => {
    const score = (p.value as (string | number)[])[1] as number;
    return score < 30 ? '' : String(score);
  },
};

function build(key: string, preview: boolean): EChartsOption {
  return {
    grid: { top: 40, left: 40, right: 16, bottom: preview ? 24 : 30 },
    dataset: { source },
    xAxis: { type: 'category', axisLabel: { interval: 0, fontSize: preview ? 9 : 12 } },
    yAxis: { max: 120 },
    series: [
      {
        name: 'Score',
        type: 'bar',
        encode: { x: 'product', y: 'score' },
        label: {
          show: true,
          position: 'top',
          fontSize: preview ? 9 : 12,
          formatter: formatters[key],
          // Styles used by the rich-text callback: {name|...}, {big|...}, {unit|...}.
          rich: {
            name: { color: '#aaa', fontSize: 10, lineHeight: 14 },
            big: { fontSize: 16, fontWeight: 'bold', color: '#fac858' },
            unit: { fontSize: 10, color: '#aaa' },
          },
        },
      },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const keys = Object.keys(formatters);
  let key = keys[0]!;
  const show = (): void => {
    chart.setOption(build(key, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1800, () => {
      key = keys[++i % keys.length]!;
      show();
    });
  } else {
    select(bar!, 'formatter', keys, (v) => {
      key = v;
      show();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
