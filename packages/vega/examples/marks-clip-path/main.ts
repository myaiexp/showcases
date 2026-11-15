// An object-valued clip keeps only what falls inside an SVG path
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 360, height: 220, padding: 5,
    signals: [
      {
        name: 'shape', value: 'star',
        bind: { input: 'select', options: ['star', 'diamond', 'circle'] },
      },
      {
        name: 'path',
        update: "{star: 'M180,10L215,85L295,95L235,150L252,210L180,175L108,210L125,150L65,95L145,85Z', diamond: 'M180,10L300,110L180,210L60,110Z', circle: 'M180,110m-95,0a95,95 0 1,0 190,0a95,95 0 1,0 -190,0'}[shape]",
      },
    ],
    data: [{ name: 'stripes', values: Array.from({ length: 24 }, (_, i) => ({ i })) }],
    scales: [{ name: 'c', type: 'linear', domain: [0, 23], range: ['#4fa3e0', '#f59e0b'], interpolate: 'hcl' }],
    marks: [
      // Unclipped, faint: everything the clip removes.
      {
        type: 'rect', from: { data: 'stripes' },
        encode: { update: { x: { signal: 'datum.i * width / 24' }, width: { signal: 'width / 24 + 1' }, y: { value: 0 }, y2: { signal: 'height' }, fill: { scale: 'c', field: 'i' }, fillOpacity: { value: 0.14 } } },
      },
      {
        type: 'rect', from: { data: 'stripes' },
        clip: { path: { signal: 'path' } },
        encode: { update: { x: { signal: 'datum.i * width / 24' }, width: { signal: 'width / 24 + 1' }, y: { value: 0 }, y2: { signal: 'height' }, fill: { scale: 'c', field: 'i' } } },
      },
    ],
  };

  const view = await stage.render(spec);

  cycle(stage, view, 'shape', ['star', 'diamond', 'circle'], 1500);
  return () => stage.dispose();
};

export default mount;
