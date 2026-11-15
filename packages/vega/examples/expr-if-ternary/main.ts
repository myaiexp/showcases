// The if() function and the ternary operator: two spellings of one conditional, steering bar colour
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const values = [14, 62, 35, 81, 48, 90, 27, 70, 55, 8, 66, 41].map((v, i) => ({ k: String.fromCharCode(65 + i), v }));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 220,
    padding: 8,
    signals: [{ name: 'cut', value: 50, bind: { input: 'range', min: 0, max: 100, step: 1 } }],
    data: [
      { name: 'table', values },
      { name: 'pass', source: 'table', transform: [{ type: 'filter', expr: 'datum.v >= cut' }] },
    ],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'k' }, range: 'width', padding: 0.15 },
      { name: 'y', domain: [0, 100], range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x' },
      { orient: 'left', scale: 'y' },
    ],
    marks: [
      {
        type: 'rect',
        from: { data: 'table' },
        encode: {
          update: {
            x: { scale: 'x', field: 'k' },
            width: { scale: 'x', band: 1 },
            y: { scale: 'y', field: 'v' },
            y2: { scale: 'y', value: 0 },
            // The function form of the conditional...
            fill: { signal: "if(datum.v >= cut, 'orange', 'steelblue')" },
            // ...and the same test as a ternary operator.
            fillOpacity: { signal: 'datum.v >= cut ? 1 : 0.55' },
          },
        },
      },
      {
        type: 'rule',
        encode: {
          update: {
            x: { value: 0 },
            x2: { signal: 'width' },
            y: { scale: 'y', signal: 'cut' },
            stroke: { value: '#ddd' },
            strokeDash: { value: [4, 3] },
          },
        },
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { signal: 'width', offset: -4 },
            y: { scale: 'y', signal: 'cut', offset: -6 },
            align: { value: 'right' },
            fill: { value: '#ddd' },
            fontSize: { value: 11 },
            // data() returns a data set's rows as an array, so length() counts the survivors.
            text: { signal: "length(data('pass')) + ' of ' + length(data('table')) + ' bars at or above ' + cut" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'cut', [20, 35, 50, 65, 80, 95, 60], 900);
  return () => stage.dispose();
};

export default mount;
