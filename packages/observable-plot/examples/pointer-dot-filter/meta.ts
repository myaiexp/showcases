// observable-plot example: Pointer: filtering dots to the nearest
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pointer: filtering dots to the nearest',
  summary:
    'The pointer transform renders only the red dot closest to the pointer. Turn it off to see every red dot.',
  section: 'Interaction: Pointer',
  tags: ['dot', 'pointer'],
  docs: ['repo/docs/interactions/pointer.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
