// AntV Infographic example: Custom structure: a grid with a columns prop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom structure: a grid with a columns prop',
  summary:
    'The smallest useful structure: Columns lays the items out left to right in rows of `columns`, with a gap prop, both set from the syntax under the structure line. Registered as showcase-columns; the steps change the column count and the number of items.',
  section: 'Custom structures',
  tags: ['registerStructure', 'design.structure', 'structure options', 'gap', 'columns'],
  docs: [
    'repo/site/src/content/learn/custom-structure.en.md',
    'repo/skills/infographic-structure-creator/references/structure-prompt.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
