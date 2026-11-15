// Layout center: centre groups of different sizes within their rows and columns
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    padding: 5,

    signals: [
      { name: 'centerRow', value: false, bind: { input: 'checkbox', name: 'center.row' } },
      { name: 'centerColumn', value: false, bind: { input: 'checkbox', name: 'center.column' } },
    ],

    // center is a boolean for both directions, or a {row, column} object of booleans.
    // (The Layout type omits `center`, which layout.md documents, so the object is cast.)
    layout: { columns: 3, padding: 10, align: 'each', center: { row: { signal: 'centerRow' }, column: { signal: 'centerColumn' } } } as Spec['layout'],

    data: [{ name: 'panels', values: [[100, 30], [50, 70], [80, 50], [40, 40], [110, 60], [60, 30]].map(([w, h], i) => ({ w, h, i })) }],

    marks: [
      {
        type: 'group',
        from: { data: 'panels' },
        encode: {
          update: { width: { field: 'w' }, height: { field: 'h' }, fill: { value: '#24324a' }, stroke: { value: 'steelblue' } },
        },
        marks: [
          {
            type: 'text',
            encode: {
              update: {
                x: { field: { group: 'width' }, mult: 0.5 },
                y: { field: { group: 'height' }, mult: 0.5 },
                align: { value: 'center' },
                baseline: { value: 'middle' },
                fontSize: { value: 10 },
                text: { signal: "parent.w + 'x' + parent.h" },
              },
            },
          },
        ],
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { centerRow: true, centerColumn: false },
      { centerRow: false, centerColumn: true },
      { centerRow: true, centerColumn: true },
      { centerRow: false, centerColumn: false },
    ],
    1500,
  );
  return () => stage.dispose();
};

export default mount;
