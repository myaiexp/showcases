// Gantt charts that skip weekends, reformat the time axis and pack tasks into compact rows
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// excludes weekends: a task's length counts working days only, so bars stretch over the gap.
const WEEKENDS = `gantt
    title Sprint with weekends excluded
    dateFormat YYYY-MM-DD
    excludes weekends
    axisFormat %a %d
    tickInterval 1day
    section Sprint
    Planning        :plan, 2025-03-03, 1d
    Build feature   :build, after plan, 5d
    Review          :after build, 2d`;

// weekend friday moves the weekend to Friday and Saturday.
const FRIDAY = `gantt
    title Fri-Sat weekends
    dateFormat YYYY-MM-DD
    excludes weekends
    weekend friday
    axisFormat %b %d
    tickInterval 1week
    weekday monday
    section Work
    Build A         :a1, 2025-03-02, 6d
    Build B         :after a1, 4d`;

// displayMode: compact (frontmatter) puts non-overlapping tasks on the same row.
const COMPACT = `---
displayMode: compact
---
gantt
    title Compact display
    dateFormat YYYY-MM-DD
    axisFormat %d %b
    todayMarker off
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :a2, 2014-01-20, 25d
    Another one      :a3, 2014-02-10, 20d`;

// dateFormat X with axisFormat %s turns a Gantt chart into a bar chart.
const BARS = `gantt
    title Git Issues - days since last update
    dateFormat X
    axisFormat %s
    section Issue19062
    71   : 0, 71
    section Issue19401
    36   : 0, 36
    section Issue193
    34   : 0, 34
    section Issue7441
    9    : 0, 9`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Compact rows', code: COMPACT },
      { label: 'Excluded weekends', code: WEEKENDS },
      { label: 'Friday-Saturday weekend', code: FRIDAY },
      { label: 'Bar chart via X format', code: BARS },
    ],
  });

export default mount;
