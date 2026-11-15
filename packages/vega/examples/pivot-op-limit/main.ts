// Pivot op and limit: choose how cells aggregate and how many new columns may be created
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const ops = ['sum', 'mean', 'max', 'min', 'count'];
const rand = rng(190);
// Two readings per (year, quarter): sum and mean differ.
const rows = [2021, 2022, 2023].flatMap((year) =>
  ['q1', 'q2', 'q3', 'q4'].flatMap((quarter) => [0, 1].map(() => ({ year, quarter, v: Math.round(20 + rand() * 60) }))),
);
const quarters = ['q1', 'q2', 'q3', 'q4'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 320,
    height: 150,
    padding: 5,
    signals: [
      { name: 'op', value: 'sum', bind: { input: 'select', options: ops } },
      { name: 'limit', value: 0, bind: { input: 'select', options: [0, 1, 2, 3] } },
    ],
    data: [
      { name: 'long', values: rows },
      {
        name: 'wide',
        source: 'long',
        // Fields are created in ascending name order, so limit 2 keeps q1 and q2.
        transform: [{ type: 'pivot', groupby: ['year'], field: 'quarter', value: 'v', op: { signal: 'op' }, limit: { signal: 'limit' } }],
      },
    ],
    scales: [
      { name: 'x', type: 'band', domain: quarters, range: 'width', padding: 0.05 },
      { name: 'y', type: 'band', domain: [2021, 2022, 2023], range: 'height', padding: 0.05 },
      { name: 'fill', type: 'linear', domain: [0, 150], range: ['#1b2540', 'orange'] },
    ],
    axes: [{ orient: 'top', scale: 'x' }, { orient: 'left', scale: 'y' }],
    title: { text: { signal: "'op ' + op + ', limit ' + limit + (limit == 0 ? ' (no limit)' : '')" }, orient: 'bottom', color: '#ddd' },
    // One column of cells per possible pivoted field; a column that was not created has no value.
    marks: quarters.map((q) => ({
      type: 'rect' as const,
      from: { data: 'wide' },
      encode: {
        update: {
          x: { scale: 'x', value: q },
          width: { scale: 'x', band: 1 },
          y: { scale: 'y', field: 'year' },
          height: { scale: 'y', band: 1 },
          fill: { signal: `isValid(datum.${q}) ? scale('fill', datum.${q}) : '#222831'` },
        },
      },
    })).concat(
      quarters.map((q) => ({
        type: 'text' as never,
        from: { data: 'wide' },
        encode: {
          update: {
            x: { scale: 'x', value: q, band: 0.5 },
            y: { scale: 'y', field: 'year', band: 0.5 },
            text: { signal: `isValid(datum.${q}) ? format(datum.${q}, '.3~g') : ''` },
            align: { value: 'center' },
            baseline: { value: 'middle' },
            fill: { value: '#fff' },
          },
        },
      })) as never,
    ),
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const steps: [string, number][] = [['sum', 0], ['mean', 0], ['max', 2], ['count', 3], ['min', 0]];
    stage.every(1500, async (i) => {
      const [o, l] = steps[i % steps.length]!;
      view.signal('op', o).signal('limit', l);
      await view.runAsync();
    });
  }
  return () => stage.dispose();
};

export default mount;
