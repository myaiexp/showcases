// Math functions: floor, ceil, round, abs, clamp, min, max and the NaN/finite checks on one number
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { exprMarks, exprSize, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

const rows: ExprRow[] = [
  'floor(n)',
  'ceil(n)',
  'round(n)',
  'abs(n)',
  'clamp(n, -2, 2)',
  'min(n, 1, 5)',
  'max(n, 1, 5)',
  { expr: 'format(sqrt(n), ".4f")', label: 'sqrt(n)' },
  { expr: 'format(log(n), ".4f")', label: 'log(n)' },
  'isNaN(sqrt(n))',
  'isFinite(1 / n)',
  'format(exp(n), ".4~g")',
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const opts = { labelWidth: 160, resultWidth: 150 };

  const spec: Spec = {
    ...exprSize(rows, opts),
    padding: 8,
    // Try negative numbers and 0: sqrt gives NaN, 1 / 0 is not finite.
    signals: [{ name: 'n', value: 2.5, bind: { input: 'range', min: -6, max: 6, step: 0.5 } }],
    marks: exprMarks(rows, opts),
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'n', [2.5, -1.5, 0, 4, -4.5, 0.5, 5.5], 1000);
  return () => stage.dispose();
};

export default mount;
