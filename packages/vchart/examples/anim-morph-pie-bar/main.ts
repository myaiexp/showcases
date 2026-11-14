// updateSpec(spec, forceMerge, morphConfig): pie slices become bars and back
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { EASINGS } from '../../shared/anim-data.ts';

const mount: Mount = (el, ctx) => {
  const pie: ISpec = {
    type: 'pie',
    data: [{ id: 'shares', values: ['North', 'South', 'East', 'West', 'Centre'].map((type, i) => ({ type, value: [34, 22, 18, 15, 11][i] })) }],
    outerRadius: 0.8,
    innerRadius: 0.55,
    valueField: 'value',
    categoryField: 'type',
    legends: { visible: false },
    tooltip: { visible: false },
  };
  const bar = { ...pie, type: 'bar', xField: 'type', yField: 'value', seriesField: 'type' } as ISpec;
  const cfg = { duration: 1200, easing: 'cubicInOut' };
  if (!ctx.preview) {
    const b = controlBar(el);
    slider(b, 'duration', [200, 3000, 100], cfg.duration, (v) => (cfg.duration = v));
    select(b, 'easing', EASINGS, (v) => (cfg.easing = v)).value = 'cubicInOut';
  }
  const chart = createChart(el, ctx, pie);
  let n = 0;
  let alive = true;
  const stop = every(ctx.preview ? 2600 : Math.max(2600, cfg.duration + 1600), () => {
    if (!alive) return;
    void chart.vchart.updateSpec(++n % 2 ? bar : pie, false, { animation: { duration: cfg.duration, easing: cfg.easing as 'linear' } });
  });
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
