// Band scale: paddingInner and paddingOuter carve the range into bands and gaps
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420, height: 180, padding: 5,
    signals: [
      { name: 'pi', value: 0.1, bind: { input: 'range', min: 0, max: 0.8, step: 0.05, name: 'paddingInner' } },
      { name: 'po', value: 0, bind: { input: 'range', min: 0, max: 0.8, step: 0.05, name: 'paddingOuter' } },
    ],
    data: [{ name: 'table', values: [
    { c: 'A', v: 28 }, { c: 'B', v: 55 }, { c: 'C', v: 43 }, { c: 'D', v: 91 },
    { c: 'E', v: 81 }, { c: 'F', v: 53 },
  ] }],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'c' }, range: 'width', paddingInner: { signal: 'pi' }, paddingOuter: { signal: 'po' } },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }],
    marks: [
      // The full range, so you can see what the padding leaves over.
      { type: 'rect', encode: { update: { x: { value: 0 }, x2: { signal: 'width' }, y: { value: 0 }, y2: { signal: 'height' }, fill: { value: '#ffffff' }, fillOpacity: { value: 0.06 } } } },
      {
        type: 'rect', from: { data: 'table' },
        encode: { update: {
          x: { scale: 'x', field: 'c' }, width: { scale: 'x', band: 1 },
          y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { value: 'steelblue' },
        } },
      },
      { type: 'text', encode: { update: { x: { value: 4 }, y: { value: 12 }, text: { signal: "'paddingInner ' + pi + ', paddingOuter ' + po" }, fill: { value: '#ddd' } } } },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ pi: 0.1, po: 0 }, { pi: 0.5, po: 0 }, { pi: 0.5, po: 0.5 }, { pi: 0, po: 0.3 }, { pi: 0.7, po: 0.1 }], 1400);
  return () => stage.dispose();
};

export default mount;
