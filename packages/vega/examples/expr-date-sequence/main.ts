// Date-time functions: timeSequence and utcSequence lay dates out by unit and step across a year
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 120,
    padding: 8,
    signals: [
      { name: 'unit', value: 'month', bind: { input: 'select', options: ['quarter', 'month', 'week', 'date'] } },
      { name: 'step', value: 1, bind: { input: 'range', min: 1, max: 12, step: 1 } },
      { name: 'zone', value: 'utc', bind: { input: 'radio', options: ['utc', 'local'] } },
      { name: 'start', update: 'zone === "utc" ? utc(2024, 0, 1) : time(datetime(2024, 0, 1))' },
      { name: 'stop', update: 'zone === "utc" ? utc(2025, 0, 1) : time(datetime(2025, 0, 1))' },
    ],
    data: [
      {
        name: 'seq',
        // One row holds the whole array; flatten turns each Date into its own row.
        values: [{}],
        transform: [
          {
            type: 'formula',
            as: 'd',
            expr: 'zone === "utc" ? utcSequence(unit, start, stop, step) : timeSequence(unit, start, stop, step)',
          },
          { type: 'flatten', fields: ['d'], as: ['d'] },
          { type: 'formula', as: 'm', expr: 'zone === "utc" ? utcmonth(datum.d) : month(datum.d)' },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'time', domain: { signal: '[start, stop]' }, range: 'width' },
      { name: 'c', type: 'ordinal', domain: { data: 'seq', field: 'm', sort: true }, range: { scheme: 'category20' } },
    ],
    axes: [{ orient: 'bottom', scale: 'x', tickCount: 12 }],
    marks: [
      {
        type: 'rule',
        encode: { enter: { x: { value: 0 }, x2: { signal: 'width' }, y: { signal: 'height / 2' }, stroke: { value: '#555' } } },
      },
      {
        type: 'symbol',
        from: { data: 'seq' },
        encode: {
          update: {
            x: { scale: 'x', field: 'd' },
            y: { signal: 'height / 2' },
            size: { value: 70 },
            fill: { scale: 'c', field: 'm' },
          },
        },
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { value: 0 },
            y: { value: 4 },
            fill: { value: '#ddd' },
            fontSize: { value: 12 },
            text: { signal: "length(data('seq')) + ' dates from ' + (zone === 'utc' ? 'utcSequence' : 'timeSequence') + '(' + unit + ', ..., ' + step + ')'" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { unit: 'month', step: 1 },
      { unit: 'month', step: 3 },
      { unit: 'quarter', step: 1 },
      { unit: 'week', step: 2 },
      { unit: 'date', step: 10 },
      { unit: 'week', step: 1 },
    ],
    1300,
  );
  return () => stage.dispose();
};

export default mount;
