// AntV Infographic example: Structure: SequencePyramid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Structure: SequencePyramid",
  summary:
    "The SequencePyramid structure (id sequence-pyramid) draws pyramid layers on the left with text on the right, chosen with a design block in the infographic syntax. The 4 steps change gap, width, itemHeight and pyramidWidth under the structure line, so you see what each prop does. The full view prints the syntax being rendered.",
  section: "Built-in structures",
  tags: ['sequence-pyramid', 'design', 'gap', 'width', 'itemHeight', 'pyramidWidth'],
  docs: [
    'repo/site/src/content/reference/built-in-structures.en.md',
    'repo/site/src/content/learn/design.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
