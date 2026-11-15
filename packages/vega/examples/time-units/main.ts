// timeUnits and timeUnitSpecifier: sorted unit lists and their format strings
import * as vega from 'vega';
import { api } from '../../shared/vega-api.ts';
import type { TimeUnit } from 'vega';
import type { Mount } from '@/types.ts';
import { attempt, revealRows, tableSpec } from '../../shared/api-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const u = (...units: string[]): TimeUnit[] => units as TimeUnit[];
  const rows: [string, () => unknown][] = [
    ["timeUnits(['date', 'year', 'month'])", () => api.timeUnits(u('date', 'year', 'month'))],
    ["timeUnits(['minutes', 'hours'])", () => api.timeUnits(u('minutes', 'hours'))],
    ["timeUnits(['isoweek', 'year'])", () => api.timeUnits(u('isoweek', 'year'))],
    ["timeUnits(['month', 'week'])  (incompatible)", () => api.timeUnits(u('month', 'week'))],
    ["timeUnits(['week', 'isoweek'])  (incompatible)", () => api.timeUnits(u('week', 'isoweek'))],
    ["timeUnits(['fortnight'])  (invalid)", () => api.timeUnits(u('fortnight'))],
    ['timeUnits([])  (empty)', () => api.timeUnits([])],
    ["timeUnitSpecifier(['year'])", () => api.timeUnitSpecifier(u('year'))],
    ["timeUnitSpecifier(['year', 'month', 'date'])", () => api.timeUnitSpecifier(u('year', 'month', 'date'))],
    ["timeUnitSpecifier(['month', 'date'])", () => api.timeUnitSpecifier(u('month', 'date'))],
    ["timeUnitSpecifier(['hours', 'minutes'])", () => api.timeUnitSpecifier(u('hours', 'minutes'))],
    ["timeUnitSpecifier(['year', 'isoweek'])", () => api.timeUnitSpecifier(u('year', 'isoweek'))],
    ["timeUnitSpecifier(['quarter'])", () => api.timeUnitSpecifier(u('quarter'))],
    ["timeUnitSpecifier(['year', 'month'], {'year-month': '%B %Y'})", () => api.timeUnitSpecifier(u('year', 'month'), { 'year-month': '%B %Y' })],
    ["timeUnitSpecifier(['year', 'month'], {'year-month': null, year: '%y/', month: '%m'})", () => api.timeUnitSpecifier(u('year', 'month'), { 'year-month': null, year: '%y/', month: '%m' } as never)],
  ];
  const table = rows.map(([call, fn]) => [call, attempt(fn)]);
  const view = await stage.render(tableSpec([{ title: 'call', width: 400 }, { title: 'result', width: 220 }], table, { rowHeight: 16 }));
  revealRows(stage, view, table.length);
  return () => stage.dispose();
};

export default mount;
