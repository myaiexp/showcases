// Line series on a category axis and on two value axes, with symbol, line style and null gaps
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, button, every } from '../../shared/chart.ts';

const cats = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

interface Look { axis: 'category' | 'value'; symbol: string; width: number; connectNulls: boolean }

function build(ys: Array<number | null>, look: Look, preview: boolean): EChartsOption {
  // Category axis: data holds one value per category. Value axes: data holds [x, y] pairs,
  // so the points sit at real x positions and need not be evenly spaced.
  const xs = [0, 1, 2.5, 3, 5, 6.5, 8];
  const data = look.axis === 'category' ? ys : ys.map((y, i) => [xs[i], y]);
  return {
    tooltip: { trigger: 'axis' },
    grid: { top: preview ? 16 : 24, left: 36, right: 16, bottom: 24 },
    xAxis: look.axis === 'category' ? { type: 'category', data: cats } : { type: 'value' },
    yAxis: { type: 'value' },
    series: [
      {
        type: 'line',
        data: data as never,
        symbol: look.symbol,
        symbolSize: 10,
        lineStyle: { width: look.width },
        // A null value leaves a gap, unless connectNulls draws across it.
        connectNulls: look.connectNulls,
      },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let ys: Array<number | null> = [120, 200, 150, null, 80, 170, 130];
  const look: Look = { axis: 'category', symbol: 'emptyCircle', width: 3, connectNulls: false };
  // notMerge: switching the axis type replaces the xAxis instead of merging into it.
  const show = (): void => {
    chart.setOption(build(ys, look, ctx.preview), true);
  };
  show();

  const wobble = (): void => {
    ys = ys.map((y) => (y === null ? null : Math.max(30, Math.round(y + (Math.random() - 0.5) * 80))));
    show();
  };

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(1600, () => {
      wobble();
      look.connectNulls = !look.connectNulls;
    });
  } else {
    select(bar!, 'x axis', ['category', 'value'], (v) => {
      look.axis = v as Look['axis'];
      show();
    });
    select(bar!, 'symbol', ['emptyCircle', 'circle', 'rect', 'diamond', 'triangle', 'none'], (v) => {
      look.symbol = v;
      show();
    });
    select(bar!, 'lineStyle.width', ['3', '1', '6'], (v) => {
      look.width = Number(v);
      show();
    });
    const nulls = button(bar!, 'connectNulls: off', () => {
      look.connectNulls = !look.connectNulls;
      nulls.textContent = `connectNulls: ${look.connectNulls ? 'on' : 'off'}`;
      show();
    });
    button(bar!, 'wobble data', wobble);
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
