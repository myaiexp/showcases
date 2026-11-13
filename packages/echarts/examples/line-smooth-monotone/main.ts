// smooth strength and smoothMonotone ('x' / 'y') on a line between two value axes
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, every } from '../../shared/chart.ts';

// [x, y] pairs: plateaus and sharp jumps are where a plain smooth curve overshoots.
const points: Array<[number, number]> = [
  [0, 2], [1, 2], [1.4, 9], [3, 9], [3.3, 3], [5, 3], [6, 8], [7, 8], [7.5, 1], [9, 1],
];

interface Look { monotone: 'none' | 'x' | 'y'; smooth: number }

function build(look: Look, preview: boolean): EChartsOption {
  return {
    tooltip: { trigger: 'axis' },
    grid: { top: 20, left: 36, right: 16, bottom: 28 },
    // Both axes are value axes: smoothMonotone is "usually used on dual value axis".
    xAxis: { type: 'value', min: 0, max: 9 },
    yAxis: { type: 'value', min: -2, max: 12, show: !preview },
    series: [
      // The straight outline of the same points, for comparison.
      { type: 'line', data: points, silent: true, symbolSize: 5, lineStyle: { width: 1, type: 'dashed', color: '#888' }, itemStyle: { color: '#888' }, tooltip: { show: false } },
      {
        type: 'line',
        data: points,
        showSymbol: false,
        lineStyle: { width: 3 },
        // smooth: true or a 0..1 strength; smoothMonotone keeps the curve monotone along an axis
        // between its points, which removes the overshoot above and below the plateaus.
        smooth: look.smooth,
        smoothMonotone: look.monotone === 'none' ? undefined : look.monotone,
      },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const look: Look = { monotone: 'none', smooth: 1 };
  const show = (): void => {
    // notMerge: dropping smoothMonotone must clear it, not keep the old value.
    chart.setOption(build(look, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    const modes: Look['monotone'][] = ['none', 'x', 'y'];
    let n = 0;
    stop = every(1500, () => {
      n += 1;
      look.monotone = modes[n % 3]!;
      show();
    });
  } else {
    select(bar!, 'smoothMonotone', ['none', 'x', 'y'], (v) => {
      look.monotone = v as Look['monotone'];
      show();
    });
    slider(bar!, 'smooth', [0, 1, 0.05], 1, (v) => {
      look.smooth = v;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
