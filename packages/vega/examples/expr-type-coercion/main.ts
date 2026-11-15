// Type coercion: toNumber, toString, toBoolean and toDate applied to one input string
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { exprMarks, exprSize, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

const inputs = ['42', '3.5e2', '', 'true', 'false', '2020-05-17', 'abc', ' 7 '];

const rows: ExprRow[] = [
  { head: 'text is the input below' },
  'toNumber(text)',
  'toNumber(text) + 1',
  'toString(toNumber(text))',
  'toBoolean(text)',
  'toDate(text)',
  'isDate(toDate(text))',
  'isValid(toNumber(text))',
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    ...exprSize(rows, { labelWidth: 220, resultWidth: 260 }),
    padding: 8,
    signals: [
      // A select keeps the samples in reach, including the empty string (coerced to null).
      { name: 'text', value: '42', bind: { input: 'select', options: inputs, labels: inputs.map((s) => `"${s}"`) } },
    ],
    marks: exprMarks(rows, { labelWidth: 220, resultWidth: 260 }),
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'text', inputs, 1100);
  return () => stage.dispose();
};

export default mount;
