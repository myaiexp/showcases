// A partial doughnut: startAngle and endAngle limit the pie to an arc, clockwise sets its direction
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { SOURCES } from '../../shared/pie-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const look = { start: 180, end: 360, clockwise: true };
  const apply = (): void => {
    chart.setOption({
      tooltip: { trigger: 'item' },
      legend: ctx.preview ? { show: false } : {},
      series: [
        {
          type: 'pie',
          radius: ['45%', '80%'],
          // The arc is drawn from startAngle to endAngle, so the centre sits low for a top half.
          center: ['50%', ctx.preview ? '70%' : '62%'],
          // Angles are in degrees, 0 at 3 o'clock, counter-clockwise: 90 is 12 o'clock.
          startAngle: look.start,
          // 'auto' (the default) closes the circle; a number cuts the pie short.
          endAngle: look.end,
          clockwise: look.clockwise,
          padAngle: 2,
          itemStyle: { borderRadius: 6 },
          label: { show: !ctx.preview },
          data: SOURCES,
        },
      ],
    });
  };
  apply();

  let stop = (): void => {};
  if (ctx.preview) {
    // Swing the arc around: top half, right half, bottom half, left half.
    const arcs = [[180, 360], [270, 450], [0, 180], [90, 270]] as const;
    let n = 0;
    stop = every(1500, () => {
      n += 1;
      const [a, b] = arcs[n % arcs.length]!;
      look.start = a;
      look.end = b;
      apply();
    });
  } else {
    slider(bar!, 'startAngle', [0, 360, 15], look.start, (v) => { look.start = v; apply(); });
    slider(bar!, 'endAngle', [0, 720, 15], look.end, (v) => { look.end = v; apply(); });
    select(bar!, 'preset', ['top half', 'right half', 'bottom half', 'three quarters'], (v) => {
      const presets: Record<string, number[]> = { 'top half': [180, 360], 'right half': [270, 450], 'bottom half': [0, 180], 'three quarters': [225, 495] };
      look.start = presets[v]![0]!;
      look.end = presets[v]![1]!;
      apply();
    });
    const dir = button(bar!, 'clockwise: true', () => {
      look.clockwise = !look.clockwise;
      dir.textContent = `clockwise: ${look.clockwise}`;
      apply();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
