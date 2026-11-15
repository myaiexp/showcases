// Data functions: indata asks whether a data set holds a row; data() returns the rows themselves
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const cats = 'ABCDEFGHIJ';
const table = [34, 61, 25, 83, 47, 72, 18, 90, 56, 40].map((v, i) => ({ k: cats[i] ?? '', v }));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 190,
    padding: 8,
    signals: [
      // The datum of the bar just pressed; force lets the same bar be pressed twice in a row.
      { name: 'pressed', value: null, on: [{ events: '@bar:mousedown', update: 'datum', force: true }] },
    ],
    data: [
      { name: 'table', values: table },
      // Starts holding C and F; a press toggles that bar's row in or out.
      { name: 'picked', values: [table[2], table[5]], on: [{ trigger: 'pressed', toggle: 'pressed' }] },
    ],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'k' }, range: 'width', padding: 0.12 },
      { name: 'y', domain: [0, 100], range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x' },
      { orient: 'left', scale: 'y', tickCount: 5 },
    ],
    marks: [
      {
        type: 'rect',
        name: 'bar',
        from: { data: 'table' },
        encode: {
          update: {
            x: { scale: 'x', field: 'k' },
            width: { scale: 'x', band: 1 },
            y: { scale: 'y', field: 'v' },
            y2: { scale: 'y', value: 0 },
            // indata(name, field, value): does the picked set hold a row whose k equals this bar's?
            fill: { signal: "indata('picked', 'k', datum.k) ? 'orange' : 'steelblue'" },
            cursor: { value: 'pointer' },
          },
        },
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { value: 0 },
            y: { value: -2 },
            fill: { value: '#ddd' },
            fontSize: { value: 11 },
            text: {
              signal:
                "'press bars to pick them: ' + length(data('picked')) + ' picked (' + join(pluck(data('picked'), 'k'), ', ') + '), E is ' + (indata('picked', 'k', 'E') ? 'in' : 'not in') + ' the set'",
            },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const ghost = stage.ghost(view);
    const x = view.scale('x');
    const order = [0, 3, 7, 3, 5, 1, 9, 2];
    stage.every(800, (i) => {
      const k = cats[order[i % order.length] ?? 0] ?? 'A';
      const px = x(k) + x.bandwidth() / 2;
      ghost.move(px, 150);
      ghost.down(px, 150);
      ghost.up(px, 150);
    });
  }
  return () => stage.dispose();
};

export default mount;
