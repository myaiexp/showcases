// tanstack-charts example: onSelect from clicks and keys
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'onSelect from clicks and keys',
  summary:
    'onSelect reports a mouse click or Enter and Space on the focused point, and null for a click on blank space. The readout keeps a short log. In the card a pretend pointer clicks two points and an empty spot in turn.',
  section: 'Tooltips and Focus',
  tags: ['onSelect', 'ChartPoint', 'maxFocusDistance'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
