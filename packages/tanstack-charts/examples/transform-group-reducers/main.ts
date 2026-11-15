// groupBy with each compact built-in reducer string
import { barY, defineChart, groupBy } from '@tanstack/charts';
import type { TransformNumericReducer } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { makeOrders } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const orders = makeOrders(60);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar for the derived row.' });

  const build = (reduce: TransformNumericReducer) => {
    const rows = groupBy(orders, {
      by: 'region',
      outputs: { result: reduce === 'count' ? { reduce } : { value: 'amount', reduce } },
    });
    return defineChart({
      marks: [barY(rows, { x: 'region', y: 'result', fill: '#60a5fa' })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.3) },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: reduce } },
      },
      tooltip,
    });
  };
  const states = (['count', 'sum', 'mean', 'min', 'max'] as const).map((r) => [r, `reduce: '${r}'`] as const);
  lab(stage, { label: 'reducer', ariaLabel: 'Order amounts per region', states, build, ms: 1800, after: (_, name) => stage.say(name) });
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
