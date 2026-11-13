// Speedometer: axisLine colour segments, split lines, ticks and a unit formatter
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

type Stops = [number, string][];
const SCHEMES: Record<string, Stops> = {
  'green-yellow-red': [[0.6, '#67e0e3'], [0.85, '#fac858'], [1, '#ee6666']],
  'four bands': [[0.25, '#91cc75'], [0.5, '#73c0de'], [0.75, '#fac858'], [1, '#ee6666']],
  'single colour': [[1, '#5470c6']],
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 440 });
  let scheme = 'green-yellow-red';
  let splitNumber = 8;
  let tickSplit = 5;
  let speed = 90;

  const show = (): void => {
    chart.setOption({
      series: [
        {
          type: 'gauge',
          min: 0,
          max: 240,
          radius: ctx.preview ? '95%' : '82%',
          // splitNumber: segments between the long split lines (and the labels).
          splitNumber,
          // axisLine.lineStyle.color: [position 0..1, colour] pairs, one per segment of the axis.
          axisLine: { lineStyle: { width: 16, color: SCHEMES[scheme]! } },
          // pointer and the detail text take the colour of the segment the value falls in.
          pointer: { width: 5, length: '70%', itemStyle: { color: 'auto' } },
          splitLine: { length: 16, distance: -16, lineStyle: { color: '#fff', width: 3 } },
          // axisTick.splitNumber: small ticks between two split lines.
          axisTick: { splitNumber: tickSplit, length: 8, distance: -16, lineStyle: { color: '#fff', width: 1 } },
          axisLabel: { distance: 24, fontSize: ctx.preview ? 9 : 13, formatter: (v: number) => `${v}` },
          anchor: { show: true, size: 16, itemStyle: { color: '#333', borderColor: '#bbb', borderWidth: 2 } },
          title: { offsetCenter: [0, '-30%'], fontSize: 14 },
          detail: {
            valueAnimation: true,
            offsetCenter: [0, '58%'],
            fontSize: ctx.preview ? 20 : 30,
            // formatter: a template or a function of the value.
            formatter: (v: number) => `${Math.round(v)} km/h`,
            color: 'inherit',
          },
          data: [{ value: speed, name: 'Speed' }],
        },
      ],
    });
  };
  show();

  const set = (v: number): void => {
    speed = v;
    chart.setOption({ series: [{ data: [{ value: v, name: 'Speed' }] }] });
  };
  const stop = every(ctx.preview ? 1600 : 2500, () => set(Math.round(10 + Math.random() * 220)));
  if (bar) {
    select(bar, 'axisLine colour', Object.keys(SCHEMES), (v) => {
      scheme = v;
      show();
    });
    slider(bar, 'splitNumber', [2, 12, 1], splitNumber, (v) => {
      splitNumber = v;
      show();
    });
    slider(bar, 'axisTick.splitNumber', [1, 10, 1], tickSplit, (v) => {
      tickSplit = v;
      show();
    });
    button(bar, 'Floor it', () => set(235));
    button(bar, 'Idle', () => set(10));
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
