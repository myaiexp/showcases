// Re-initialises a time-axis chart with a locale registered from the package's i18n objects
import type { Mount } from '@/types.ts';
import langAR from 'echarts/lib/i18n/langAR.js';
import langDE from 'echarts/lib/i18n/langDE.js';
import langFA from 'echarts/lib/i18n/langFA.js';
import langNL from 'echarts/lib/i18n/langNL.js';
import langSV from 'echarts/lib/i18n/langSV.js';
import langUK from 'echarts/lib/i18n/langUK.js';
import { THEME, controlBar, echarts, every, select } from '../../shared/chart.ts';

// 'EN' and 'ZH' are built in. Others are registered once under a name of our choosing
// (page-wide, so the names carry a prefix); 5.4 added Ukrainian, 5.5 Arabic and Dutch,
// 5.6 Swedish and Persian.
const packs: Record<string, object> = { DE: langDE, NL: langNL, UK: langUK, AR: langAR, SV: langSV, FA: langFA };
for (const [code, pack] of Object.entries(packs)) echarts.registerLocale(`locale-demo-${code}`, pack as Parameters<typeof echarts.registerLocale>[1]);

const localeName = (code: string): string => (code === 'EN' || code === 'ZH' ? code : `locale-demo-${code}`);

// One point per month of 2025; the time axis labels month names from the active locale.
const series = (scale: number): [number, number][] =>
  Array.from({ length: 12 }, (_, m) => [Date.UTC(2025, m, 1), Math.round(40 + 30 * Math.sin(m / 2 + scale) + m * 2)]);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const box = document.createElement('div');
  box.style.cssText = `width:100%;height:${ctx.preview ? 200 : 360}px`;
  el.append(box);

  let chart: echarts.ECharts | null = null;
  const show = (code: string): void => {
    chart?.dispose();
    // locale is an init option: changing language means creating the instance again.
    chart = echarts.init(box, THEME, { locale: localeName(code) });
    chart.setOption({
      animation: false,
      // selector adds "all" and "inverse" buttons, whose text comes from the locale.
      legend: { selector: true, bottom: 0, itemWidth: 14 },
      grid: { top: 16, left: 40, right: 20, bottom: ctx.preview ? 52 : 60 },
      xAxis: { type: 'time' },
      yAxis: {},
      series: [
        { name: 'A', type: 'line', data: series(0), showSymbol: false },
        { name: 'B', type: 'line', data: series(2), showSymbol: false },
      ],
    });
  };
  show('EN');

  const ro = new ResizeObserver(() => {
    if (box.clientWidth > 0 && box.clientHeight > 0) chart?.resize();
  });
  ro.observe(box);

  let stop = (): void => {};
  const codes = ['EN', 'ZH', 'DE', 'NL', 'UK', 'AR', 'SV', 'FA'];
  if (ctx.preview) {
    let i = 0;
    stop = every(1800, () => show(codes[++i % codes.length]!));
  } else {
    select(bar!, 'locale', codes, show);
  }

  return () => {
    stop();
    ro.disconnect();
    chart?.dispose();
    box.remove();
  };
};

export default mount;
