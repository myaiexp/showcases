// A named style is a set of defaults from config, layered under the encoding
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420, height: 180, padding: 5,
    signals: [{ name: 'len', value: 1, bind: { input: 'range', min: 0.2, max: 1, step: 0.05 } }],
    // Named collections of mark property defaults.
    config: {
      style: {
        warm: { fill: '#f59e0b', stroke: '#7c2d12', strokeWidth: 3 },
        soft: { cornerRadius: 12, fillOpacity: 0.7 },
        cool: { fill: '#4fa3e0' },
      },
    },
    data: [
      { name: 'rows', values: [{ k: 'style: warm', v: 300 }, { k: 'style: [warm, cool]', v: 220 }, { k: 'style: [warm, soft] + own fill', v: 260 }] },
      { name: 'a', source: 'rows', transform: [{ type: 'filter', expr: "datum.k === 'style: warm'" }] },
      { name: 'b', source: 'rows', transform: [{ type: 'filter', expr: "datum.k === 'style: [warm, cool]'" }] },
      { name: 'c', source: 'rows', transform: [{ type: 'filter', expr: "datum.k === 'style: [warm, soft] + own fill'" }] },
    ],
    scales: [{ name: 'y', type: 'band', domain: { data: 'rows', field: 'k' }, range: 'height', padding: 0.2 }],
    marks: [
      {
        type: 'rect', from: { data: 'a' }, style: 'warm',
        encode: { update: { x: { value: 0 }, x2: { signal: 'datum.v * len' }, y: { scale: 'y', field: 'k' }, height: { scale: 'y', band: 1 } } },
      },
      {
        // Later styles override earlier ones: warm's fill gives way to cool's.
        type: 'rect', from: { data: 'b' }, style: ['warm', 'cool'],
        encode: { update: { x: { value: 0 }, x2: { signal: 'datum.v * len' }, y: { scale: 'y', field: 'k' }, height: { scale: 'y', band: 1 } } },
      },
      {
        // Properties in the encode block beat any style.
        type: 'rect', from: { data: 'c' }, style: ['warm', 'soft'],
        encode: { update: { x: { value: 0 }, x2: { signal: 'datum.v * len' }, y: { scale: 'y', field: 'k' }, height: { scale: 'y', band: 1 }, fill: { value: 'seagreen' } } },
      },
      { type: 'text', from: { data: 'rows' }, encode: { update: { x: { value: 8 }, y: { scale: 'y', field: 'k', band: 0.5 }, baseline: { value: 'middle' }, text: { field: 'k' }, fill: { value: '#111' }, fontSize: { value: 12 } } } },
    ],
  };

  const view = await stage.render(spec);

  cycle(stage, view, 'len', [1, 0.5, 0.8, 0.3], 1300);
  return () => stage.dispose();
};

export default mount;
