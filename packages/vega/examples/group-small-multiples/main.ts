// One group mark per category, each with its own axis, from a faceted data set
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle, rng } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(8);
  const rows = ['red', 'green', 'blue'].flatMap((s) => ['q1', 'q2', 'q3', 'q4'].map((q) => ({ s, q, v: Math.round(20 + rand() * 70) })));

  const spec: Spec = {
    width: 450, height: 150, padding: 5,
    signals: [{ name: 'grow', value: 1, bind: { input: 'range', min: 0.1, max: 1, step: 0.05 } }],
    data: [{ name: 'table', values: rows }],
    scales: [
      { name: 'panel', type: 'band', domain: { data: 'table', field: 's' }, range: 'width', paddingInner: 0.12 },
      { name: 'color', type: 'ordinal', domain: ['red', 'green', 'blue'], range: ['#e0605a', '#5cb27a', '#4fa3e0'] },
    ],
    marks: [{
      type: 'group',
      from: { facet: { name: 'part', data: 'table', groupby: 's' } },
      encode: {
        update: {
          x: { scale: 'panel', field: 's' }, width: { scale: 'panel', band: 1 }, height: { signal: 'height' },
          fill: { value: '#202633' }, cornerRadius: { value: 6 },
        },
      },
      scales: [
        { name: 'x', type: 'band', domain: { data: 'part', field: 'q' }, range: 'width', padding: 0.2 },
        { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
      ],
      axes: [{ orient: 'bottom', scale: 'x' }],
      marks: [
        {
          type: 'rect',
          from: { data: 'part' },
          encode: {
            update: {
              x: { scale: 'x', field: 'q' }, width: { scale: 'x', band: 1 },
              y: { signal: "scale('y', datum.v * grow)" }, y2: { scale: 'y', value: 0 },
              fill: { scale: 'color', field: 's' },
            },
          },
        },
        { type: 'text', encode: { update: { x: { value: 6 }, y: { value: 14 }, text: { field: { parent: 's' } }, fontWeight: { value: 'bold' } } } },
      ],
    }],
  };

  const view = await stage.render(spec);

  cycle(stage, view, 'grow', [1, 0.3, 0.7, 0.15], 1200);
  return () => stage.dispose();
};

export default mount;
