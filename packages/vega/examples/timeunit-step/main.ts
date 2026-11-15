// Timeunit step and interval: multi-week bins, with or without the bin's end date
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { dateRows } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 190,
    padding: 5,
    signals: [
      { name: 'step', value: 2, bind: { input: 'select', options: [1, 2, 4, 8] } },
      { name: 'interval', value: true, bind: { input: 'checkbox' } },
    ],
    data: [
      { name: 'events', values: dateRows(271, 360), transform: [{ type: 'formula', as: 'date', expr: 'toDate(datum.t)' }] },
      {
        name: 'bins',
        source: 'events',
        // Year plus ISO week, binned `step` weeks at a time. interval false writes only unit0.
        transform: [
          { type: 'timeunit', field: 'date', units: ['year', 'isoweek'], step: { signal: 'step' }, interval: { signal: 'interval' }, timezone: 'utc' },
          { type: 'aggregate', groupby: ['unit0', 'unit1'] },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'utc', domain: [Date.UTC(2022, 0, 1), Date.UTC(2024, 0, 1)], range: 'width' },
      { name: 'y', type: 'linear', domain: { data: 'bins', field: 'count' }, zero: true, nice: true, range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', title: 'events' }],
    title: { text: { signal: "'step ' + step + ' week(s), interval ' + interval + ': ' + length(data('bins')) + ' bins'" }, color: '#ddd' },
    marks: [
      {
        type: 'rect',
        from: { data: 'bins' },
        encode: {
          update: {
            x: { scale: 'x', field: 'unit0' },
            x2: { scale: 'x', signal: 'interval ? datum.unit1 : datum.unit0 + 5 * 864e5' },
            y: { scale: 'y', field: 'count' },
            y2: { scale: 'y', value: 0 },
            fill: { signal: "interval ? 'orange' : '#6bd'" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const steps: [number, boolean][] = [[2, true], [4, true], [8, true], [1, true], [2, false]];
    stage.every(1500, async (i) => {
      const [s, itv] = steps[i % steps.length]!;
      view.signal('step', s).signal('interval', itv);
      await view.runAsync();
    });
  }
  return () => stage.dispose();
};

export default mount;
