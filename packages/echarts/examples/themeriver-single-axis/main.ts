// ThemeRiver streams laid out on a singleAxis, with a generated time series per theme
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';

const themes = ['Rock', 'Jazz', 'Folk', 'Pop', 'Soul'];
const DAY = 86400000;
const start = Date.UTC(2026, 0, 1);

// Each datum is [date, value, themeName], the shape themeRiver expects.
const build = (phase: number): (string | number)[][] => {
  const out: (string | number)[][] = [];
  for (let d = 0; d < 60; d++) {
    themes.forEach((t, k) => {
      const v = 6 + 5 * Math.sin((d + phase) / (5 + k * 1.3) + k) + 2 * Math.cos((d + phase) / 3 - k);
      out.push([start + d * DAY, Math.round(v * 10) / 10, t]);
    });
  }
  return out;
};

const mount: Mount = (el, ctx) => {
  const { chart, dispose } = createChart(el, ctx);

  chart.setOption({
    tooltip: { trigger: 'axis', axisPointer: { type: 'line', lineStyle: { type: 'dashed' } } },
    legend: { show: !ctx.preview, data: themes },
    // themeRiver has no cartesian axes: it needs a singleAxis component as its time axis.
    singleAxis: {
      type: 'time',
      top: ctx.preview ? 10 : 50,
      // Room under the axis for the legend, which ECharts 6 places at the bottom.
      bottom: ctx.preview ? 30 : 64,
      axisPointer: { animation: true, label: { show: true } },
      splitLine: { show: true, lineStyle: { type: 'dashed', opacity: 0.2 } },
    },
    series: [
      {
        type: 'themeRiver',
        data: build(0),
        boundaryGap: ['10%', '10%'],
        emphasis: { itemStyle: { shadowBlur: 20, shadowColor: 'rgba(0,0,0,.8)' } },
        label: { show: !ctx.preview },
      },
    ],
  });

  // Slide the waves along so the rivers flow.
  let phase = 0;
  const stop = every(ctx.preview ? 500 : 700, () => {
    phase += 0.8;
    chart.setOption({ series: [{ data: build(phase) }] });
  });

  return () => {
    stop();
    dispose();
  };
};

export default mount;
