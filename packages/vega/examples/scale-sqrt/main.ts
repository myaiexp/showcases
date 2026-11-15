// Square root scale: circle radius from sqrt keeps area proportional to the value
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 480, height: 190, padding: 5,
    signals: [{ name: 'top', value: 36, bind: { input: 'range', min: 36, max: 100, step: 2 } }],
    data: [{ name: 'vals', values: [{ v: 1 }, { v: 4 }, { v: 9 }, { v: 16 }, { v: 25 }, { v: 36 }] }],
    scales: [
      { name: 'x', type: 'point', domain: { data: 'vals', field: 'v' }, range: 'width', padding: 0.5 },
      { name: 'rLin', type: 'linear', domain: [0, { signal: 'top' }], range: [0, 34] },
      // sqrt is a power scale with exponent 0.5: radius ~ sqrt(value), so area ~ value.
      { name: 'rSqrt', type: 'sqrt', domain: [0, { signal: 'top' }], range: [0, 34] },
    ],
    axes: [{ orient: 'bottom', scale: 'x', title: 'value' }],
    marks: [
      {
        type: 'symbol', from: { data: 'vals' },
        encode: { update: {
          x: { scale: 'x', field: 'v' }, y: { value: 45 },
          size: { signal: "pow(2 * scale('rLin', datum.v), 2)" }, fill: { value: 'steelblue' }, fillOpacity: { value: 0.85 },
        } },
      },
      {
        type: 'symbol', from: { data: 'vals' },
        encode: { update: {
          x: { scale: 'x', field: 'v' }, y: { value: 125 },
          size: { signal: "pow(2 * scale('rSqrt', datum.v), 2)" }, fill: { value: 'orange' }, fillOpacity: { value: 0.85 },
        } },
      },
      { type: 'text', encode: { update: { x: { value: 0 }, y: { value: 0 }, text: { value: 'linear radius' }, fill: { value: '#aaa' } } } },
      { type: 'text', encode: { update: { x: { value: 0 }, y: { value: 82 }, text: { value: 'sqrt radius' }, fill: { value: '#aaa' } } } },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ top: 36 }, { top: 60 }, { top: 100 }, { top: 48 }]);
  return () => stage.dispose();
};

export default mount;
