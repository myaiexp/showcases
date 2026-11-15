// Log scale: a ruler of 1-9 times powers of ten, with the logarithm base as a signal
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440, height: 110, padding: 5,
    signals: [{ name: 'base', value: 10, bind: { input: 'select', options: [2, 4, 10] } }],
    data: [{
      name: 'ruler',
      transform: [
        { type: 'sequence', start: 0, stop: 28, as: 'i' },
        { type: 'formula', as: 'v', expr: '(1 + datum.i % 9) * pow(10, floor(datum.i / 9))' },
        { type: 'filter', expr: 'datum.v <= 10000' },
      ],
    }],
    scales: [
      // A log domain must not include zero: 1 to 10000, four orders of magnitude.
      { name: 'x', type: 'log', base: { signal: 'base' }, domain: [1, 10000], range: 'width' },
    ],
    axes: [{ orient: 'bottom', scale: 'x', grid: true, gridOpacity: 0.25, tickCount: 12, format: ',' }],
    marks: [
      {
        type: 'rule', from: { data: 'ruler' },
        encode: { update: { x: { scale: 'x', field: 'v' }, y: { value: 20 }, y2: { signal: 'height' }, stroke: { value: 'orange' }, strokeOpacity: { value: 0.8 } } },
      },
      { type: 'text', encode: { update: { x: { value: 0 }, y: { value: 8 }, text: { signal: "'base ' + base" }, fill: { value: '#ddd' } } } },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ base: 10 }, { base: 2 }, { base: 4 }], 1800);
  return () => stage.dispose();
};

export default mount;
