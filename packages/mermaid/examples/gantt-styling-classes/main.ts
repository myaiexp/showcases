// Gantt styling: the documented CSS classes restyled with themeCSS in frontmatter, and one task styled by its id
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Dates are built from today, so the today marker (restyled in the third tab) is in range.
const iso = (offsetDays: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
};

const CHART = `gantt
    title Styled chart
    dateFormat YYYY-MM-DD
    axisFormat %d %b
    section Backend
    API design          :done, t1, ${iso(-12)}, 6d
    Implementation      :active, t2, after t1, 10d
    Hardening           :t3, after t2, 5d
    section Frontend
    A long task name here :t4, ${iso(-10)}, 4d
    Wiring              :t5, after t4, 9d`;

// Wraps the chart in frontmatter: themeCSS holds a stylesheet (a YAML block scalar).
const styled = (css: string): string =>
  `---\nconfig:\n  themeCSS: |\n${css
    .split('\n')
    .map((l) => `    ${l}`)
    .join('\n')}\n---\n${CHART}`;

// Classes used, grid: .grid .tick are the grid lines and .grid path the grid's border.
const GRID = styled(`.grid .tick {
  stroke: #f59e0b;
  opacity: 0.5;
  stroke-dasharray: 3 3;
  shape-rendering: crispEdges;
}
.grid path {
  stroke-width: 2;
  stroke: #f59e0b;
}`);

// Classes used, text: .taskText inside bars; .taskTextOutsideRight / .taskTextOutsideLeft when the
// name does not fit its bar and spills out.
const TEXT = styled(`.taskText {
  fill: #fff;
  font-weight: bold;
  font-size: 13px;
}
.taskTextOutsideRight {
  fill: #fde68a;
  font-style: italic;
}
.taskTextOutsideLeft {
  fill: #a5f3fc;
}`);

// todayMarker is a class as well; a CSS rule styles the marker line from the stylesheet.
const MARKER = styled(`.today {
  stroke: #22d3ee;
  stroke-width: 4px;
  opacity: 0.6;
}`);

// A task's bar carries its id behind the diagram's own prefix (mm-3-t2), so a rule that ends
// the id match, [id$=t2], picks out one task.
const BY_ID = styled(`[id$=t2] {
  fill: CadetBlue;
  stroke: #99f6e4;
  stroke-width: 3px;
}
.taskText {
  font-weight: bold;
}`);

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Grid lines', code: GRID },
      { label: 'Task text', code: TEXT },
      { label: 'Today marker class', code: MARKER },
      { label: 'One task by id', code: BY_ID },
    ],
  });

export default mount;
