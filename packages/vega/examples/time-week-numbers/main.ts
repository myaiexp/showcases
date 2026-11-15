// Day of year, week, ISO week and quarter for dates around a year boundary
import * as vega from 'vega';
import { api } from '../../shared/vega-api.ts';
import type { Mount } from '@/types.ts';
import { revealRows, tableSpec } from '../../shared/api-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // Noon UTC keeps the local and the UTC calendar day the same in almost every time zone.
  const days: [string, number][] = [
    ['2020-12-31', Date.UTC(2020, 11, 31, 12)],
    ['2021-01-01', Date.UTC(2021, 0, 1, 12)],
    ['2021-01-03', Date.UTC(2021, 0, 3, 12)],
    ['2021-01-04', Date.UTC(2021, 0, 4, 12)],
    ['2021-03-31', Date.UTC(2021, 2, 31, 12)],
    ['2021-04-01', Date.UTC(2021, 3, 1, 12)],
    ['2021-12-31', Date.UTC(2021, 11, 31, 12)],
    ['2024-02-29', Date.UTC(2024, 1, 29, 12)],
    ['2024-12-30', Date.UTC(2024, 11, 30, 12)],
  ];
  const fns: [string, (d: number) => number][] = [
    ['dayofyear', api.dayofyear], ['week', api.week], ['isoweek', api.isoweek],
    ['utcweek', api.utcweek], ['utcisoweek', api.utcisoweek], ['quarter', vega.quarter], ['utcquarter', vega.utcquarter],
  ];
  const rows = days.map(([label, t]) => [label, ...fns.map(([, f]) => String(f(t)))]);
  const columns = [{ title: 'date (noon UTC)', width: 130 }, ...fns.map(([name]) => ({ title: name, width: 84 }))];
  const view = await stage.render(tableSpec(columns, rows, { accent: false, rowHeight: 20 }));
  revealRows(stage, view, rows.length);
  return () => stage.dispose();
};

export default mount;
