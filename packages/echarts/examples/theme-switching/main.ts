// setTheme switches a live chart between built-in and registered themes without re-init
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { THEME, controlBar, createChart, echarts, every, select } from '../../shared/chart.ts';

// A theme is a plain object of option defaults. Registered by name, any chart can use it.
echarts.registerTheme('sunset', {
  color: ['#ff7a45', '#ffc53d', '#f759ab', '#9254de', '#36cfc9'],
  backgroundColor: '#2b1a2f',
  textStyle: { color: '#f4dcd0' },
  title: { textStyle: { color: '#ffd8bf' } },
  categoryAxis: { axisLine: { lineStyle: { color: '#8c5c74' } }, splitLine: { show: false } },
  valueAxis: { splitLine: { lineStyle: { color: '#4a2f45' } } },
});

// 'default' and 'dark' ship with ECharts 6; THEME is this gallery's transparent dark.
const THEMES = ['default', 'dark', 'sunset', THEME] as const;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const option = (preview: boolean): EChartsOption => ({
  title: preview ? undefined : { text: 'Visitors and signups' },
  tooltip: { trigger: 'axis' },
  legend: preview ? undefined : { top: 4, right: 10 },
  grid: preview ? { top: 14, bottom: 22, left: 36, right: 10 } : undefined,
  xAxis: { type: 'category', data: months },
  yAxis: { type: 'value' },
  series: [
    { name: 'Visitors', type: 'bar', data: [120, 200, 150, 80, 70, 110, 130, 180] },
    { name: 'Signups', type: 'line', smooth: true, data: [60, 90, 120, 70, 50, 80, 110, 150] },
    { name: 'Returns', type: 'line', data: [20, 40, 30, 50, 40, 60, 70, 65] },
  ],
});

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  // The setTheme caveat: options merged over several setOption calls are lost when the
  // theme changes, so the whole option goes in one notMerge call.
  chart.setOption(option(ctx.preview), { notMerge: true });

  // chart.setTheme (new in 6.0) re-themes the running instance; before 6 this meant
  // dispose() and init() again, replaying the entry animation.
  const apply = (name: string): void => chart.setTheme(name);

  if (ctx.preview) {
    let i = THEMES.length - 1;
    const stop = every(2000, () => {
      i = (i + 1) % THEMES.length;
      apply(THEMES[i]!);
    });
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'theme', THEMES, apply).value = THEME;

  // Following the system colour scheme, as the v6 release notes show.
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  const follow = document.createElement('label');
  const box = document.createElement('input');
  box.type = 'checkbox';
  follow.append(box, ' follow prefers-color-scheme');
  bar!.append(follow);
  const onScheme = (): void => {
    if (box.checked) apply(query.matches ? 'dark' : 'default');
  };
  box.addEventListener('change', onScheme);
  query.addEventListener('change', onScheme);

  return () => {
    query.removeEventListener('change', onScheme);
    dispose();
  };
};

export default mount;
