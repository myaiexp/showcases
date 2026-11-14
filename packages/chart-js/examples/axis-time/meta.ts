// Chart.js example: Time axis: dates spaced by real time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Time axis: dates spaced by real time",
  summary:
    "The time axis places points by their real dates, so a burst of daily readings sits close together and a gap of weeks stretches out. Add readings to watch the spacing.",
  section: 'Axes',
  tags: ['type','time','time.tooltipFormat','scales.x'],
  docs: ['repo/docs/axes/cartesian/time.md','repo/docs/charts/line.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
