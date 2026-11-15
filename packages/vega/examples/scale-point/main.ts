// Point scale: outer padding pulls the first and last points in from the ends of the range
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440, height: 90, padding: 5,
    signals: [{ name: 'pad', value: 0, bind: { input: 'range', min: 0, max: 2, step: 0.25, name: 'padding' } }],
    data: [{ name: 'table', values: ['north', 'east', 'south', 'west', 'centre'].map((c) => ({ c })) }],
    scales: [
      // Points have no band width: only the step between them, plus padding at the ends.
      { name: 'x', type: 'point', domain: { data: 'table', field: 'c' }, range: 'width', padding: { signal: 'pad' } },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }],
    marks: [
      { type: 'rect', encode: { update: { x: { value: 0 }, x2: { signal: 'width' }, y: { value: 0 }, y2: { signal: 'height' }, fill: { value: '#ffffff' }, fillOpacity: { value: 0.06 } } } },
      {
        type: 'symbol', from: { data: 'table' },
        encode: { update: { x: { scale: 'x', field: 'c' }, y: { signal: 'height / 2' }, size: { value: 160 }, fill: { value: 'steelblue' } } },
      },
      { type: 'text', encode: { update: { x: { value: 4 }, y: { value: 10 }, text: { signal: "'padding ' + pad" }, fill: { value: '#ddd' } } } },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ pad: 0 }, { pad: 0.5 }, { pad: 1 }, { pad: 2 }, { pad: 0.25 }], 1400);
  return () => stage.dispose();
};

export default mount;
