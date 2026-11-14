// Axis decoration: splitArea bands, splitLine styles, minorTick and minorSplitLine
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, button, every } from '../../shared/chart.ts';

const DATA = Array.from({ length: 60 }, (_, i) => [i, Math.round(10 ** (1 + (i / 60) * 2.2 + 0.25 * Math.sin(i / 4)))]);

interface Look {
  splitArea: boolean;
  splitLineType: 'solid' | 'dashed' | 'dotted';
  minorTick: boolean;
  minorSplit: boolean;
  minorCount: number;
  yType: 'value' | 'log';
  inside: boolean;
}

function build(look: Look, preview: boolean): EChartsOption {
  // The same decoration options exist on both axes; here they are shared by a helper.
  const decorate = () => ({
    // splitArea: alternating bands between split lines, coloured from areaStyle.color.
    splitArea: { show: look.splitArea, areaStyle: { color: ['rgba(120,140,190,0.10)', 'rgba(120,140,190,0.02)'] } },
    splitLine: { show: true, lineStyle: { type: look.splitLineType, color: 'rgba(255,255,255,0.28)' } },
    // minorTick: small ticks between the main ones; splitNumber is how many segments each gap gets.
    minorTick: { show: look.minorTick, splitNumber: look.minorCount, length: 4 },
    // minorSplitLine: faint grid lines drawn at the minor ticks.
    minorSplitLine: { show: look.minorSplit, lineStyle: { color: 'rgba(255,255,255,0.1)', width: 1 } },
    axisTick: { show: true, inside: look.inside, length: 7 },
  });
  return {
    tooltip: { trigger: 'axis', show: !preview },
    grid: { top: 20, left: 56, right: 24, bottom: 36 },
    xAxis: { type: 'value', min: 0, max: 60, ...decorate() },
    yAxis: { type: look.yType, ...(look.yType === 'log' ? { min: 1 } : {}), ...decorate() },
    series: [{ type: 'line', showSymbol: false, smooth: true, lineStyle: { width: 3 }, data: DATA }],
  };
}

const mount: Mount = (el, ctx) => {
  const look: Look = { splitArea: true, splitLineType: 'solid', minorTick: true, minorSplit: true, minorCount: 4, yType: 'log', inside: false };
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const show = (): void => {
    chart.setOption(build(look, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1500, () => {
      i++;
      look.splitArea = i % 2 === 0;
      look.minorCount = 2 + (i % 4);
      look.splitLineType = (['solid', 'dashed', 'dotted'] as const)[i % 3]!;
      show();
    });
  } else {
    const toggle = (label: string, key: 'splitArea' | 'minorTick' | 'minorSplit' | 'inside'): void => {
      const b = button(bar!, `${label}: ${look[key] ? 'on' : 'off'}`, () => {
        look[key] = !look[key];
        b.textContent = `${label}: ${look[key] ? 'on' : 'off'}`;
        show();
      });
    };
    toggle('splitArea', 'splitArea');
    toggle('minorTick', 'minorTick');
    toggle('minorSplitLine', 'minorSplit');
    toggle('axisTick.inside', 'inside');
    select(bar!, 'splitLine type', ['solid', 'dashed', 'dotted'], (v) => {
      look.splitLineType = v as Look['splitLineType'];
      show();
    });
    slider(bar!, 'minor splitNumber', [1, 9, 1], look.minorCount, (v) => {
      look.minorCount = v;
      show();
    });
    const yt = select(bar!, 'y type', ['log', 'value'], (v) => {
      look.yType = v as Look['yType'];
      show();
    });
    yt.value = look.yType;
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
