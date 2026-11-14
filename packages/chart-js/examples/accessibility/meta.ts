// Chart.js example: An accessible chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'An accessible chart',
  summary:
    'A canvas is a picture to a screen reader unless you say otherwise. Give it role=img and an aria-label, or put a table inside the canvas tags as fallback content, and the chart gets a name and a text alternative.',
  section: 'General',
  tags: ['accessibility', 'aria-label', 'role', 'fallback content'],
  docs: ['repo/docs/general/accessibility.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
