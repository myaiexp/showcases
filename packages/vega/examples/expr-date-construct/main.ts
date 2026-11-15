// Date-time functions: datetime, utc, time, timeOffset and utcOffset step a date by a unit
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { exprMarks, exprSize, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

const units = ['year', 'quarter', 'month', 'week', 'date', 'hours', 'minutes'];
const stamp = (e: string): string => `utcFormat(${e}, "%a %Y-%m-%d %H:%M")`;

const rows: ExprRow[] = [
  { head: 'built from parts (month is zero-based)' },
  { expr: 'timeFormat(datetime(2024, 1, 29, 12, 30), "%a %Y-%m-%d %H:%M")', label: 'datetime(2024, 1, 29, 12, 30)' },
  { expr: 'utc(2024, 1, 29, 12, 30)', label: 'utc(2024, 1, 29, 12, 30)' },
  { expr: 'time(datetime(2024, 1, 29))', label: 'time(datetime(2024, 1, 29))' },
  { expr: 'isDate(datetime(2024, 1))', label: 'isDate(datetime(2024, 1))' },
  { expr: 'isNumber(utc(2024, 1))', label: 'isNumber(utc(2024, 1))' },
  { expr: 'isNumber(now())', label: 'isNumber(now())' },
  { head: 'start = utc(2024, 0, 31, 12, 0); moved by unit and step' },
  { expr: stamp('utcOffset(unit, start, step)'), label: 'utcOffset(unit, start, step)' },
  { expr: stamp('utcOffset(unit, start, -step)'), label: 'utcOffset(unit, start, -step)' },
  { expr: stamp('utcOffset(unit, start)'), label: 'utcOffset(unit, start)' },
  { expr: 'timeFormat(timeOffset(unit, datetime(2024, 0, 31, 12), step), "%a %Y-%m-%d %H:%M")', label: 'timeOffset(unit, datetime(...), step)' },
];
const opts = { labelWidth: 290, resultWidth: 190 };

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    ...exprSize(rows, opts),
    padding: 8,
    signals: [
      { name: 'unit', value: 'month', bind: { input: 'select', options: units } },
      { name: 'step', value: 1, bind: { input: 'range', min: 1, max: 6, step: 1 } },
      // Jan 31 is the telling start: one month later has no 31st, so the date rolls over.
      { name: 'start', update: 'utc(2024, 0, 31, 12, 0)' },
    ],
    marks: exprMarks(rows, opts),
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { unit: 'month', step: 1 },
      { unit: 'week', step: 2 },
      { unit: 'year', step: 1 },
      { unit: 'quarter', step: 3 },
      { unit: 'hours', step: 5 },
      { unit: 'date', step: 4 },
    ],
    1200,
  );
  return () => stage.dispose();
};

export default mount;
