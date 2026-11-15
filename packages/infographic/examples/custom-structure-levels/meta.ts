// AntV Infographic example: Custom structure: one item design per level
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom structure: one item design per level',
  summary:
    'The Fork structure reads Items, the array of per-level item components, instead of Item: the root is drawn with the first design and its children with the second, joined by elbow connectors drawn with Path. Registered as showcase-fork; the steps add children and widen levelGap.',
  section: 'Custom structures',
  tags: ['registerStructure', 'Items', 'design.items', 'hierarchy', 'Path', 'children'],
  docs: [
    'repo/site/src/content/learn/custom-structure.en.md',
    'repo/skills/infographic-structure-creator/references/structure-prompt.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/design.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
