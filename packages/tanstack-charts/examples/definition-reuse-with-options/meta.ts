// tanstack-charts example: Reuse a definition with new options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reuse a definition with new options',
  summary:
    'defineChart(definition, options) makes a second definition from a base. The left chart is the base with no tooltip; the right one adds a tooltip and nearest-x focus.',
  section: 'Chart Definitions',
  tags: ['defineChart', 'tooltip', 'focus'],
  docs: ['repo/docs/reference/chart-definitions.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
