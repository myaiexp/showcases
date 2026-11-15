// AntV Infographic example: Structure: SequenceMountain
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Structure: SequenceMountain",
  summary:
    "The SequenceMountain structure (id sequence-mountain) draws a mountain range whose peaks grow with the sequence, chosen with a design block in the infographic syntax. The 4 steps change gap, minHeight, maxHeight, minWidth and maxWidth under the structure line, so you see what each prop does. The full view prints the syntax being rendered.",
  section: "Built-in structures",
  tags: ['sequence-mountain', 'design', 'gap', 'minHeight', 'maxHeight', 'minWidth', 'maxWidth'],
  docs: [
    'repo/site/src/content/reference/built-in-structures.en.md',
    'repo/site/src/content/learn/design.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
