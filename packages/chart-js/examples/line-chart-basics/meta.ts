// Chart.js example: Line chart: a trend over time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line chart: a trend over time',
  summary:
    'Daily temperature as a line, with a new day scrolling in on the right. A line chart suits values that follow one another in order.',
  section: 'Chart types',
  tags: ['line', 'labels', 'data', 'update'],
  docs: ['repo/docs/charts/line.md', 'repo/docs/general/data-structures.md', 'repo/docs/developers/updates.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
