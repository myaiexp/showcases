// Date-time functions: every local-time getter beside its UTC twin for one moment
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { exprMarks, exprSize, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

// "local / UTC": both results in one row. They differ whenever the viewer's timezone is not UTC.
const pair = (a: string, b: string): ExprRow => ({ expr: `${a}(when) + "   /   " + ${b}(when)`, label: `${a}   /   ${b}` });
const rows: ExprRow[] = [
  { head: 'when = utc(2024, 0, 1, hour, 45, 30, 250) + days * 86400000' },
  { expr: 'time(when)', label: 'time(when)' },
  pair('year', 'utcyear'),
  pair('quarter', 'utcquarter'),
  pair('month', 'utcmonth'),
  pair('week', 'utcweek'),
  pair('isoweek', 'utcisoweek'),
  pair('dayofyear', 'utcdayofyear'),
  pair('date', 'utcdate'),
  pair('day', 'utcday'),
  pair('hours', 'utchours'),
  pair('minutes', 'utcminutes'),
  pair('seconds', 'utcseconds'),
  pair('milliseconds', 'utcmilliseconds'),
  { expr: 'timezoneoffset(when)', label: 'timezoneoffset(when)' },
];
const opts = { labelWidth: 260, resultWidth: 150 };

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    ...exprSize(rows, opts),
    padding: 8,
    signals: [
      { name: 'days', value: 40, bind: { input: 'range', min: 0, max: 730, step: 1 } },
      { name: 'hour', value: 14, bind: { input: 'range', min: 0, max: 23, step: 1 } },
      { name: 'when', update: 'utc(2024, 0, 1, hour, 45, 30, 250) + days * 86400000' },
    ],
    marks: exprMarks(rows, opts),
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { days: 40, hour: 14 },
      { days: 59, hour: 23 },
      { days: 365, hour: 1 },
      { days: 364, hour: 12 },
      { days: 700, hour: 5 },
    ],
    1300,
  );
  return () => stage.dispose();
};

export default mount;
