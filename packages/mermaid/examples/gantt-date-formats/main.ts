// Gantt dateFormat (how task dates are written) and axisFormat (how the axis prints them)
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// dateFormat DD/MM/YYYY: day first with slashes. axisFormat %d %b prints "15 Mar".
const DAY_FIRST = `gantt
    title Day-first input
    dateFormat DD/MM/YYYY
    axisFormat %d %b
    section Launch
    Design     :a1, 03/03/2025, 10d
    Build      :a2, after a1, 14d
    Release    :milestone, 24/03/2025, 0d`;

// dateFormat with a time part: YYYY-MM-DD HH:mm. axisFormat %a %H:%M prints weekday and clock time.
const WITH_TIME = `gantt
    title Dates with times
    dateFormat YYYY-MM-DD HH:mm
    axisFormat %a %H:%M
    tickInterval 6hour
    section Rollout
    Prepare    :b1, 2025-03-03 08:00, 10h
    Deploy     :b2, after b1, 8h
    Verify     :b3, after b2, 12h`;

// x reads a Unix timestamp in milliseconds, so the starts below are plain integers; the length is
// an ordinary duration and axisFormat turns the timestamps back into dates. (gantt.md lists X as
// the seconds token, but 12.3.0 reads an all-digit date as milliseconds for X as well, so x is the
// token that says what it does.)
const UNIX = `gantt
    title Unix timestamps
    dateFormat x
    axisFormat %d %b %H:%M
    section Jobs
    Import     :c1, 1741000000000, 3h
    Transform  :c2, after c1, 5h
    Export     :c3, after c2, 2h`;

// Month names in the input (MMM D YYYY) and the quarter token Q, which sets the month to the first of the quarter.
const MONTH_NAMES = `gantt
    title Month names
    dateFormat MMM D YYYY
    axisFormat %B
    section Season
    Spring campaign :d1, Mar 1 2025, 45d
    Summer sale     :d2, Jun 15 2025, 60d
    Autumn refresh  :d3, Sep 10 2025, 30d`;

const QUARTERS = `gantt
    title Quarters
    dateFormat YYYY-Q
    axisFormat %b %Y
    section Roadmap
    Discovery  :e1, 2025-1, 90d
    Beta       :e2, 2025-2, 90d
    Launch     :e3, 2025-3, 60d`;

// axisFormat strings from the docs' table: %j day of year, %W week number, %p AM/PM, %y two-digit year.
const AXIS = `gantt
    title Week numbers on a weekly axis
    dateFormat YYYY-MM-DD
    axisFormat W%W
    tickInterval 1week
    weekday monday
    section Sprint
    Plan       :f1, 2025-03-03, 7d
    Implement  :f2, after f1, 14d
    Review     :f3, after f2, 7d`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'DD/MM/YYYY', code: DAY_FIRST },
      { label: 'Dates with times', code: WITH_TIME },
      { label: 'Unix timestamps (x)', code: UNIX },
      { label: 'Month names', code: MONTH_NAMES },
      { label: 'Quarters (Q)', code: QUARTERS },
      { label: 'Week numbers on the axis', code: AXIS },
    ],
  });

export default mount;
