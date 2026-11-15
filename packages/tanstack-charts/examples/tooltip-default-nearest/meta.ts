// tanstack-charts example: Default nearest-point tooltip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Default nearest-point tooltip',
  summary:
    'Adding the tooltip extension to a definition is all it takes: the host finds the nearest point, draws a focus ring and shows the original row as labelled values. Empty space farther than maxFocusDistance clears it.',
  section: 'Tooltips and Focus',
  tags: ['tooltip', 'defineChart', 'maxFocusDistance'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
