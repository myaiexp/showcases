// tanstack-charts example: Setting the cursor position from inputs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Setting the cursor position from inputs',
  summary:
    'A non-null controlled position pins the cursor, so the application can place it from anything. Two sliders write the x and y values and the chart repaints the rules and marker there. This is also how a semantic control gives keyboard users a way to set an arbitrary position.',
  section: 'Interactions and Selections',
  tags: ['continuousCursor', 'position', 'controlledSignal', 'slider'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
