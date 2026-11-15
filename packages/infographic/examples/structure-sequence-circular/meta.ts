// AntV Infographic example: Structure: SequenceCircular
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Structure: SequenceCircular",
  summary:
    "The SequenceCircular structure (id sequence-circular) draws concentric arc slices with items and icons on the outside, chosen with a design block in the infographic syntax. The 4 steps change outerRadius, innerRadius, gapAngle, iconRadius, iconBgRadius and iconSize under the structure line, so you see what each prop does. The full view prints the syntax being rendered.",
  section: "Built-in structures",
  tags: ['sequence-circular', 'design', 'outerRadius', 'innerRadius', 'gapAngle', 'iconRadius', 'iconBgRadius', 'iconSize'],
  docs: [
    'repo/site/src/content/reference/built-in-structures.en.md',
    'repo/site/src/content/learn/design.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
