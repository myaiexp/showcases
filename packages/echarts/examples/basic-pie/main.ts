// A pie series: radius, startAngle, padAngle, minAngle, selectedMode and the all-zero case
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, button, every } from '../../shared/chart.ts';

const base = [
  { name: 'Search Engine', value: 1048 },
  { name: 'Direct', value: 735 },
  { name: 'Email', value: 580 },
  { name: 'Union Ads', value: 484 },
  { name: 'Video Ads', value: 300 },
];

interface Look { radius: string; padAngle: number; startAngle: number; zero: boolean }

function build(look: Look, preview: boolean): EChartsOption {
  return {
    tooltip: { trigger: 'item' },
    legend: preview ? { show: false } : { top: 0 },
    series: [
      {
        name: 'Access from',
        type: 'pie',
        // value does not need to be a percentage: the sum is spread over 360 degrees.
        // A percent radius is relative to the shorter container side, a plain number is pixels.
        radius: look.radius,
        center: ['50%', preview ? '50%' : '56%'],
        startAngle: look.startAngle,
        padAngle: look.padAngle,
        // minAngle keeps tiny sectors visible (here 0 = off).
        minAngle: 0,
        // Click a sector to pull it out (selectedMode) by selectedOffset pixels.
        selectedMode: 'single',
        selectedOffset: 14,
        // With a zero sum, stillShowZeroSum false draws nothing instead of equal slices.
        stillShowZeroSum: false,
        label: { show: !preview || !look.zero, formatter: '{b}: {d}%' },
        data: look.zero ? base.map((d) => ({ ...d, value: 0 })) : base,
        emphasis: { itemStyle: { shadowBlur: 12, shadowColor: 'rgba(0,0,0,0.5)' } },
      },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const look: Look = { radius: '60%', padAngle: 0, startAngle: 90, zero: false };
  const show = (): void => {
    chart.setOption(build(look, ctx.preview));
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    // Select the next sector in turn: a selected sector slides out by selectedOffset.
    let n = 0;
    stop = every(1100, () => {
      chart.dispatchAction({ type: 'select', seriesIndex: 0, dataIndex: n % base.length });
      chart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: n % base.length });
      n += 1;
    });
  } else {
    select(bar!, 'radius', ['60%', '40%', '75%', '150'], (v) => {
      look.radius = v;
      show();
    });
    slider(bar!, 'padAngle', [0, 10, 1], 0, (v) => {
      look.padAngle = v;
      show();
    });
    slider(bar!, 'startAngle', [0, 360, 15], 90, (v) => {
      look.startAngle = v;
      show();
    });
    const zero = button(bar!, 'all values 0: off', () => {
      look.zero = !look.zero;
      zero.textContent = `all values 0: ${look.zero ? 'on' : 'off'}`;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
