// tanstack-charts example: Switching chart focus off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Switching chart focus off',
  summary:
    'focus false removes chart-owned pointer and keyboard focus: no ring, no tooltip, and the surface leaves the tab order. The focusDisabled strategy does the same through the focus option, for an application that owns gestures and still wants the rendered focus layer. Compare the three modes.',
  section: 'Focus and Interaction',
  tags: ['focus', 'focusDisabled', 'keyboard', 'tooltip'],
  docs: [
    'repo/docs/reference/focus-and-interaction.md',
    'repo/docs/guides/interactions-and-selections.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
