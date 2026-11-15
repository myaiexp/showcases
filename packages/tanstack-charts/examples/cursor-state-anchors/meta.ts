// tanstack-charts example: Cursor state: value, normalised or scene
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cursor state: value, normalised or scene',
  summary:
    'A cursor state names the coordinate space that is authoritative with its anchor. A value anchor holds semantic x and y, a normalised anchor holds fractions of the plot that survive a resize, and a scene anchor holds pixels. Set each from a button and read back the state.',
  section: 'Focus and Interaction',
  tags: ['createChartCursor', 'anchor', 'normalized', 'scene', 'value', 'setState'],
  docs: ['repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
