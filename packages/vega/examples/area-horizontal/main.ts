// orient horizontal makes an area from y, x and x2 instead of x, y and y2
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 300, height: 260, padding: 5,
    signals: [
      { name: 'orient', value: 'horizontal', bind: { input: 'select', options: ['horizontal', 'vertical'] } },
      { name: 'base', value: 0, bind: { input: 'range', min: 0, max: 120, step: 1 } },
    ],
    data: [{ name: 'table', values: [[1, 40], [2, 62], [3, 35], [4, 80], [5, 55], [6, 90], [7, 48], [8, 66]].map(([u, v]) => ({ u, v })) }],
    scales: [
      { name: 'along', type: 'linear', domain: [1, 8], range: 'height' },
      { name: 'across', type: 'linear', domain: [0, 100], range: 'width' },
    ],
    marks: [{
      type: 'area',
      from: { data: 'table' },
      encode: {
        enter: { fill: { value: 'seagreen' }, fillOpacity: { value: 0.7 }, stroke: { value: '#9fe3b9' }, strokeWidth: { value: 2 } },
        update: {
          orient: { signal: 'orient' },
          interpolate: { value: 'monotone' },
          // Horizontal: y runs along the data, x and x2 bound the span.
          y: { scale: 'along', field: 'u' },
          x: { scale: 'across', field: 'v' },
          x2: { signal: 'base' },
        },
      },
    }],
  };

  const view = await stage.render(spec);

  cycleSteps(stage, view, [{ base: 0, orient: 'horizontal' }, { base: 90, orient: 'horizontal' }, { base: 40, orient: 'horizontal' }], 1400);
  return () => stage.dispose();
};

export default mount;
