// Bound variables: datum and event inside a handler, and signal names read anywhere
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { exprMarks, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

const rows: ExprRow[] = [
  { head: 'info, set from datum and event' },
  'info.name',
  'info.value',
  'info.type',
  'info.shift',
  'info.px',
  { head: 'a signal name used directly' },
  { expr: 'info.value * factor', label: 'info.value * factor' },
];

const data = [31, 64, 22, 80, 47, 71].map((v, i) => ({ name: 'abcdef'[i], value: v }));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 260,
    height: 190,
    padding: 8,
    signals: [
      { name: 'factor', value: 2, bind: { input: 'range', min: 1, max: 5, step: 0.5 } },
      {
        name: 'info',
        value: {},
        on: [
          // datum is the item's data row; event is the DOM event; x() reads the pointer position.
          {
            events: 'rect:mousemove',
            update: '{name: datum.name, value: datum.value, type: event.type, shift: event.shiftKey, px: round(x())}',
          },
          { events: 'rect:mouseout', update: '{}' },
        ],
      },
    ],
    data: [{ name: 'table', values: data }],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'name' }, range: 'width', padding: 0.1 },
      { name: 'y', domain: [0, 100], range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x' },
      { orient: 'left', scale: 'y', tickCount: 5 },
    ],
    marks: [
      {
        type: 'rect',
        from: { data: 'table' },
        encode: {
          update: {
            x: { scale: 'x', field: 'name' },
            width: { scale: 'x', band: 1 },
            y: { scale: 'y', field: 'value' },
            y2: { scale: 'y', value: 0 },
            fill: { signal: "info.name === datum.name ? 'orange' : 'steelblue'" },
          },
        },
      },
      {
        type: 'group',
        encode: { enter: { x: { value: 300 }, y: { value: 10 } } },
        marks: exprMarks(rows, { labelWidth: 150, resultWidth: 90 }),
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const ghost = stage.ghost(view);
    const x = view.scale('x');
    stage.every(800, (i) => ghost.move(x('abcdef'[i % 6]) + x.bandwidth() / 2 + (i % 3) * 3, 120));
  }
  return () => stage.dispose();
};

export default mount;
