// resolvefilter ignore is a bit mask: bit 1 skips delay, 2 skips time, 4 skips distance
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { flights } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const FIELDS = ['delay', 'time', 'distance'];
// Every mask that leaves at least one query active; 7 would ignore all three, and resolvefilter then passes nothing.
const MASKS = [0, 1, 2, 4, 3, 5, 6];
const name = (m: number): string => (m === 0 ? 'none ignored' : `ignore ${FIELDS.filter((_, i) => m & (1 << i)).join(' + ')}`);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 360,
    height: 180,
    padding: { top: 10, left: 170, right: 60, bottom: 10 },
    autosize: 'none',
    signals: [
      { name: 'delayMax', value: 30, bind: { input: 'range', min: -50, max: 180, step: 5 } },
      { name: 'timeFrom', value: 12, bind: { input: 'range', min: 0, max: 23, step: 1 } },
      { name: 'distMax', value: 900, bind: { input: 'range', min: 100, max: 2400, step: 100 } },
    ],
    data: [
      { name: 'raw', values: flights(11, 3000) },
      {
        name: 'flights',
        source: 'raw',
        transform: [
          {
            type: 'crossfilter',
            signal: 'xfilter',
            fields: FIELDS,
            // Half-open ranges: lower bound inclusive, upper exclusive.
            query: [{ signal: '[-60, delayMax]' }, { signal: '[timeFrom, 25]' }, { signal: '[0, distMax]' }],
          },
        ],
      },
      // One derived set per mask, each ignoring a different combination of the three queries.
      ...MASKS.map((m) => ({
        name: `mask${m}`,
        source: 'flights',
        transform: [
          { type: 'resolvefilter' as const, filter: { signal: 'xfilter' }, ignore: m },
          { type: 'aggregate' as const, ops: ['count' as const], as: ['n'] },
        ],
      })),
    ],
    scales: [{ name: 'x', type: 'linear', domain: [0, 3000], range: 'width' }],
    marks: MASKS.flatMap((m, i) => [
      { type: 'text' as const, encode: { enter: { x: { value: -10 }, y: { value: i * 25 + 11 }, text: { value: `${m}: ${name(m)}` }, align: { value: 'right' as const }, fill: { value: '#ddd' }, fontSize: { value: 11 } } } },
      {
        type: 'rect' as const,
        from: { data: `mask${m}` },
        encode: {
          update: { x: { value: 0 }, x2: { scale: 'x', field: 'n' }, y: { value: i * 25 + 2 }, height: { value: 18 }, fill: { value: m === 0 ? 'steelblue' : '#6aa7e6' }, fillOpacity: { value: m === 0 ? 1 : 0.7 } },
        },
      },
      {
        type: 'text' as const,
        from: { data: `mask${m}` },
        encode: { update: { x: { scale: 'x', field: 'n', offset: 5 }, y: { value: i * 25 + 11 }, text: { field: 'n' }, baseline: { value: 'middle' as const }, fill: { value: '#ddd' }, fontSize: { value: 11 } } },
      },
    ]),
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { delayMax: 30, timeFrom: 12, distMax: 900 },
    { delayMax: 120, timeFrom: 6, distMax: 600 },
    { delayMax: 0, timeFrom: 16, distMax: 2000 },
  ], 2200);
  return () => stage.dispose();
};

export default mount;
