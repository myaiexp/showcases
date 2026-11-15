// AntV Infographic example: Custom structure: an indented outline over nested children
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom structure: an indented outline over nested children',
  summary:
    'Outline walks datum.children recursively and places every node one row lower and one indent to the right of its parent, choosing the item component for its level from the Items array and falling back to the last one. Registered as showcase-outline; the steps add chapters and a third level.',
  section: 'Custom structures',
  tags: ['registerStructure', 'Items', 'children', 'indexes', 'hierarchy', 'recursion'],
  docs: [
    'repo/site/src/content/learn/custom-structure.en.md',
    'repo/skills/infographic-structure-creator/references/structure-prompt.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
