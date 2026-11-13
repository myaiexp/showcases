// The same points drawn straight, smoothed (boolean or 0-1 number) and as start, middle and end steps
import type { Mount } from '@/types.ts';
import { createChart, controlBar, slider, every } from '../../shared/chart.ts';

const cats = ['A', 'B', 'C', 'D', 'E', 'F'];
const raw = [12, 34, 20, 48, 30, 42];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 440 });

  // Each variant is offset vertically so the lines do not overlap.
  const lines = [
    { name: 'straight', extra: {} },
    // smooth: true, or a number from 0 to 1 for the smoothness (updated by the slider).
    { name: 'smooth', extra: { smooth: 0.6 } },
    // step: the turn happens at the 'start' of each interval, its 'middle', or its 'end'.
    { name: "step: 'start'", extra: { step: 'start' } },
    { name: "step: 'middle'", extra: { step: 'middle' } },
    { name: "step: 'end'", extra: { step: 'end' } },
  ] as const;

  chart.setOption({
    tooltip: { trigger: 'axis' },
    legend: ctx.preview ? { show: false } : {},
    // ECharts 6 puts the legend at the bottom by default; the grid leaves room for it.
    grid: { top: ctx.preview ? 12 : 40, left: 36, right: 16, bottom: ctx.preview ? 24 : 60 },
    xAxis: { type: 'category', data: cats },
    yAxis: { type: 'value', max: 260, show: !ctx.preview },
    series: lines.map((l, i) => ({
      name: l.name,
      type: 'line',
      data: raw.map((v) => v + i * 45),
      symbolSize: 7,
      ...l.extra,
    })),
  });

  const setSmooth = (v: number): void => {
    // Series are matched by index when merging, so the others stay as they are.
    chart.setOption({ series: [{}, { smooth: v }] });
  };

  let stop = (): void => {};
  if (ctx.preview) {
    // Oscillate the smoothness number between rough and fully smooth.
    let t = 0;
    stop = every(100, () => {
      t += 0.1;
      setSmooth((Math.sin(t) + 1) / 2);
    });
  } else {
    slider(bar!, 'smooth (series 2)', [0, 1, 0.05], 0.6, setSmooth);
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
