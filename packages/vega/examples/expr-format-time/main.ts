// Formatting functions: timeFormat and utcFormat with d3-time-format specifiers on one moment
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { exprMarks, exprSize, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

const specs = ['%Y-%m-%d', '%A, %B %d', '%b %e, %Y', '%I:%M:%S %p', '%H:%M:%S.%L', '%j', '%U', '%V', '%a %d %b %y', '%x %X'];
const rows: ExprRow[] = [
  { head: 'moment = utc(2024, 0, 1, 18, 5, 9, 42) + shift hours' },
  ...specs.flatMap((s): ExprRow[] => [
    { expr: `utcFormat(moment, "${s}")`, label: `utcFormat(moment, "${s}")` },
  ]),
  { head: 'the same in local time, as a timestamp number or a Date' },
  { expr: 'timeFormat(moment, "%Y-%m-%d %H:%M")', label: 'timeFormat(moment, "%Y-%m-%d %H:%M")' },
  { expr: 'timeFormat(datetime(2024, 11, 25), "%A")', label: 'timeFormat(datetime(2024, 11, 25), "%A")' },
  { expr: 'timeFormat(null, "%Y")', label: 'timeFormat(null, "%Y")' },
];
const opts = { labelWidth: 280, resultWidth: 190 };

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    ...exprSize(rows, opts),
    padding: 8,
    signals: [
      { name: 'shift', value: 4000, bind: { input: 'range', min: 0, max: 17000, step: 24 } },
      { name: 'moment', update: 'utc(2024, 0, 1, 18, 5, 9, 42) + shift * 3600000' },
    ],
    marks: exprMarks(rows, opts),
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'shift', [4000, 0, 2200, 9500, 15000, 7000], 1100);
  return () => stage.dispose();
};

export default mount;
