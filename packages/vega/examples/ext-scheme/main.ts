// vega.scheme registers colour schemes, as a colour array and as an interpolator
import * as vega from 'vega';
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Names are not case sensitive, so vega.scheme('SHOWCASE-Dusk') finds the first one too.
vega.scheme('showcase-dusk', ['#2b1055', '#7597de', '#e4a0f7', '#f9d423']);
vega.scheme('showcase-aurora', (t: number) => `hsl(${Math.round(150 + 150 * t)}, ${Math.round(55 + 30 * t)}%, ${Math.round(28 + 38 * Math.sin(Math.PI * t) ** 0.8 + 6)}%)`);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 190,
    padding: 8,
    signals: [{ name: 'mark', value: 0.5, bind: { input: 'range', min: 0, max: 1, step: 0.01, name: 'position' } }],
    data: [
      { name: 'ramp', values: Array.from({ length: 80 }, (_, i) => ({ u: i / 79 })) },
      { name: 'cats', values: ['north', 'south', 'east', 'west', 'centre'].map((k, i) => ({ k, v: 30 + ((i * 37) % 60) })) },
    ],
    scales: [
      { name: 'rampx', type: 'linear', domain: [0, 1], range: 'width' },
      // A function scheme feeds a continuous scale, an array scheme a discrete one.
      { name: 'aurora', type: 'linear', domain: [0, 1], range: { scheme: 'showcase-aurora' } },
      { name: 'dusk', type: 'ordinal', domain: { data: 'cats', field: 'k' }, range: { scheme: 'showcase-dusk' } },
      { name: 'x', type: 'band', domain: { data: 'cats', field: 'k' }, range: 'width', padding: 0.15 },
      { name: 'y', type: 'linear', domain: [0, 100], range: [100, 0] },
    ],
    marks: [
      { type: 'text', encode: { enter: { x: { value: 0 }, y: { value: 8 }, text: { value: "scheme('showcase-aurora'), an interpolator" }, fill: { value: '#a6acb8' }, fontSize: { value: 11 } } } },
      { type: 'rect', from: { data: 'ramp' }, encode: { update: { x: { scale: 'rampx', field: 'u' }, width: { value: 6 }, y: { value: 16 }, height: { value: 22 }, fill: { scale: 'aurora', field: 'u' } } } },
      { type: 'symbol', encode: { update: { x: { scale: 'rampx', signal: 'mark' }, y: { value: 46 }, shape: { value: 'triangle-up' }, size: { value: 70 }, fill: { scale: 'aurora', signal: 'mark' }, stroke: { value: '#fff' } } } },
      { type: 'text', encode: { update: { x: { scale: 'rampx', signal: 'mark' }, y: { value: 62 }, align: { value: 'center' }, text: { signal: 'format(mark, ".2f")' }, fill: { value: '#ddd' }, fontSize: { value: 11 } } } },
      { type: 'group', encode: { enter: { x: { value: 0 }, y: { value: 76 }, width: { signal: 'width' }, height: { value: 100 } } }, marks: [
        { type: 'rect', from: { data: 'cats' }, encode: { update: { x: { scale: 'x', field: 'k' }, width: { scale: 'x', band: 1 }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { scale: 'dusk', field: 'k' } } } },
        { type: 'text', from: { data: 'cats' }, encode: { update: { x: { scale: 'x', field: 'k', band: 0.5 }, y: { signal: '96' }, align: { value: 'center' }, text: { field: 'k' }, fill: { value: '#fff' }, fontSize: { value: 11 } } } },
      ] },
      { type: 'text', encode: { enter: { x: { value: 0 }, y: { value: 184 }, text: { value: "scheme('showcase-dusk'), an array of four colours, repeated by an ordinal scale" }, fill: { value: '#a6acb8' }, fontSize: { value: 11 } } } },
    ],
  };
  const view = await stage.render(spec);
  if (stage.preview) {
    stage.every(120, (i) => {
      view.signal('mark', 0.5 + 0.5 * Math.sin(i / 8));
      return view.runAsync().then(() => undefined);
    });
  }
  return () => stage.dispose();
};

export default mount;
