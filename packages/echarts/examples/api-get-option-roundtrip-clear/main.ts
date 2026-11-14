// Copy a chart, with its zoom and legend state, into a second chart via getOption; then clear the first
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, button, every } from '../../shared/chart.ts';

const xs = Array.from({ length: 60 }, (_, i) => `d${i + 1}`);
const wave = (phase: number, amp: number): number[] => xs.map((_, i) => Math.round(50 + amp * Math.sin(i / 6 + phase)));

function option(slider: boolean): EChartsOption {
  return {
    legend: { bottom: 0 },
    tooltip: { trigger: 'axis' },
    grid: { top: 12, left: 40, right: 16, bottom: slider ? 76 : 40 },
    dataZoom: slider ? [{ type: 'slider', start: 0, end: 100 }, { type: 'inside' }] : [{ type: 'inside', start: 0, end: 100 }],
    xAxis: { type: 'category', data: xs },
    yAxis: { type: 'value' },
    series: [
      { name: 'Alpha', type: 'line', showSymbol: false, data: wave(0, 30) },
      { name: 'Beta', type: 'line', showSymbol: false, data: wave(2, 22) },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const h = ctx.preview ? 100 : 230;
  const src = createChart(el, ctx, { height: h, previewHeight: h });
  const copy = createChart(el, ctx, { height: h, previewHeight: h });
  src.chart.setOption(option(!ctx.preview));

  // getOption: everything merged so far plus interaction state (zoom range, legend switches).
  // It is undefined before the first setOption, hence the guard; components come back as arrays.
  const clone = (): void => {
    const current = src.chart.getOption();
    if (!current) return;
    copy.chart.setOption(current as EChartsOption, true);
  };

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1500, () => {
      i += 1;
      const start = (i % 4) * 15;
      src.chart.dispatchAction({ type: 'dataZoom', start, end: start + 40 });
      src.chart.dispatchAction({ type: i % 3 === 0 ? 'legendUnSelect' : 'legendSelect', name: 'Beta' });
      clone();
    });
    clone();
  } else {
    const log = document.createElement('pre');
    log.style.cssText = 'margin:8px 0 0;font-size:12px;white-space:pre-wrap';
    const read = (when: string): void => {
      const opt = src.chart.getOption() as
        | { series?: unknown[]; dataZoom?: { start?: number; end?: number }[]; legend?: { selected?: Record<string, boolean> }[] }
        | undefined;
      if (!opt) {
        log.textContent = `${when}\ngetOption() returned ${String(opt)}`;
        return;
      }
      const z = opt.dataZoom?.[0];
      log.textContent = [
        when,
        `series: ${opt.series?.length ?? 0}`,
        `dataZoom[0]: start ${z?.start?.toFixed(1) ?? '-'}, end ${z?.end?.toFixed(1) ?? '-'}`,
        `legend[0].selected: ${JSON.stringify(opt.legend?.[0]?.selected ?? {})}`,
        `components in the returned option: ${Object.keys(opt).join(', ')}`,
      ].join('\n');
    };
    button(bar!, 'getOption: read state', () => read('getOption() on the first chart'));
    button(bar!, 'copy to second chart', () => {
      clone();
      read('copied: second chart = setOption(getOption())');
    });
    button(bar!, 'zoom first chart to 20-50%', () => src.chart.dispatchAction({ type: 'dataZoom', start: 20, end: 50 }));
    button(bar!, 'clear() first chart', () => {
      src.chart.clear();
      read('after clear(): removes every component and series');
    });
    button(bar!, 'restore first chart', () => {
      src.chart.setOption(option(true), true);
      read('restored with setOption');
    });
    el.append(log);
    read('getOption() on the first chart');
  }

  return () => {
    stop();
    src.dispose();
    copy.dispose();
  };
};

export default mount;
