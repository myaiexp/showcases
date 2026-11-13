// echarts/core with use() and only the needed parts, with the option typed by ComposeOption
import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import { DatasetComponent, GridComponent, TitleComponent, TooltipComponent, TransformComponent } from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type { BarSeriesOption, LineSeriesOption } from 'echarts/charts';
import type { DatasetComponentOption, GridComponentOption, TitleComponentOption, TooltipComponentOption } from 'echarts/components';
import type { ComposeOption } from 'echarts/core';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every } from '../../shared/chart.ts';

// Only the series and components that were registered are allowed in the option type.
// Writing `type: 'pie'` below would be a compile error: PieSeriesOption is not in the union.
type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// Registers the parts. The tree-shakeable interface ships no renderer, so CanvasRenderer
// (or SVGRenderer) is a required step. This gallery already loads the whole library, so
// here use() is a harmless repeat; in an app it is what keeps the bundle small.
echarts.use([
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

const products = ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks'];

function build(kind: 'bar' | 'line', sales: number[], preview: boolean): ECOption {
  return {
    title: { text: preview ? '' : `${kind} series, typed ECOption` },
    tooltip: {},
    grid: { top: preview ? 16 : 56, left: 40, right: 16, bottom: 30 },
    // DatasetComponent: the series reads its columns from here.
    dataset: { source: [['product', 'sales'], ...products.map((p, i) => [p, sales[i] ?? 0])] },
    xAxis: { type: 'category' },
    yAxis: {},
    series: [{ type: kind, universalTransition: true, encode: { x: 'product', y: 'sales' } }],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let kind: 'bar' | 'line' = 'bar';
  let sales = [5, 20, 36, 10, 10, 20];
  const random = (): number[] => products.map(() => Math.round(5 + Math.random() * 35));
  const show = (): void => {
    // Series type changes need the same series id to morph; notMerge keeps one series only.
    chart.setOption(build(kind, sales, ctx.preview), true);
  };
  show();

  const toggleKind = (): void => {
    kind = kind === 'bar' ? 'line' : 'bar';
    show();
  };
  let stop: () => void;
  if (ctx.preview) {
    let n = 0;
    stop = every(1800, () => {
      sales = random();
      if (++n % 2 === 0) kind = kind === 'bar' ? 'line' : 'bar';
      show();
    });
  } else {
    button(bar!, 'switch bar / line', toggleKind);
    button(bar!, 'new data', () => {
      sales = random();
      show();
    });
    const note = document.createElement('p');
    note.style.cssText = 'margin:0;font-size:13px;opacity:.8';
    note.textContent = 'Registered: BarChart, LineChart, Title, Tooltip, Grid, Dataset, Transform, LabelLayout, UniversalTransition, CanvasRenderer.';
    bar!.append(note);
    stop = (): void => {};
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
