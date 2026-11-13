// Scatter on a polar coordinate system: data is [radius, angle]; angleAxis startAngle, endAngle and clockwise reshape it
import type { Mount } from '@/types.ts';
import { createChart, controlBar, slider, button, select, every } from '../../shared/chart.ts';

// A sunflower layout: successive points a golden angle apart, with the radius growing as sqrt(i).
const points = Array.from({ length: 150 }, (_, i) => [+(Math.sqrt(i) * 8).toFixed(2), +((i * 137.5) % 360).toFixed(1), i]);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 460 });
  let startAngle = 90;
  let clockwise = true;
  let sweep = 360;

  const show = (): void => {
    chart.setOption({
      tooltip: { formatter: (p: { value: number[] }) => `radius ${p.value[0]}, angle ${p.value[1]}°` },
      // polar holds the centre and radius; the radius axis is drawn along the start angle.
      polar: { radius: ctx.preview ? '78%' : '80%', center: ['50%', '50%'] },
      angleAxis: {
        type: 'value',
        min: 0,
        max: 360,
        // startAngle: where the axis starts (degrees, 0 is 3 o'clock). endAngle: where it ends;
        // when it differs from startAngle by less than 360 the polar is a sector.
        startAngle,
        endAngle: clockwise ? startAngle - sweep : startAngle + sweep,
        clockwise,
        splitLine: { show: true, lineStyle: { opacity: 0.25 } },
      },
      radiusAxis: { type: 'value', min: 0, max: 100, axisLabel: { show: !ctx.preview } },
      series: [
        {
          type: 'scatter',
          coordinateSystem: 'polar',
          data: points,
          // The third value (the index) sets the symbol size: later points are bigger.
          symbolSize: (v: number[]) => 4 + (v[2] ?? 0) / 10,
          itemStyle: { opacity: 0.85 },
          animationDuration: ctx.preview ? 400 : 1000,
        },
      ],
    });
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(500, () => {
      startAngle += 12;
      show();
    });
  } else {
    slider(bar!, 'startAngle', [0, 360, 5], startAngle, (v) => {
      startAngle = v;
      show();
    });
    const c = button(bar!, 'clockwise: true', () => {
      clockwise = !clockwise;
      c.textContent = `clockwise: ${clockwise}`;
      show();
    });
    select(bar!, 'angle span', ['360', '270', '180'], (v) => {
      sweep = Number(v);
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
