// effectScatter rippleEffect tuning: number of rings, period, maximum scale and ring colour
import type { Mount } from '@/types.ts';
import { createChart, controlBar, slider, select, every } from '../../shared/chart.ts';

const points = [
  [18, 30, 14],
  [38, 72, 22],
  [55, 40, 18],
  [72, 78, 12],
  [84, 28, 26],
];

interface Ripple { number: number; period: number; scale: number; color: string | undefined }

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const ripple: Ripple = { number: 3, period: 4, scale: 2.5, color: undefined };

  const show = (): void => {
    chart.setOption({
      grid: { top: 16, left: 36, right: 16, bottom: 28 },
      xAxis: { type: 'value', min: 0, max: 100, splitLine: { show: false } },
      yAxis: { type: 'value', min: 0, max: 100, splitLine: { lineStyle: { opacity: 0.15 } } },
      series: [
        {
          type: 'effectScatter',
          data: points,
          symbolSize: (v: number[]) => v[2] ?? 10,
          itemStyle: { color: '#4fc3f7' },
          // rippleEffect describes the animated rings around each symbol.
          rippleEffect: {
            // number: how many rings are alive at once.
            number: ripple.number,
            // period: seconds one ring takes to grow and fade.
            period: ripple.period,
            // scale: how many times the symbol's size a ring grows to.
            scale: ripple.scale,
            // color: the ring colour; unset, it follows the series colour.
            ...(ripple.color ? { color: ripple.color } : {}),
            brushType: 'stroke',
          },
        },
      ],
    });
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    // Step through a few settings; the rings re-time when the option changes.
    const steps: Ripple[] = [
      { number: 3, period: 4, scale: 2.5, color: undefined },
      { number: 1, period: 2, scale: 4, color: '#f2b94c' },
      { number: 5, period: 3, scale: 2, color: undefined },
      { number: 2, period: 1.5, scale: 3.5, color: '#ef5350' },
    ];
    let i = 0;
    stop = every(3000, () => {
      Object.assign(ripple, steps[++i % steps.length]);
      show();
    });
  } else {
    slider(bar!, 'number', [1, 8, 1], ripple.number, (v) => {
      ripple.number = v;
      show();
    });
    slider(bar!, 'period (s)', [0.5, 8, 0.5], ripple.period, (v) => {
      ripple.period = v;
      show();
    });
    slider(bar!, 'scale', [1, 6, 0.5], ripple.scale, (v) => {
      ripple.scale = v;
      show();
    });
    select(bar!, 'color', ['series colour', '#f2b94c', '#ef5350', '#91cc75'], (v) => {
      ripple.color = v.startsWith('#') ? v : undefined;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
