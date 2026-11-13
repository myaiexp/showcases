// Gauge with a progress arc, pointer, ticks and a value that animates to new readings
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every } from '../../shared/chart.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  chart.setOption({
    series: [
      {
        type: 'gauge',
        min: 0,
        max: 100,
        startAngle: 225, // where the scale starts, degrees counter-clockwise from 3 o'clock
        endAngle: -45,
        splitNumber: 10, // long ticks (splitLine) along the axis
        radius: ctx.preview ? '95%' : '80%',
        // progress paints the filled arc from min up to the current value
        progress: { show: true, width: 14, roundCap: true },
        axisLine: { roundCap: true, lineStyle: { width: 14 } },
        pointer: { length: '60%', width: 6 },
        splitLine: { length: 10, distance: 4 },
        axisTick: { splitNumber: 5, length: 5, distance: 4 },
        axisLabel: { distance: 22, fontSize: ctx.preview ? 9 : 12 },
        anchor: { show: true, size: 14, itemStyle: { borderWidth: 3 } },
        detail: { valueAnimation: true, formatter: '{value} %', fontSize: ctx.preview ? 18 : 28, offsetCenter: [0, '70%'] },
        data: [{ value: 42, name: 'Load' }],
      },
    ],
  });

  // New value via setOption: the pointer and the progress arc animate to it.
  const set = (v: number): void => {
    chart.setOption({ series: [{ data: [{ value: v, name: 'Load' }] }] });
  };
  const random = (): number => Math.round(Math.random() * 100);
  const stop = every(ctx.preview ? 1800 : 2500, () => set(random()));
  if (bar) {
    button(bar, 'Set 0', () => set(0));
    button(bar, 'Set 100', () => set(100));
    button(bar, 'Random', () => set(random()));
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
