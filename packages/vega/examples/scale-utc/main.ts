// time and utc scales over the same dates: one lays ticks on local midnights, one on UTC midnights
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 460, height: 90, padding: 5,
    signals: [{ name: 'days', value: 6, bind: { input: 'range', min: 3, max: 15, step: 1, name: 'days shown' } }],
    data: [{
      name: 'events',
      transform: [
        { type: 'sequence', start: 0, stop: 31, as: 'i' },
        { type: 'formula', as: 't', expr: 'utc(2021, 2, 25) + datum.i * 43200000' },
      ],
    }],
    scales: [
      { name: 'utc', type: 'utc', domain: [{ signal: 'utc(2021, 2, 25)' }, { signal: 'utc(2021, 2, 25) + days * 86400000' }], range: 'width' },
      { name: 'local', type: 'time', domain: [{ signal: 'utc(2021, 2, 25)' }, { signal: 'utc(2021, 2, 25) + days * 86400000' }], range: 'width' },
    ],
    axes: [
      { orient: 'top', scale: 'local', title: 'time scale (local midnights)', tickCount: 'day' },
      { orient: 'bottom', scale: 'utc', title: 'utc scale (UTC midnights)', tickCount: 'day' },
    ],
    marks: [{
      type: 'symbol', from: { data: 'events' },
      encode: { update: { x: { scale: 'utc', field: 't' }, y: { signal: 'height / 2' }, size: { value: 60 }, fill: { value: 'orange' } } },
    }],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ days: 6 }, { days: 10 }, { days: 15 }, { days: 4 }], 1600);
  return () => stage.dispose();
};

export default mount;
