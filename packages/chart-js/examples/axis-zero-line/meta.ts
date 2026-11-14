// Chart.js example: Highlighting the zero line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Highlighting the zero line",
  summary:
    "grid.color and grid.lineWidth accept functions of the tick, so one grid line, here the freezing point, can be drawn thick and bright. Drag the slider to move it.",
  section: 'Axes',
  tags: ['grid.color','grid.lineWidth','scriptable','ticks.stepSize'],
  docs: ['repo/docs/axes/styling.md','repo/docs/axes/cartesian/linear.md','repo/docs/charts/bar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
