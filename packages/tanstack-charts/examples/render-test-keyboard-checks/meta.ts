// tanstack-charts example: Accessibility assertions on a mounted chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Accessibility assertions on a mounted chart",
  summary:
    "A mounted chart is checked the way the guide lists: the root has a role and an accessible name, it is in the tab order, focusing it lands on the first point, and the arrow, End and Enter keys reach the expected points. The checks drive the real keyboard handler by dispatching events and read the host callbacks.",
  section: "Testing and Debugging",
  tags: ['aria-label', 'tabindex', 'onFocusChange', 'onSelect', 'keydown', 'focusin'],
  docs: [
    'repo/docs/guides/testing-and-debugging.md',
    'repo/docs/reference/marks/line-and-area.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
