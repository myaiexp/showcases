// observable-plot example: Interactions: crosshair
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interactions: crosshair',
  summary:
    'A crosshair mark follows the pointer to the nearest athlete and labels its weight and height on the axes.',
  section: 'Interactions',
  tags: ['crosshair', 'dot', 'pointer'],
  docs: ['repo/docs/features/interactions.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
