// Symlog scale: a log-like ruler that still handles zero and negatives, with its constant as a signal
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 460, height: 130, padding: 5,
    signals: [{ name: 'c', value: 1, bind: { input: 'select', options: [0.1, 1, 10, 100], name: 'constant' } }],
    data: [{ name: 'ruler', values: [-1000, -300, -100, -30, -10, -3, -1, 0, 1, 3, 10, 30, 100, 300, 1000].map((v) => ({ v })) }],
    scales: [
      { name: 'x', type: 'symlog', constant: { signal: 'c' }, domain: [-1000, 1000], range: 'width' },
    ],
    axes: [{ orient: 'bottom', scale: 'x', values: [-1000, -100, -10, -1, 0, 1, 10, 100, 1000], grid: true, gridOpacity: 0.25 }],
    marks: [
      {
        type: 'symbol', from: { data: 'ruler' },
        encode: { update: { x: { scale: 'x', field: 'v' }, y: { value: 60 }, size: { value: 110 }, fill: { value: 'orange' } } },
      },
      { type: 'text', encode: { update: { x: { value: 0 }, y: { value: 8 }, text: { signal: "'constant ' + c" }, fill: { value: '#ddd' } } } },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ c: 1 }, { c: 10 }, { c: 100 }, { c: 0.1 }], 1600);
  return () => stage.dispose();
};

export default mount;
