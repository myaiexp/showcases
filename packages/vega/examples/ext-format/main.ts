// vega.formats registers a data parser: a key=value format for inline strings
import * as vega from 'vega';
import { api } from '../../shared/vega-api.ts';
import type { Data, Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// A format is a function (data, options) returning rows. Ours splits "key=value" pairs on `sep`.
api.formats('showcase-pairs', (data: unknown, options: { sep?: string; scale?: number }) =>
  String(data)
    .split(options.sep ?? ';')
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const [k = '', v = ''] = p.split('=');
      return { k, v: Number(v) * (options.scale ?? 1) };
    }),
);

const rawA = 'fox=12; owl=31; elk=22; hare=47; lynx=8';
const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 160,
    padding: 8,
    signals: [{ name: 'hot', value: 0 }],
    data: [
      // The same string, parsed with different options by the same format.
      // The typings know only the built-in format types and object values, so these two are cast.
      { name: 'a', values: rawA, format: { type: 'showcase-pairs', sep: ';' } } as unknown as Data,
      { name: 'b', values: rawA, format: { type: 'showcase-pairs', sep: ';', scale: 2 } } as unknown as Data,
    ],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'a', field: 'k' }, range: 'width', padding: 0.2 },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', tickCount: 5 }],
    marks: [
      { type: 'rect', from: { data: 'b' }, encode: { update: { x: { scale: 'x', field: 'k' }, width: { scale: 'x', band: 0.5 }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { value: '#f59e0b' }, fillOpacity: { signal: 'indexof(["fox","owl","elk","hare","lynx"], datum.k) == hot ? 1 : 0.55' } } } },
      { type: 'rect', from: { data: 'a' }, encode: { update: { x: { scale: 'x', field: 'k', offset: { signal: 'bandwidth("x") / 2' } }, width: { scale: 'x', band: 0.5 }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { value: 'steelblue' }, fillOpacity: { signal: 'indexof(["fox","owl","elk","hare","lynx"], datum.k) == hot ? 1 : 0.55' } } } },
      { type: 'text', encode: { enter: { x: { value: 0 }, y: { value: 0 }, text: { value: `values: "${rawA}"` }, fill: { value: '#a6acb8' }, font: { value: 'monospace' }, fontSize: { value: 10 } } } },
      { type: 'text', encode: { enter: { x: { value: 0 }, y: { value: 14 }, text: { value: "blue: {sep: ';'}   orange: {sep: ';', scale: 2}" }, fill: { value: '#ddd' }, font: { value: 'monospace' }, fontSize: { value: 10 } } } },
    ],
  };
  const view = await stage.render(spec);
  stage.every(700, (i) => {
    view.signal('hot', i % 5);
    return view.runAsync().then(() => undefined);
  });
  return () => stage.dispose();
};

export default mount;
