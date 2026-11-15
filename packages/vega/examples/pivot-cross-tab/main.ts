// Pivot: unique values of one field become columns, aggregated from another field
import type { Mark, Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/cards.ts';
import { reshuffle, rowsOf, tableMarks } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const make = (n: number): object[] => {
  const rand = rng(180 + n);
  return ['Norway', 'Germany', 'Canada', 'Japan'].flatMap((country) =>
    [['gold', 18], ['silver', 14], ['bronze', 12]].map(([type, hi]) => ({ country, type, count: 3 + Math.floor(rand() * (hi as number)) })),
  );
};

// [pivoted field, where the segment starts, colour]
const stacks: [string, string, string][] = [
  ['gold', '0', 'gold'],
  ['silver', 'datum.gold', 'silver'],
  ['bronze', 'datum.gold + datum.silver', '#c8803c'],
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 260,
    height: 170,
    padding: 5,
    data: [
      { name: 'long', values: make(0) },
      {
        name: 'wide',
        source: 'long',
        // One row per country; gold, silver and bronze become fields holding the summed count.
        transform: [{ type: 'pivot', groupby: ['country'], field: 'type', value: 'count' }],
      },
      rowsOf('rows', 'wide', 6),
    ],
    scales: [
      { name: 'y', type: 'band', domain: { data: 'wide', field: 'country' }, range: 'height', padding: 0.2 },
      { name: 'x', type: 'linear', domain: [0, 50], range: 'width' },
    ],
    axes: [{ orient: 'left', scale: 'y' }, { orient: 'bottom', scale: 'x' }],
    marks: [
      // The pivoted fields are ordinary columns, so a stacked bar is three rects offset by the earlier ones.
      ...stacks.map(([f, start, color]): Mark => ({
        type: 'rect',
        from: { data: 'wide' },
        encode: {
          update: {
            y: { scale: 'y', field: 'country' },
            height: { scale: 'y', band: 1 },
            x: { scale: 'x', signal: start },
            x2: { scale: 'x', signal: `${start} + datum.${f}` },
            fill: { value: color },
          },
        },
      })),
      ...tableMarks('rows', [{ field: 'country', width: 62 }, { field: 'gold', width: 40 }, { field: 'silver', width: 44 }, { field: 'bronze' }]),
    ],
  };

  const view = await stage.render(spec);
  reshuffle(stage, view, 'long', make, 2000);
  return () => stage.dispose();
};

export default mount;
