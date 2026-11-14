// Region style: a stacked line chart whose region is outlined with region.style
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { seeded, type Datum } from '../../shared/concepts-data.ts';

const TYPES = ['Nail polish', 'Rouge', 'Lipstick', 'Eyeliner', 'Foundation', 'Mascara'];
const COUNTRIES = ['Africa', 'EU', 'China', 'USA'];
const rand = seeded(3);
const values = (): Datum[] =>
  TYPES.flatMap((type) => COUNTRIES.map((country) => ({ type, country, value: Math.round(3000 + rand() * 12000) })));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  let stack = true;
  let stroke = '#1971c2';
  let lineWidth = 2;
  const spec = (): ISpec => ({
    type: 'line',
    data: { id: 'sales', values: values() },
    title: { visible: !ctx.preview, text: stack ? 'Stacked line chart' : 'Line chart' },
    stack,
    xField: 'type',
    yField: 'value',
    seriesField: 'country',
    legends: [{ visible: !ctx.preview, position: 'middle', orient: 'bottom' }],
    region: [{ style: { stroke, lineWidth } }],
  });
  const chart = createChart(el, ctx, spec());
  let alive = true;
  const restyle = (): void => {
    if (alive) void chart.vchart.updateSpec(spec());
  };

  const stop = every(ctx.preview ? 1800 : 3500, () => {
    if (alive) void chart.vchart.updateData('sales', values());
  });
  if (bar) {
    select(bar, 'region stroke', ['#1971c2', '#e8590c', '#2f9e44'], (v) => {
      stroke = v;
      restyle();
    });
    slider(bar, 'lineWidth', [0, 8, 1], lineWidth, (v) => {
      lineWidth = v;
      restyle();
    });
    select(bar, 'stack', ['true', 'false'], (v) => {
      stack = v === 'true';
      restyle();
    });
  }
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
