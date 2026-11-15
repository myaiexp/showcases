// tanstack-charts example: Focus callbacks fire when the key changes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Focus callbacks fire when the key changes',
  summary:
    'onFocusChange runs only when the primary focus key changes, so moving within the same point is silent. The exception is a scene rebuild with the same focused key: the callback runs again with the new coordinates and datum. The pretend pointer stays on one bar while the values change every second and a half.',
  section: 'Focus and Interaction',
  tags: ['onFocusChange', 'focus key', 'host.update', 'rebuild'],
  docs: ['repo/docs/reference/focus-and-interaction.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
