// tanstack-charts example: A table with the exact values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A table with the exact values',
  summary:
    'Hover-only values are not enough, so the chart sits above a plain HTML table built from the same rows. The table has a caption and column headers, and selecting text in it works because it is ordinary HTML rather than SVG text.',
  section: 'Accessibility',
  tags: ['ariaLabel', 'table', 'exact values'],
  docs: ['repo/docs/guides/accessibility.md', 'repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
