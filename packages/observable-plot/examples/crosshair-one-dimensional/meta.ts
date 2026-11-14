// observable-plot example: Crosshair: one-dimensional
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Crosshair: one-dimensional',
  summary:
    'With only x given, the crosshair is a single vertical rule and one label, over a tick for each penguin.',
  section: 'Interaction: Crosshair',
  tags: ['crosshairX', 'tickX'],
  docs: ['repo/docs/interactions/crosshair.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
