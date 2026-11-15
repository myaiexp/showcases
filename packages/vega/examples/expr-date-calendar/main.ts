// Date-time functions: a year calendar where week() or isoweek() picks each day's column
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 460,
    height: 130,
    padding: 8,
    signals: [
      { name: 'year', value: 2024, bind: { input: 'select', options: [2020, 2021, 2022, 2023, 2024, 2025, 2026] } },
      { name: 'weeks', value: 'isoweek', bind: { input: 'radio', options: ['week', 'isoweek'] } },
    ],
    data: [
      {
        name: 'days',
        values: [{}],
        transform: [
          { type: 'formula', as: 'd', expr: "utcSequence('date', utc(year, 0, 1), utc(year + 1, 0, 1))" },
          { type: 'flatten', fields: ['d'], as: ['d'] },
          // week() counts Sunday-based weeks from 0; isoweek() counts Monday-based weeks from 1 and
          // can give the days of early January the last week number of the year before.
          { type: 'formula', as: 'w', expr: 'weeks === "week" ? utcweek(datum.d) : utcisoweek(datum.d)' },
          { type: 'formula', as: 'dow', expr: 'weeks === "week" ? utcday(datum.d) : (utcday(datum.d) + 6) % 7' },
          { type: 'formula', as: 'm', expr: 'utcmonth(datum.d)' },
          // ISO week 1 may start in December and week 52 or 53 may reach into January: park those
          // days at the grid's far ends instead of stacking them on the other year's weeks.
          { type: 'formula', as: 'col', expr: 'datum.m === 11 && datum.w < 5 ? 53 : datum.m === 0 && datum.w > 50 ? 0 : datum.w' },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 54], range: 'width' },
      { name: 'y', type: 'band', domain: [0, 1, 2, 3, 4, 5, 6], range: 'height', padding: 0.1 },
      { name: 'c', type: 'ordinal', domain: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], range: { scheme: 'category20' } },
    ],
    marks: [
      {
        type: 'rect',
        from: { data: 'days' },
        encode: {
          update: {
            x: { scale: 'x', field: 'col' },
            width: { signal: 'width / 54 - 1' },
            y: { scale: 'y', field: 'dow' },
            height: { scale: 'y', band: 1 },
            // Alternate months are dimmed so month edges show against the week columns.
            fill: { scale: 'c', field: 'm' },
            fillOpacity: { signal: 'datum.m % 2 === 0 ? 1 : 0.55' },
          },
        },
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { value: 0 },
            y: { signal: 'height + 16' },
            fill: { value: '#ddd' },
            fontSize: { value: 11 },
            text: {
              signal:
                "year + ': Jan 1 is ' + dayFormat(utcday(utc(year, 0, 1))) + ', in ' + weeks + ' ' + (weeks === 'week' ? utcweek(utc(year, 0, 1)) : utcisoweek(utc(year, 0, 1))) + '; Dec 31 is day ' + utcdayofyear(utc(year, 11, 31)) + ' in ' + weeks + ' ' + (weeks === 'week' ? utcweek(utc(year, 11, 31)) : utcisoweek(utc(year, 11, 31)))",
            },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'year', [2024, 2021, 2026, 2022, 2025], 1500);
  if (stage.preview) {
    stage.every(3300, (i) => {
      view.signal('weeks', i % 2 ? 'week' : 'isoweek');
      return view.runAsync().then(() => undefined);
    });
  }
  return () => stage.dispose();
};

export default mount;
