// Type-checking functions: nine predicates asked about a value you pick from nine samples
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { exprMarks, exprSize, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

const rows: ExprRow[] = [
  { head: 'v = samples[pick]' },
  'isArray(v)',
  'isBoolean(v)',
  'isDate(v)',
  'isDefined(v)',
  'isNumber(v)',
  'isObject(v)',
  'isRegExp(v)',
  'isString(v)',
  'isValid(v)',
];

const labels = ['1', '"a"', 'true', 'null', 'NaN', '[1, 2]', '{a: 1}', 'datetime(2020, 0, 1)', 'regexp("a+")'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    ...exprSize(rows, { labelWidth: 150, resultWidth: 150 }),
    padding: 8,
    signals: [
      // The samples are built by expressions: NaN, a Date and a RegExp have no JSON form.
      { name: 'samples', init: '[1, "a", true, null, NaN, [1, 2], {a: 1}, datetime(2020, 0, 1), regexp("a+")]' },
      { name: 'pick', value: 0, bind: { input: 'select', options: [0, 1, 2, 3, 4, 5, 6, 7, 8], labels } },
      { name: 'v', update: 'samples[pick]' },
    ],
    marks: [
      ...exprMarks(rows, { labelWidth: 150, resultWidth: 150 }),
      {
        // The same sample picked in the chips on the right, so the answers read against a value.
        type: 'text',
        from: { data: 'chips' },
        encode: {
          update: {
            x: { value: 330 },
            y: { signal: 'datum.i * 18 + 27' },
            text: { signal: 'datum.label' },
            fill: { signal: 'datum.i === pick ? "#ffb454" : "#667"' },
            fontSize: { value: 11 },
            font: { value: 'ui-monospace, monospace' },
          },
        },
      },
    ],
    data: [{ name: 'chips', values: labels.map((label, i) => ({ label, i })) }],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'pick', [0, 1, 2, 3, 4, 5, 6, 7, 8], 1100);
  return () => stage.dispose();
};

export default mount;
