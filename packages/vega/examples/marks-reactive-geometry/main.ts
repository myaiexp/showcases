// A text mark takes a named symbol mark as data and follows its x and y
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420, height: 220, padding: 5,
    signals: [{ name: 'lift', value: 0, bind: { input: 'range', min: 0, max: 60, step: 1 } }],
    data: [{ name: 'source', values: [
      { u: 1, v: 30, label: 'alpha' }, { u: 2, v: 70, label: 'beta' }, { u: 3, v: 45, label: 'gamma' },
      { u: 4, v: 85, label: 'delta' }, { u: 5, v: 20, label: 'epsilon' }, { u: 6, v: 60, label: 'zeta' },
    ] }],
    scales: [
      { name: 'x', type: 'linear', domain: [0.5, 6.5], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    marks: [
      {
        // Named, so other marks can use its items as their data.
        name: 'baseMarks',
        type: 'symbol',
        from: { data: 'source' },
        encode: {
          update: {
            x: { scale: 'x', field: 'u' },
            y: { signal: "scale('y', datum.v) - lift * (datum.u % 2)" },
            size: { value: 120 }, fill: { value: 'steelblue' },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'baseMarks' },
        encode: {
          update: {
            // Here "x" and "y" are the base items' own computed properties.
            x: { field: 'x', offset: 10 },
            y: { field: 'y' },
            baseline: { value: 'middle' },
            text: { field: 'datum.label' },
            fill: { value: 'orange' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);

  cycle(stage, view, 'lift', [0, 40, 15, 55], 1300);
  return () => stage.dispose();
};

export default mount;
