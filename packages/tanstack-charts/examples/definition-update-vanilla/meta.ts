// tanstack-charts example: Vanilla updates with a new definition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vanilla updates with a new definition',
  summary:
    'Products ranked by a chosen metric. Each choice builds a new definition from derived rows that keep their source row, and host.update animates the bars to the new order.',
  section: 'Chart Definitions',
  tags: ['host.update', 'svgAnimation', 'barX', 'derived rows'],
  docs: ['repo/docs/concepts/chart-definitions.md', 'repo/docs/reference/chart-definitions.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
