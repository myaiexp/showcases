// Queries come from signals; the same field twice (delay) builds a range from two one-sided queries
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { flights } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 220,
    padding: { top: 25, left: 5, right: 5, bottom: 5 },
    autosize: 'none',
    signals: [
      { name: 'delayMin', value: 0, bind: { input: 'range', min: -60, max: 180, step: 5 } },
      { name: 'delayMax', value: 60, bind: { input: 'range', min: -60, max: 180, step: 5 } },
      { name: 'timeFrom', value: 8, bind: { input: 'range', min: 0, max: 24, step: 1 } },
      { name: 'timeTo', value: 20, bind: { input: 'range', min: 0, max: 24, step: 1 } },
    ],
    data: [
      { name: 'raw', values: flights(5, 1800) },
      {
        name: 'flights',
        source: 'raw',
        transform: [
          {
            type: 'crossfilter',
            signal: 'xfilter',
            // delay appears twice: one query sets its lower bound, the other its upper bound.
            fields: ['delay', 'delay', 'time'],
            query: [{ signal: '[delayMin, 1000]' }, { signal: '[-1000, delayMax]' }, { signal: '[timeFrom, timeTo]' }],
          },
        ],
      },
      // resolvefilter first, then collect: the marks draw only the flights that pass every query.
      // (collect is missing from the Spec type's transform union, hence the cast.)
      { name: 'passing', source: 'flights', transform: [{ type: 'resolvefilter', filter: { signal: 'xfilter' }, ignore: 0 }, { type: 'collect' } as never] },
      { name: 'count', source: 'flights', transform: [{ type: 'resolvefilter', filter: { signal: 'xfilter' }, ignore: 0 }, { type: 'aggregate', ops: ['count'], as: ['n'] }] },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 24], range: 'width' },
      { name: 'y', type: 'linear', domain: [-60, 180], range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x', title: 'time (hour)' },
      { orient: 'left', scale: 'y', title: 'delay (min)' },
    ],
    marks: [
      {
        type: 'text',
        from: { data: 'count' },
        encode: { update: { x: { value: 0 }, y: { value: -10 }, fill: { value: '#ddd' }, text: { signal: "datum.n + ' of 1800 flights pass'" } } },
      },
      {
        type: 'symbol',
        from: { data: 'passing' },
        interactive: false,
        encode: {
          enter: { size: { value: 9 }, fill: { value: 'steelblue' }, fillOpacity: { value: 0.55 } },
          update: { x: { scale: 'x', field: 'time' }, y: { scale: 'y', field: 'delay' } },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { delayMin: 0, delayMax: 60, timeFrom: 8, timeTo: 20 },
    { delayMin: 40, delayMax: 150, timeFrom: 14, timeTo: 24 },
    { delayMin: -40, delayMax: 10, timeFrom: 0, timeTo: 12 },
  ], 2200);
  return () => stage.dispose();
};

export default mount;
