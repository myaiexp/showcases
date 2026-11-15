// String functions: pad, truncate, trim, lower and upper reshape one text
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { exprMarks, exprSize, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

const rows: ExprRow[] = [
  { head: 'results are wrapped in [ ] so padding is visible' },
  '"[" + text + "]"',
  '"[" + trim(text) + "]"',
  '"[" + upper(trim(text)) + "]"',
  '"[" + lower(trim(text)) + "]"',
  '"[" + pad(trim(text), padTo) + "]"',
  '"[" + pad(trim(text), padTo, "·", side) + "]"',
  '"[" + truncate(trim(text), cutAt) + "]"',
  '"[" + truncate(trim(text), cutAt, side) + "]"',
  '"[" + truncate(trim(text), cutAt, side, "...") + "]"',
];
const opts = { labelWidth: 280, resultWidth: 260 };

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    ...exprSize(rows, opts),
    padding: 8,
    signals: [
      { name: 'text', value: '  Hello, Vega Expressions  ', bind: { input: 'text', placeholder: 'any text' } },
      { name: 'padTo', value: 32, bind: { input: 'range', min: 20, max: 40, step: 1 } },
      { name: 'cutAt', value: 14, bind: { input: 'range', min: 4, max: 24, step: 1 } },
      { name: 'side', value: 'right', bind: { input: 'radio', options: ['left', 'center', 'right'] } },
    ],
    marks: exprMarks(rows, opts),
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { padTo: 32, cutAt: 14, side: 'right' },
      { padTo: 38, cutAt: 20, side: 'center' },
      { padTo: 28, cutAt: 9, side: 'left' },
      { padTo: 34, cutAt: 17, side: 'right' },
      { padTo: 40, cutAt: 11, side: 'center' },
    ],
    1200,
  );
  return () => stage.dispose();
};

export default mount;
