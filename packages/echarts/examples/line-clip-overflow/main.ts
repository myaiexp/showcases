// series.clip on a line that overflows the grid, with a movable x window
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, slider, button, every } from '../../shared/chart.ts';

// 41 [x, y] points of a wave whose peaks (±9) stick out of a y axis limited to ±6.
const wave: Array<[number, number]> = Array.from({ length: 41 }, (_, i) => [i / 2, Math.round(9 * Math.sin(i / 3) * 10) / 10]);

function build(clip: boolean, from: number, preview: boolean): EChartsOption {
  return {
    animation: false,
    grid: { top: 20, left: 36, right: 16, bottom: 28, show: true, borderColor: '#888' },
    xAxis: { type: 'value', min: from, max: from + 8 },
    yAxis: { type: 'value', min: -6, max: 6, show: !preview },
    series: [
      {
        type: 'line',
        data: wave,
        symbolSize: 8,
        // clip: true cuts the line at the grid edge. A symbol is only dropped when its centre
        // is outside the grid, so a symbol on the edge can still be half visible.
        clip,
        lineStyle: { width: 3 },
      },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let clip = true;
  let from = 4;
  const show = (): void => {
    chart.setOption(build(clip, from, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let t = 0;
    stop = every(100, () => {
      t += 1;
      from = 6 + 5 * Math.sin(t / 15);
      clip = Math.floor(t / 40) % 2 === 0;
      show();
    });
  } else {
    const c = button(bar!, 'clip: on', () => {
      clip = !clip;
      c.textContent = `clip: ${clip ? 'on' : 'off'}`;
      show();
    });
    slider(bar!, 'x window starts at', [0, 12, 0.25], from, (v) => {
      from = v;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
