// String functions: indexof, lastindexof, length, slice and substring shown on the characters themselves
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { exprMarks, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

const rows: ExprRow[] = [
  'length(text)',
  'indexof(text, needle)',
  'lastindexof(text, needle)',
  'slice(text, from, to)',
  'substring(text, from, to)',
  'slice(text, from, -4)',
  'indexof(text, "zebra")',
];
const CH = 10.4;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 450,
    height: 190,
    padding: 8,
    signals: [
      { name: 'text', value: 'the quick brown fox jumps over the lazy dog', bind: { input: 'text', placeholder: 'any text' } },
      { name: 'needle', value: 'o', bind: { input: 'text', placeholder: 'search for' } },
      { name: 'from', value: 4, bind: { input: 'range', min: 0, max: 42, step: 1 } },
      { name: 'to', value: 15, bind: { input: 'range', min: 0, max: 43, step: 1 } },
    ],
    data: [
      {
        name: 'chars',
        values: [{}],
        transform: [
          { type: 'formula', as: 'c', expr: "split(text, '')" },
          { type: 'flatten', fields: ['c'], as: ['c'] },
          { type: 'window', ops: ['row_number'], as: ['n'] },
          { type: 'formula', as: 'i', expr: 'datum.n - 1' },
        ],
      },
    ],
    marks: [
      {
        // Blue boxes: the slice. Orange outline: a place where the needle starts. Green: the last one.
        type: 'rect',
        from: { data: 'chars' },
        encode: {
          update: {
            x: { signal: `datum.i * ${CH}` },
            width: { value: CH - 1 },
            y: { value: 0 },
            height: { value: 20 },
            fill: { signal: 'datum.i >= from && datum.i < to ? "#2f5d8a" : "#242a36"' },
            stroke: { signal: 'datum.i === indexof(text, needle) ? "orange" : datum.i === lastindexof(text, needle) ? "#7ad39a" : "transparent"' },
            strokeWidth: { value: 2 },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'chars' },
        encode: {
          update: {
            x: { signal: `datum.i * ${CH} + ${(CH - 1) / 2}` },
            y: { value: 11 },
            align: { value: 'center' },
            baseline: { value: 'middle' },
            text: { field: 'c' },
            fill: { value: '#ddd' },
            font: { value: 'ui-monospace, monospace' },
            fontSize: { value: 11 },
          },
        },
      },
      {
        type: 'text',
        encode: {
          enter: { x: { value: 0 }, y: { value: 36 }, fill: { value: '#8c93a1' }, fontSize: { value: 10.5 }, text: { value: 'blue = slice(from, to)   orange = indexof(needle)   green = lastindexof(needle)' } },
        },
      },
      { type: 'group', encode: { enter: { x: { value: 0 }, y: { value: 52 } } }, marks: exprMarks(rows, { labelWidth: 220, resultWidth: 230 }) },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { from: 4, to: 15, needle: 'o' },
      { from: 16, to: 25, needle: 'the' },
      { from: 0, to: 9, needle: 'u' },
      { from: 30, to: 43, needle: 'z' },
      { from: 10, to: 31, needle: ' ' },
    ],
    1300,
  );
  return () => stage.dispose();
};

export default mount;
