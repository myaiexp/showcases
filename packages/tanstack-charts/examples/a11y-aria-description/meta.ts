// tanstack-charts example: Describing the chart with ariaDescription
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Describing the chart with ariaDescription',
  summary:
    'ariaDescription adds context the reader cannot see nearby. The SVG renderer writes it into a desc element on the chart. This example toggles it and reads the surface back, so the extra text is visible next to the role and name.',
  section: 'Accessibility',
  tags: ['ariaDescription', 'desc', 'ariaLabel'],
  docs: ['repo/docs/guides/accessibility.md', 'repo/docs/reference/dom-host.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
