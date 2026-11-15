// tanstack-charts example: A blank click becomes a fixed window
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A blank click becomes a fixed window',
  summary:
    'The brush range is never null: a click on blank space proposes a snapped zero-width range. Application policy can turn that into something useful, here a three-week window starting at the click. The card shows the accepted windows one after another.',
  section: 'Interactions and Selections',
  tags: ['brushX', 'zero-width', 'policy', 'commit', 'values'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
