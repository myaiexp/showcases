// A live clock built from three overlaid gauges, driven by startAngle, endAngle and clockwise
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 460 });
  let startAngle = 90;
  let clockwise = true;
  let offsetHours = 0;

  const time = (): { h: number; m: number; s: number } => {
    const d = new Date(Date.now() + offsetHours * 3600_000);
    return { h: d.getHours() % 12 + d.getMinutes() / 60, m: d.getMinutes() + d.getSeconds() / 60, s: d.getSeconds() };
  };

  const show = (): void => {
    const { h, m, s } = time();
    // The same dial geometry for the three hands. startAngle puts the minimum of the scale
    // (degrees, 0 = 3 o'clock, counter-clockwise); endAngle is a full turn away; clockwise
    // decides which way the scale increases.
    const dial = { startAngle, endAngle: startAngle - 360, clockwise, radius: ctx.preview ? '94%' : '85%' };
    chart.setOption({
      animation: false, // the hands move once a second; no sweep needed
      series: [
        {
          // Hour hand and the face: 12 split lines, labels 1..12, 5 ticks between them.
          ...dial,
          type: 'gauge',
          min: 0,
          max: 12,
          splitNumber: 12,
          axisLine: { lineStyle: { width: 4, color: [[1, '#777']] } },
          splitLine: { length: 12, distance: -4, lineStyle: { width: 3, color: '#ddd' } },
          axisTick: { splitNumber: 5, length: 5, distance: -4, lineStyle: { width: 1, color: '#999' } },
          axisLabel: { distance: ctx.preview ? 14 : 22, fontSize: ctx.preview ? 11 : 18, color: '#ddd', formatter: (v: number) => (v === 0 ? '' : String(v)) },
          pointer: { length: '50%', width: 8, itemStyle: { color: '#ddd' } },
          anchor: { show: true, size: 10, showAbove: true, itemStyle: { color: '#ddd' } },
          title: { show: false },
          detail: { show: false },
          data: [{ value: h }],
        },
        {
          // Minute hand: its own 0..60 scale over the same angles, no face of its own.
          ...dial,
          type: 'gauge',
          min: 0,
          max: 60,
          axisLine: { show: false },
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          pointer: { length: '75%', width: 5, itemStyle: { color: '#5470c6' } },
          anchor: { show: false },
          title: { show: false },
          detail: { show: false },
          data: [{ value: m }],
        },
        {
          // Second hand.
          ...dial,
          type: 'gauge',
          min: 0,
          max: 60,
          axisLine: { show: false },
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          pointer: { length: '85%', width: 2, itemStyle: { color: '#ee6666' } },
          anchor: { show: true, size: 6, showAbove: true, itemStyle: { color: '#ee6666' } },
          title: { show: false },
          detail: { show: false },
          data: [{ value: s }],
        },
      ],
    });
  };
  show();
  const stop = every(1000, show);

  if (bar) {
    select(bar, 'startAngle', ['90', '0', '180', '270'], (v) => {
      startAngle = Number(v);
      show();
    });
    select(bar, 'clockwise', ['true', 'false'], (v) => {
      clockwise = v === 'true';
      show();
    });
    slider(bar, 'hours from local time', [-12, 12, 1], 0, (v) => {
      offsetHours = v;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
