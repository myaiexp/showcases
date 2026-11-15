// cumulative with sum, max and mean reducers over one series
import { cumulative, defineChart, lineY } from '@tanstack/charts';
import type { TransformNumericReducer } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { makeSeries } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const series = makeSeries(50).filter((r) => r.series === 'alpha');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Grey is the raw series, orange is the running output.' });

  const build = (reduce: Exclude<TransformNumericReducer, 'count'>) => {
    const rows = cumulative(series, { orderBy: 'day', outputs: { running: { value: 'value', reduce } } });
    const top = reduce === 'sum' ? 3000 : 100;
    return defineChart({
      marks: [
        lineY(series, { x: 'day', y: 'value', stroke: '#64748b', strokeWidth: 1 }),
        lineY(rows, { x: 'day', y: 'running', stroke: '#fb923c', strokeWidth: 3 }),
      ],
      scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear().domain([reduce === 'sum' ? 0 : 20, top]), grid: true } },
    });
  };
  const states = (['sum', 'max', 'mean'] as const).map((r) => [r, `reduce: '${r}'`] as const);
  lab(stage, { label: 'reducer', ariaLabel: 'Raw series and a running reduction', states, build, ms: 2000, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
