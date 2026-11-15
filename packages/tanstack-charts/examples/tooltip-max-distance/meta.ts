// tanstack-charts example: maxFocusDistance clears far focus
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'maxFocusDistance clears far focus',
  summary:
    'Focus only resolves when the pointer is within maxFocusDistance scene pixels of a point, 48 by default. The slider changes it: a small value leaves most of the plot without a tooltip, a large one always finds a point.',
  section: 'Tooltips and Focus',
  tags: ['maxFocusDistance', 'tooltip', 'host.update'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
