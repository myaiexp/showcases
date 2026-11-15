// Timeunit units: floor dates to a calendar unit, chronological (year + month) or cyclical (month alone)
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { dateRows } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const options = ['year,quarter', 'year,month', 'month', 'day', 'date', 'hours'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 190,
    padding: 5,
    signals: [
      { name: 'unitList', value: 'year,month', bind: { input: 'select', options } },
      { name: 'units', update: "split(unitList, ',')" },
    ],
    data: [
      { name: 'events', values: dateRows(261, 320), transform: [{ type: 'formula', as: 'date', expr: 'toDate(datum.t)' }] },
      {
        name: 'bins',
        source: 'events',
        transform: [
          // units may be a signal holding an array; utc keeps the bins the same in every time zone.
          { type: 'timeunit', field: 'date', units: { signal: 'units' }, timezone: 'utc', signal: 'tu' },
          { type: 'aggregate', groupby: ['unit0', 'unit1'] },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'utc', domain: { fields: [{ data: 'bins', field: 'unit0' }, { data: 'bins', field: 'unit1' }] }, range: 'width' },
      { name: 'y', type: 'linear', domain: { data: 'bins', field: 'count' }, zero: true, nice: true, range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', title: 'events' }],
    title: { text: { signal: "'units ' + join(units, ' + ') + ', smallest ' + tu.unit + ': ' + length(data('bins')) + ' bins'" }, color: '#ddd' },
    marks: [
      {
        type: 'rect',
        from: { data: 'bins' },
        encode: {
          update: {
            x: { scale: 'x', field: 'unit0' },
            x2: { scale: 'x', field: 'unit1' },
            y: { scale: 'y', field: 'count' },
            y2: { scale: 'y', value: 0 },
            fill: { value: 'steelblue' },
            stroke: { value: '#123' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'unitList', options, 1700);
  return () => stage.dispose();
};

export default mount;
