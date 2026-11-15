// penrose example: Deleting a field for a subtype
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Delete a field for a subtype',
  summary:
    'A generic block draws a circle for every Item. A second block, for the subtype Hidden, runs `delete x.widget`, so the hidden item shows only its label. The second tab leaves out the delete line and the circle returns.',
  section: 'Style: Selector Blocks',
  tags: ['delete', 'subtype', 'forall', 'Circle'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/selector-blocks.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
