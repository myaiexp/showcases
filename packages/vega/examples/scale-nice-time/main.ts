// nice on a time scale takes an interval name or an {interval, step} object
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 460, height: 90, padding: 5,
    signals: [
      { name: 'interval', value: 'month', bind: { input: 'select', options: ['day', 'week', 'month', 'quarter', 'year'] } },
      { name: 'niceSpec', update: "interval == 'quarter' ? {interval: 'month', step: 3} : interval" },
    ],
    scales: [
      {
        name: 'x', type: 'time', range: 'width', nice: { signal: 'niceSpec' },
        domain: [{ signal: 'datetime(2001, 1, 15)' }, { signal: 'datetime(2002, 4, 20)' }],
      },
    ],
    axes: [{ orient: 'bottom', scale: 'x', grid: true, gridOpacity: 0.25 }],
    marks: [
      { type: 'rule', encode: { update: { x: { scale: 'x', signal: 'datetime(2001, 1, 15)' }, y: { value: 0 }, y2: { signal: 'height' }, stroke: { value: 'orange' }, strokeDash: { value: [4, 3] } } } },
      { type: 'rule', encode: { update: { x: { scale: 'x', signal: 'datetime(2002, 4, 20)' }, y: { value: 0 }, y2: { signal: 'height' }, stroke: { value: 'orange' }, strokeDash: { value: [4, 3] } } } },
      { type: 'text', encode: { update: { x: { signal: 'width / 2' }, y: { value: 30 }, align: { value: 'center' }, text: { signal: "'nice: ' + interval" }, fill: { value: '#ddd' } } } },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ interval: 'day' }, { interval: 'week' }, { interval: 'month' }, { interval: 'quarter' }, { interval: 'year' }], 1400);
  return () => stage.dispose();
};

export default mount;
