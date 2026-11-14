// animationState: the transition into a hover state, driven from code with setHovered
import type { Mount } from '@/types.ts';
import { DAYS, EASINGS, weekdayRows } from '../../shared/anim-data.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const mount: Mount = (el, ctx) => {
  const cfg = { duration: 700, easing: 'cubicOut' };
  const spec = () => ({
    type: 'bar' as const,
    data: [{ id: 'sales', values: weekdayRows(2) }],
    xField: 'day',
    yField: 'sales',
    legends: { visible: false },
    tooltip: { visible: false },
    animationState: { duration: cfg.duration, easing: cfg.easing as 'linear' },
    bar: {
      style: { fill: '#4d7cff', cornerRadius: 0 },
      state: { hover: { fill: '#ff8a3d', cornerRadius: 14, stroke: '#ffffff', lineWidth: 2 } },
    },
  });
  if (!ctx.preview) {
    const b = controlBar(el);
    slider(b, 'duration', [0, 2000, 50], cfg.duration, (v) => {
      cfg.duration = v;
      void chart.vchart.updateSpec(spec());
    });
    select(b, 'easing', EASINGS, (v) => {
      cfg.easing = v;
      void chart.vchart.updateSpec(spec());
    }).value = 'cubicOut';
  }
  const chart = createChart(el, ctx, spec());
  let i = 0;
  let alive = true;
  const stop = every(1100, () => {
    if (alive) chart.vchart.setHovered({ day: DAYS[i++ % DAYS.length] });
  });
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
