// Heatmap on a category x category grid, coloured through a continuous visualMap
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const hours = Array.from({ length: 24 }, (_, i) => `${i}h`);
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Each datum is [xIndex, yIndex, value]; generated from a smooth deterministic formula plus a phase.
const build = (phase: number): number[][] => {
  const out: number[][] = [];
  for (let y = 0; y < days.length; y++) {
    for (let x = 0; x < hours.length; x++) {
      const v = 5 + 4 * Math.sin((x + phase) / 3.2) * Math.cos((y + phase / 5) / 1.7) + ((x * 7 + y * 13) % 5) / 2;
      out.push([x, y, Math.round(v * 10) / 10]);
    }
  }
  return out;
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 440 });
  let phase = 0;

  chart.setOption({
    tooltip: { position: 'top' },
    grid: { left: 50, right: 20, top: 10, bottom: ctx.preview ? 24 : 70 },
    xAxis: { type: 'category', data: hours, splitArea: { show: true } },
    yAxis: { type: 'category', data: days, splitArea: { show: true } },
    // The heatmap's colours come from the visualMap, which maps dimension 2 (the value).
    visualMap: {
      min: 0,
      max: 14,
      calculable: !ctx.preview,
      orient: 'horizontal',
      left: 'center',
      bottom: 10,
      show: !ctx.preview,
      inRange: { color: ['#313695', '#74add1', '#fee090', '#f46d43', '#a50026'] },
    },
    series: [
      {
        type: 'heatmap',
        data: build(0),
        label: { show: !ctx.preview, fontSize: 9 },
        emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,.5)' } },
        progressive: 0,
      },
    ],
  });

  const update = (): void => chart.setOption({ series: [{ data: build(phase) }] });
  const stop = every(ctx.preview ? 700 : 1000, () => {
    phase += 1;
    update();
  });
  if (bar) {
    select(bar, 'visualMap palette', ['heat', 'cool', 'mono'], (v) => {
      const colors: Record<string, string[]> = {
        heat: ['#313695', '#74add1', '#fee090', '#f46d43', '#a50026'],
        cool: ['#08306b', '#2171b5', '#6baed6', '#c6dbef', '#f7fbff'],
        mono: ['#222', '#ddd'],
      };
      chart.setOption({ visualMap: { inRange: { color: colors[v] } } });
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
