// One option rendered twice, by the canvas renderer and the SVG renderer, side by side
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, slider, type Chart } from '../../shared/chart.ts';

const RENDERERS = ['canvas', 'svg'] as const;

const option = (n: number, t: number, preview: boolean): EChartsOption => ({
  title: { text: '', left: 'center', textStyle: { fontSize: 12 } },
  grid: { top: preview ? 24 : 34, bottom: 22, left: 34, right: 8 },
  xAxis: { min: 0, max: 100, splitLine: { show: false } },
  yAxis: { min: 0, max: 100, splitLine: { show: false } },
  series: [
    {
      type: 'scatter',
      symbolSize: 6,
      // A spiral of n points that turns a little each update.
      data: Array.from({ length: n }, (_, i) => {
        const a = i * 0.35 + t;
        const r = 4 + (i / n) * 44;
        return [50 + r * Math.cos(a), 50 + r * Math.sin(a)];
      }),
    },
  ],
});

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const row = document.createElement('div');
  row.style.display = 'flex';
  row.style.gap = '8px';
  row.style.width = '100%';
  el.append(row);

  // renderer is an init option: 'canvas' (the default) or 'svg'.
  const charts: Chart[] = RENDERERS.map((renderer) => {
    const col = document.createElement('div');
    col.style.flex = '1';
    col.style.minWidth = '0';
    row.append(col);
    return createChart(col, ctx, { height: 340, parent: col, init: { renderer } });
  });

  let n = ctx.preview ? 120 : 400;
  let t = 0;
  const render = (): void => {
    charts.forEach(({ chart, container }, i) => {
      chart.setOption(option(n, t, ctx.preview));
      // What each renderer puts in the page: one <canvas>, or one SVG node per element.
      const nodes = container.querySelectorAll('svg *').length;
      const label = RENDERERS[i] === 'svg' ? `svg: ${nodes} DOM nodes` : `canvas: ${container.querySelectorAll('canvas').length} <canvas>`;
      chart.setOption({ title: { text: label } });
    });
  };
  render();
  const stop = every(ctx.preview ? 900 : 1200, () => {
    t += 0.4;
    render();
  });

  if (bar) {
    slider(bar, 'points', [50, 3000, 50], n, (v) => {
      n = v;
      render();
    });
  }

  return () => {
    stop();
    for (const c of charts) c.dispose();
    row.remove();
  };
};

export default mount;
