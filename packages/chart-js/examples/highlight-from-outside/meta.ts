// Chart.js example: Highlighting points from outside the chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Highlighting points from outside the chart',
  summary:
    'Hover a month in an HTML list and the matching bar lights up with its tooltip, driven by chart.setActiveElements() and tooltip.setActiveElements().',
  section: 'Developers',
  tags: ['setActiveElements', 'tooltip', 'hover', 'bar'],
  docs: ['repo/docs/developers/api.md', 'repo/docs/configuration/tooltip.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
