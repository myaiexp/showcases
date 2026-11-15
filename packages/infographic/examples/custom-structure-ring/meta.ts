// AntV Infographic example: Custom structure: items on a circle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom structure: items on a circle',
  summary:
    'A hand-written Ring structure places every item on a circle with sine and cosine, draws a dashed track behind them and flips the item text on the left half with positionH. It is registered as showcase-ring and picked with design.structure; the radius prop changes between steps.',
  section: 'Custom structures',
  tags: ['registerStructure', 'design.structure', 'BaseStructureProps', 'positionH', 'getElementBounds'],
  docs: [
    'repo/site/src/content/learn/custom-structure.en.md',
    'repo/skills/infographic-structure-creator/references/structure-prompt.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
