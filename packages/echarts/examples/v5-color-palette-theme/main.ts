// Two charts on the same data: the gallery's v6-palette dark theme next to a theme holding only the v5 palette
import darkTheme from 'echarts/lib/theme/dark.js';
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { THEME, controlBar, createChart, echarts, every, select } from '../../shared/chart.ts';

// The nine colours from the upgrade guide's colorPaletteV5.
const colorPaletteV5 = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];

// Only the palette is v5; the rest of the dark theme (and its transparent background) stays.
// The theme name is unique to this example because themes are registered page-wide.
const V5_THEME = 'v5-palette-demo';
echarts.registerTheme(V5_THEME, { ...darkTheme, backgroundColor: 'transparent', color: colorPaletteV5 });

type Kind = 'bar' | 'line' | 'pie';
const names = ['Search', 'Direct', 'Email', 'Ads', 'Video', 'Social', 'Referral', 'Partners', 'Print'];

function build(kind: Kind, values: number[], title: string): EChartsOption {
  const common = { title: { text: title, left: 'center', textStyle: { fontSize: 13 } } };
  if (kind === 'pie') {
    return { ...common, series: [{ type: 'pie', radius: ['30%', '62%'], center: ['50%', '56%'], label: { show: false }, data: names.map((n, i) => ({ name: n, value: values[i]! })) }] };
  }
  return {
    ...common,
    grid: { top: 36, left: 34, right: 10, bottom: 24 },
    xAxis: { type: 'category', data: names.map((n) => n.slice(0, 3)) },
    yAxis: {},
    // colorBy 'data' gives each of the nine items its own palette colour, so the whole palette shows.
    series: [{ type: kind, colorBy: 'data', data: values, ...(kind === 'line' ? { symbolSize: 10, lineStyle: { color: '#888' } } : {}) }],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:8px;width:100%';
  el.append(row);
  const half = (): HTMLDivElement => {
    const d = document.createElement('div');
    d.style.cssText = 'flex:1;min-width:0';
    row.append(d);
    return d;
  };
  const opts = { height: 340, previewHeight: 200 };
  const a = createChart(half(), ctx, { ...opts, theme: THEME, parent: row.children[0] as HTMLElement });
  const b = createChart(half(), ctx, { ...opts, theme: V5_THEME, parent: row.children[1] as HTMLElement });

  let kind: Kind = 'bar';
  let values = [30, 22, 18, 40, 25, 35, 28, 19, 33];
  const show = (): void => {
    a.chart.setOption(build(kind, values, 'v6 palette'), true);
    b.chart.setOption(build(kind, values, 'v5 palette theme'), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    const kinds: Kind[] = ['bar', 'pie', 'line'];
    let i = 0;
    stop = every(2200, () => {
      kind = kinds[++i % kinds.length]!;
      show();
    });
  } else {
    select(bar!, 'series', ['bar', 'line', 'pie'], (v) => {
      kind = v as Kind;
      show();
    });
  }
  return () => {
    stop();
    a.dispose();
    b.dispose();
    row.remove();
  };
};

export default mount;
