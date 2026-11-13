// Bullet chart: a custom series reading dataset columns by encode and dimensions, with sorting and band controls
import type { CustomSeriesRenderItem } from 'echarts';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const METRICS = ['Revenue', 'Profit', 'Orders', 'Sessions', 'Signups'];
const DIMENSIONS = ['metric', 'actual', 'target', 'poor', 'ok', 'good'];
type Row = [string, number, number, number, number, number];

/** One row per metric: actual, target and the three qualitative range limits. */
function rows(): Row[] {
  return METRICS.map((m): Row => {
    const good = 100;
    const ok = Math.round(55 + Math.random() * 20);
    const poor = Math.round(ok * (0.4 + Math.random() * 0.3));
    return [m, Math.round(30 + Math.random() * 65), Math.round(60 + Math.random() * 30), poor, ok, good];
  });
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let source = rows();
  let sort: 'as given' | 'actual' | 'actual vs target' = 'as given';
  let bands = true;
  let thickness = 0.3;

  /** Columns are read by index: 1 actual, 2 target, 3 to 5 the range limits. */
  const renderItem: CustomSeriesRenderItem = (_params, api) => {
    const row = api.value(0) as unknown as string;
    const band = (from: number, to: number, fill: string) => {
      const [x0, y] = api.coord([from, row]) as [number, number];
      const [x1] = api.coord([to, row]) as [number, number];
      const h = (api.size!([0, 1]) as number[])[1]! * 0.7;
      return { type: 'rect' as const, shape: { x: x0, y: y - h / 2, width: x1 - x0, height: h }, style: { fill } };
    };
    const [tx, ty] = api.coord([api.value(2), row]) as [number, number];
    const slot = (api.size!([0, 1]) as number[])[1]!;
    const children = [];
    if (bands) {
      children.push(band(0, api.value(5) as number, '#3a3f4b'), band(0, api.value(4) as number, '#4a505e'), band(0, api.value(3) as number, '#5d6474'));
    }
    const actual = band(0, api.value(1) as number, api.visual('color') as string);
    // The actual bar is thinner than the bands, centred on the same row.
    actual.shape.y += (actual.shape.height * (1 - thickness)) / 2;
    actual.shape.height *= thickness;
    children.push(actual, {
      type: 'line' as const,
      shape: { x1: tx, y1: ty - slot * 0.3, x2: tx, y2: ty + slot * 0.3 },
      style: { stroke: '#fff', lineWidth: 3 },
    });
    return { type: 'group', children };
  };

  const show = (): void => {
    const sorted = [...source];
    if (sort === 'actual') sorted.sort((a, b) => b[1] - a[1]);
    if (sort === 'actual vs target') sorted.sort((a, b) => b[1] / b[2] - a[1] / a[2]);
    chart.setOption({
      tooltip: { show: !ctx.preview },
      grid: { top: 10, left: 70, right: 20, bottom: ctx.preview ? 24 : 40 },
      // The dataset holds the table; the series picks columns with encode.
      dataset: { source: sorted },
      xAxis: { type: 'value', min: 0, max: 100 },
      yAxis: { type: 'category', inverse: true },
      series: [
        {
          type: 'custom',
          renderItem,
          // Column names for the tooltip, and which columns feed which axis. The y axis takes
          // the category column; the x extent comes from every numeric column listed.
          dimensions: DIMENSIONS,
          encode: { x: [1, 2, 3, 4, 5], y: 0, tooltip: [1, 2] },
        },
      ],
    });
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(2000, () => {
      source = rows();
      show();
    });
  } else {
    select(bar!, 'sort', ['as given', 'actual', 'actual vs target'], (v) => {
      sort = v as typeof sort;
      show();
    });
    select(bar!, 'qualitative bands', ['on', 'off'], (v) => {
      bands = v === 'on';
      show();
    });
    slider(bar!, 'bar thickness', [0.1, 0.6, 0.05], thickness, (v) => {
      thickness = v;
      show();
    });
    button(bar!, 'new data', () => {
      source = rows();
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
