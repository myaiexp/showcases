// vega.scale registers a scale type: a cube-root scale beside linear and sqrt
import * as vega from 'vega';
import { api } from '../../shared/vega-api.ts';
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// The constructor returns a d3 pow scale with exponent 1/3; "continuous" tells Vega it takes
// nice, zero and the other continuous-scale properties.
api.scale('showcase-cbrt', () => api.scale('pow')().exponent(1 / 3), 'continuous');

const kinds = ['linear', 'sqrt', 'showcase-cbrt'];
const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 150,
    padding: { left: 8, right: 8, top: 8, bottom: 4 },
    signals: [{ name: 'probe', value: 100, bind: { input: 'range', min: 0, max: 1000, step: 5 } }],
    data: [{ name: 'values', values: [0, 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000].map((v) => ({ v })) }, { name: 'kinds', values: kinds.map((k) => ({ k })) }],
    scales: [
      { name: 'row', type: 'point', domain: kinds, range: [20, 125] },
      // Every row gets its own copy of a scale, built here by name; the custom type is just another name.
      { name: 'linear', type: 'linear', domain: [0, 1000], range: 'width' },
      { name: 'sqrt', type: 'sqrt', domain: [0, 1000], range: 'width' },
      { name: 'showcase-cbrt', type: 'showcase-cbrt' as never, domain: [0, 1000], range: 'width' },
    ],
    marks: [
      { type: 'text', from: { data: 'kinds' }, encode: { update: { x: { value: 0 }, y: { scale: 'row', field: 'k', offset: -14 }, text: { field: 'k' }, fill: { value: '#a6acb8' }, fontSize: { value: 11 } } } },
      { type: 'rule', from: { data: 'kinds' }, encode: { update: { x: { value: 0 }, x2: { signal: 'width' }, y: { scale: 'row', field: 'k' }, stroke: { value: '#3b4252' } } } },
      {
        type: 'symbol',
        from: { data: 'kinds' },
        encode: { update: { x: { signal: 'scale(datum.k, probe)' }, y: { scale: 'row', field: 'k' }, size: { value: 120 }, fill: { value: '#f59e0b' } } },
      },
      ...kinds.map((k) => ({
        type: 'symbol' as const,
        from: { data: 'values' },
        encode: { update: { x: { scale: k, field: 'v' }, y: { scale: 'row', value: k }, size: { value: 22 }, fill: { value: 'steelblue' }, fillOpacity: { value: 0.8 } } },
      })),
      { type: 'text', encode: { update: { x: { signal: 'width' }, y: { value: 148 }, align: { value: 'right' }, text: { signal: "'probe ' + probe" }, fill: { value: '#ddd' }, fontSize: { value: 11 } } } },
    ],
  };
  const view = await stage.render(spec);
  if (stage.preview) {
    stage.every(160, (i) => {
      view.signal('probe', 500 + 500 * Math.sin(i / 7));
      return view.runAsync().then(() => undefined);
    });
  }
  return () => stage.dispose();
};

export default mount;
