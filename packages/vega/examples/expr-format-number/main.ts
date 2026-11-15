// Formatting functions: one number through ten d3-format specifiers
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { exprMarks, exprSize, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

const specs = [',.2f', '.0%', '.3s', '+.1e', '$,.0f', '012.3f', '.4~g', ',d', '.2~s', '(.1f'];
const rows: ExprRow[] = [
  { head: 'num = round(pow(10, mag) * 1000) / 1000' },
  { expr: 'num', label: 'num' },
  ...specs.map((s) => ({ expr: `format(num, "${s}")`, label: `format(num, "${s}")` })),
  { expr: 'format(null, ".2f")', label: 'format(null, ".2f")' },
];
const opts = { labelWidth: 200, resultWidth: 160 };

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    ...exprSize(rows, opts),
    padding: 8,
    signals: [
      { name: 'mag', value: 3.1, bind: { input: 'range', min: -3, max: 8, step: 0.1 } },
      { name: 'num', update: 'round(pow(10, mag) * 1000) / 1000' },
    ],
    marks: exprMarks(rows, opts),
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'mag', [3.1, 0.2, 5.4, -1.3, 7.8, 1.5], 1100);
  return () => stage.dispose();
};

export default mount;
