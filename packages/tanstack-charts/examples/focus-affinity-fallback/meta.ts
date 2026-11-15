// tanstack-charts example: Off-shape fallback: bars and dots
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Off-shape fallback: bars and dots',
  summary:
    'When no shape contains the pointer, each mark has a natural fallback. Bars rank by distance along x, so a pointer high above a short bar still finds its column. Dots rank by full distance, so the same position finds nothing beyond maxFocusDistance. Both charts hold the same values.',
  section: 'Focus and Interaction',
  tags: ['interaction affinity', 'barY', 'dot', 'maxFocusDistance', 'focus'],
  docs: ['repo/docs/reference/focus-and-interaction.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
