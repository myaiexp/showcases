// tanstack-charts example: Commit, clear and the controlled position
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Commit, clear and the controlled position',
  summary:
    'A click commits the cursor: the application accepts the proposed position by storing it, and the cursor stays pinned. Another click, or Escape, proposes a clear. Previews never need storing, so the chart is not rebuilt as the pointer moves.',
  section: 'Interactions and Selections',
  tags: ['continuousCursor', 'commit', 'clear', 'preview', 'ContinuousCursorChange'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
