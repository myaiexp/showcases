// Custom states: point.state.<name>.filter picks the marks that get the state style
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { classScores, seeded, WEEK } from '../../shared/concepts-data.ts';

const DAYS = [...WEEK, 'Saturday', 'Sunday'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const data = classScores(seeded(8), DAYS);
  const spec = (threshold: number): ISpec => ({
    type: 'line',
    data: [{ id: 'lineData', values: data }],
    seriesField: 'class',
    xField: 'date',
    yField: 'score',
    point: {
      style: { size: 10 },
      state: {
        // Any name that is not a built-in state is a custom state.
        overThreshold: { filter: (datum: { score: number }) => datum.score >= threshold, style: { fill: 'red', size: 16 } },
      },
    },
    markLine: [{ y: threshold, line: { style: { lineDash: [4, 4] } }, endSymbol: { visible: false } }],
  } as unknown as ISpec);
  const chart = createChart(el, ctx, spec(30));
  let alive = true;
  const set = (v: number): void => {
    if (alive) void chart.vchart.updateSpec(spec(v));
  };
  let t = 0;
  const stop = bar ? (): void => {} : every(1200, () => set(18 + ((t += 4) % 20)));
  if (bar) slider(bar, 'threshold', [15, 38, 1], 30, set);
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
