// tanstack-charts example: Breakpoint swaps the representation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Breakpoint swaps the representation',
  summary:
    'The definition builder receives the surface width. Below 480 pixels it draws horizontal bars with a short axis, above it draws vertical columns. Data transforms stay outside the builder, so only the spec is rebuilt on resize.',
  section: 'Responsive Charts',
  tags: ['defineChart', 'chart builder', 'barX', 'barY', 'ChartBuildContext'],
  docs: ['repo/docs/guides/responsive-charts.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
