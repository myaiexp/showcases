// tanstack-charts example: The tooltip is a polite status region
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The tooltip is a polite status region',
  summary:
    'The built-in tooltip exposes its rows through an element with role status and aria-live polite. The readout polls that element, so you can see the exact text a screen reader would announce as focus moves. It supplements the chart and never replaces labels or a table.',
  section: 'Accessibility',
  tags: ['tooltip', 'role status', 'aria-live'],
  docs: ['repo/docs/guides/accessibility.md', 'repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
