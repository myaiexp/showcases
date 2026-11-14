// A JSON spec whose callbacks are names of registered functions
import VChart from '@visactor/vchart';
import type { Mount } from '@/types.ts';
import { createChart, every, readout } from '../../shared/chart.ts';

const SPEC_JSON = JSON.stringify(
  {
    type: 'bar',
    data: [{ id: 'sales', values: [] }],
    xField: 'month',
    yField: 'delta',
    bar: { style: { fill: 'showcase.json.fill' } },
    label: { visible: true, formatMethod: 'showcase.json.label', style: { fill: '#E6E9F2' } },
    tooltip: { mark: { content: [{ key: 'showcase.json.key', value: 'showcase.json.value' }] } },
  },
  null,
  2,
);

const rows = (k: number): { month: string; delta: number }[] =>
  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => ({ month, delta: ((i * 31 + k * 17) % 70) - 30 }));

const mount: Mount = (el, ctx) => {
  // What a mini program or a server could send as text; the functions stay on the client.
  VChart.registerFunction('showcase.json.fill', (d: { delta: number }) => (d.delta < 0 ? '#f53f3f' : '#00b42a'));
  VChart.registerFunction('showcase.json.label', (v: number) => (v > 0 ? '+' + v : String(v)));
  VChart.registerFunction('showcase.json.key', (d: { month: string }) => 'Month ' + d.month);
  VChart.registerFunction('showcase.json.value', (d: { delta: number }) => d.delta + ' vs last year');

  const spec = JSON.parse(SPEC_JSON) as { data: { values: unknown[] }[] };
  const first = spec.data[0];
  if (first) first.values = rows(0);
  const { vchart, release } = createChart(el, ctx, spec as never, { height: 300 });
  if (!ctx.preview) readout(el).textContent = SPEC_JSON;

  let released = false;
  let k = 0;
  const stop = every(2000, () => {
    if (released) return;
    k += 1;
    void vchart.updateData('sales', rows(k));
  });

  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;
