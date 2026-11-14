// grid.outerBounds, outerBoundsMode and outerBoundsContain: keeping long labels and names inside a box
import type { EChartsOption, EChartsType } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, every } from '../../shared/chart.ts';

const NAMES = ['Decommissioned warehouse', 'North harbour terminal', 'Airport freight hub', 'Rail yard', 'Depot'];

interface Look { mode: 'auto' | 'none' | 'same'; contain: 'auto' | 'all' | 'axisLabel'; inset: number }

function build(chart: EChartsType, look: Look, preview: boolean): EChartsOption {
  const w = chart.getWidth();
  const h = chart.getHeight();
  return {
    // A dashed frame drawn at the outerBounds rectangle so you can see what constrains the grid.
    graphic: [
      {
        type: 'rect',
        left: look.inset,
        top: look.inset,
        shape: { width: Math.max(0, w - look.inset * 2), height: Math.max(0, h - look.inset * 2) },
        style: { fill: 'none', stroke: '#f0b74a', lineDash: [6, 4], lineWidth: 1 },
        silent: true,
        z: 100,
      },
    ],
    grid: {
      // The axis lines are laid out in this rectangle first; labels that overflow shrink it.
      left: 8,
      right: 8,
      top: 28,
      bottom: 28,
      // show draws the grid box so its shrinking is visible.
      show: true,
      backgroundColor: 'rgba(120,140,190,0.10)',
      // outerBoundsMode: how the constraint box is chosen. 'auto' uses outerBounds when given,
      // 'none' removes the constraint, 'same' reuses the left/right/top/bottom box above.
      outerBoundsMode: look.mode,
      // outerBounds: the constraint box, as insets from each canvas edge.
      outerBounds: { left: look.inset, right: look.inset, top: look.inset, bottom: look.inset },
      // outerBoundsContain: whether axis names count as well as axis labels.
      outerBoundsContain: look.contain,
    },
    xAxis: { type: 'value', name: 'Throughput (pallets per hour, rolling average)', nameLocation: 'middle', nameGap: 22 },
    yAxis: { type: 'category', data: NAMES, inverse: true, axisLabel: { fontSize: preview ? 10 : 12 } },
    series: [{ type: 'bar', data: [120, 200, 150, 80, 70], barWidth: '50%' }],
  };
}

const mount: Mount = (el, ctx) => {
  const look: Look = { mode: 'auto', contain: 'auto', inset: 12 };
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const show = (): void => {
    chart.setOption(build(chart, look, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    const insets = [12, 40, 4, 24];
    const modes = ['auto', 'auto', 'none', 'same'] as const;
    let i = 0;
    stop = every(1500, () => {
      i++;
      look.inset = insets[i % insets.length]!;
      look.mode = modes[i % modes.length]!;
      show();
    });
  } else {
    select(bar!, 'outerBoundsMode', ['auto', 'none', 'same'], (v) => {
      look.mode = v as Look['mode'];
      show();
    });
    select(bar!, 'outerBoundsContain', ['auto', 'all', 'axisLabel'], (v) => {
      look.contain = v as Look['contain'];
      show();
    });
    slider(bar!, 'outerBounds inset', [0, 80, 2], look.inset, (v) => {
      look.inset = v;
      show();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
