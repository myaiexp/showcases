// Formatting functions: timeUnitSpecifier builds a time format from units, with optional custom pieces
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { exprMarks, exprSize, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

const choices = ['year', 'year,month', 'year,month,date', 'month,date', 'quarter', 'day', 'year,isoweek', 'hours,minutes', 'minutes', 'seconds'];

const rows: ExprRow[] = [
  { head: 'parts = split(units, ",")' },
  'parts',
  'timeUnitSpecifier(parts)',
  { expr: 'utcFormat(moment, timeUnitSpecifier(parts))', label: 'utcFormat(moment, timeUnitSpecifier(parts))' },
  // The largest matching sequence wins: "year-month" is found before the single units are used.
  { head: 'with custom specifiers (a "year-month" entry too)' },
  { expr: 'timeUnitSpecifier(parts, {year: "Y%Y ", month: "[%B] ", date: "d%d", "year-month": "%Y/%m "})', label: 'timeUnitSpecifier(parts, {...})' },
  {
    expr: 'utcFormat(moment, timeUnitSpecifier(parts, {year: "Y%Y ", month: "[%B] ", date: "d%d", "year-month": "%Y/%m "}))',
    label: 'utcFormat(moment, ...custom)',
  },
];
const opts = { labelWidth: 290, resultWidth: 200 };

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    ...exprSize(rows, opts),
    padding: 8,
    signals: [
      { name: 'units', value: 'year,month,date', bind: { input: 'select', options: choices } },
      { name: 'moment', update: 'utc(2024, 8, 17, 18, 5, 9, 42)' },
      { name: 'parts', update: 'split(units, ",")' },
    ],
    marks: exprMarks(rows, opts),
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'units', choices, 1100);
  return () => stage.dispose();
};

export default mount;
