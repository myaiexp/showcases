// Gauge axisLabel.rotate: tangential, radial or a fixed angle, on a grade dial with text labels
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const GRADES: Record<number, string> = { 20: 'F', 40: 'D', 60: 'C', 80: 'B', 100: 'A' };
const MODES = ['tangential', 'radial', '0', '-45', '45', '90'];
const MODE_CYCLE = ['tangential', 'radial', '45', '0'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 440 });
  let mode = 'tangential';
  let distance = 20;
  let score = 72;

  const show = (): void => {
    chart.setOption({
      series: [
        {
          type: 'gauge',
          min: 0,
          max: 100,
          splitNumber: 5,
          radius: ctx.preview ? '95%' : '82%',
          axisLine: { lineStyle: { width: 14, color: [[0.2, '#ee6666'], [0.4, '#fc8452'], [0.6, '#fac858'], [0.8, '#91cc75'], [1, '#3ba272']] } },
          pointer: { width: 5, length: '55%' },
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            distance,
            fontSize: ctx.preview ? 14 : 20,
            // rotate: 'tangential' | 'radial' | a number of degrees (-90..90, positive is counter-clockwise).
            rotate: Number.isNaN(Number(mode)) ? (mode as 'radial' | 'tangential') : Number(mode),
            // formatter: turn the tick values into grade letters; unlisted values stay empty.
            formatter: (v: number) => GRADES[v] ?? '',
          },
          anchor: { show: true, size: 12, itemStyle: { color: '#ddd' } },
          title: { offsetCenter: [0, '45%'], fontSize: 14 },
          detail: { valueAnimation: true, offsetCenter: [0, '65%'], fontSize: ctx.preview ? 20 : 30, formatter: '{value} pts' },
          data: [{ value: score, name: 'Score' }],
        },
      ],
    });
  };
  show();

  let step = 0;
  const stop = ctx.preview
    ? every(1800, () => {
        // Preview: walk through the rotate modes and move the needle.
        mode = MODE_CYCLE[++step % MODE_CYCLE.length]!;
        score = Math.round(15 + Math.random() * 80);
        show();
      })
    : () => {};
  if (bar) {
    select(bar, 'axisLabel.rotate', MODES, (v) => {
      mode = v;
      show();
    });
    slider(bar, 'axisLabel.distance', [5, 40, 1], distance, (v) => {
      distance = v;
      show();
    });
    slider(bar, 'value', [0, 100, 1], score, (v) => {
      score = v;
      chart.setOption({ series: [{ data: [{ value: v, name: 'Score' }] }] });
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
