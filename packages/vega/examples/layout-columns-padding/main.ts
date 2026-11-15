// Group layout: columns wrap a row of groups into a grid, padding spaces them
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    padding: 5,

    signals: [
      { name: 'columns', value: 3, bind: { input: 'range', min: 1, max: 6, step: 1 } },
      { name: 'rowPad', value: 12, bind: { input: 'range', min: 0, max: 40, step: 2, name: 'padding.row' } },
      { name: 'colPad', value: 12, bind: { input: 'range', min: 0, max: 40, step: 2, name: 'padding.column' } },
    ],

    // The layout positions every top-level group mark below. Without `columns` there would
    // be a single row; padding takes one number or a {row, column} object.
    layout: { columns: { signal: 'columns' }, padding: { row: { signal: 'rowPad' }, column: { signal: 'colPad' } }, align: 'each' },

    data: [{ name: 'panels', values: ['A', 'B', 'C', 'D', 'E', 'F'].map((name, i) => ({ name, i })) }],

    marks: [
      {
        type: 'group',
        from: { data: 'panels' },
        encode: {
          update: {
            width: { value: 90 },
            height: { value: 60 },
            fill: { value: '#1d2736' },
            stroke: { value: 'steelblue' },
          },
        },
        marks: [
          {
            type: 'text',
            encode: {
              update: {
                // {group: "width"} reads the enclosing group instance's width.
                x: { field: { group: 'width' }, mult: 0.5 },
                y: { field: { group: 'height' }, mult: 0.5 },
                align: { value: 'center' },
                baseline: { value: 'middle' },
                fontSize: { value: 22 },
                text: { field: 'name' },
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
      { columns: 2, rowPad: 24, colPad: 6 },
      { columns: 6, rowPad: 12, colPad: 20 },
      { columns: 3, rowPad: 4, colPad: 4 },
      { columns: 1, rowPad: 8, colPad: 12 },
    ],
    1400,
  );
  return () => stage.dispose();
};

export default mount;
