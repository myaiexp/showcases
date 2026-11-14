// Chart.js example: Two y axes for two units
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Two y axes for two units",
  summary:
    "Temperature and rainfall have different units, so each dataset gets its own y axis through yAxisID, one on each side. Pick a city to see both scales adapt.",
  section: 'Axes',
  tags: ['yAxisID','position','grid.drawOnChartArea','scales'],
  docs: ['repo/docs/axes/cartesian/index.md','repo/docs/charts/mixed.md','repo/docs/axes/styling.md','repo/docs/axes/labelling.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
