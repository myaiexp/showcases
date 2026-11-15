// timeFormat with no specifier picks a format by date coarseness
import * as vega from 'vega';
import { api } from '../../shared/vega-api.ts';
import type { Mount } from '@/types.ts';
import { revealRows, tableSpec } from '../../shared/api-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // Local dates, each sitting exactly on one boundary: year, month, week (a Sunday), day, hour, minute, second, ms.
  const dates: [string, Date][] = [
    ['year start', new Date(2024, 0, 1)],
    ['month start', new Date(2024, 2, 1)],
    ['a Sunday', new Date(2024, 2, 10)],
    ['a day', new Date(2024, 2, 12)],
    ['an hour', new Date(2024, 2, 12, 15)],
    ['a minute', new Date(2024, 2, 12, 15, 30)],
    ['a second', new Date(2024, 2, 12, 15, 30, 45)],
    ['a millisecond', new Date(2024, 2, 12, 15, 30, 45, 120)],
  ];
  // 6.4.0 trap: the docs list vega.timeFormat and vega.utcFormat, but neither is exported at the top
  // level; they live on the combined locale object (api.defaultLocale()), with the same signatures.
  const locale = api.defaultLocale();
  const standard = locale.timeFormat();
  const custom = locale.timeFormat({ year: '%Y', month: '%b %Y', week: 'wk of %d %b', date: '%A %d', hours: '%H:00', minutes: '%H:%M', seconds: '%H:%M:%S' });
  const plain = locale.timeFormat('%d.%m.%Y %H:%M');
  const utc = locale.utcFormat('%Y-%m-%dT%H:%MZ');

  const rows = dates.map(([label, d]) => [label, standard(d), custom(d), plain(d), utc(d)]);
  const columns = [{ title: 'date', width: 110 }, { title: 'timeFormat()', width: 110 }, { title: 'timeFormat({…})', width: 150 }, { title: "timeFormat('%d.%m.%Y %H:%M')", width: 200 }, { title: 'utcFormat(...)', width: 180 }];
  const view = await stage.render(tableSpec(columns, rows, { rowHeight: 20 }));
  revealRows(stage, view, rows.length);
  return () => stage.dispose();
};

export default mount;
