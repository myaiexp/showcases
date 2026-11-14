// dataKey: which datum a bar stands for across updateData calls
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const NAMES = ['Alder', 'Birch', 'Cedar', 'Dogwood', 'Elm', 'Fir', 'Ginkgo'];

const mount: Mount = (el, ctx) => {
  const r = rng(9);
  const scores = new Map(NAMES.map((n) => [n, Math.round(20 + r() * 60)]));
  // Every step moves each score and sorts the ranking, so the order of the data changes.
  const step = (): { name: string; value: number }[] => {
    for (const [n, v] of scores) scores.set(n, Math.max(5, Math.min(100, v + Math.round((r() - 0.5) * 50))));
    return [...scores].map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  };
  const spec = (keyed: boolean): ISpec =>
    ({
      type: 'bar',
      data: [{ id: 'rank', values: step() }],
      xField: 'name',
      yField: 'value',
      seriesField: 'name',
      legends: { visible: false },
      ...(keyed ? { dataKey: 'name' } : {}),
      animationUpdate: { duration: 900, easing: 'cubicInOut' },
      label: { visible: !ctx.preview },
      tooltip: { visible: false },
    }) as unknown as ISpec;
  let keyed = true;
  let chart = createChart(el, ctx, spec(keyed));
  let alive = true;
  const bar = ctx.preview ? null : controlBar(el);
  const tick = (): void => {
    if (alive) void chart.vchart.updateData('rank', step());
  };
  if (bar) {
    select(bar, 'dataKey', ['name', 'none'], (v) => {
      keyed = v === 'name';
      chart.release();
      chart = createChart(el, ctx, spec(keyed));
    });
  }
  const stop = every(1800, tick);
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
