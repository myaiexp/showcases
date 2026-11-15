// AntV Infographic example: Structure: SequenceSnakeSteps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Structure: SequenceSnakeSteps",
  summary:
    "The SequenceSnakeSteps structure (id sequence-snake-steps) draws rows of steps joined by arrows, every other row reversed, chosen with a design block in the infographic syntax. The 4 steps change itemsPerRow, gap and rowGap under the structure line, so you see what each prop does. The full view prints the syntax being rendered.",
  section: "Built-in structures",
  tags: ['sequence-snake-steps', 'design', 'itemsPerRow', 'gap', 'rowGap'],
  docs: [
    'repo/site/src/content/reference/built-in-structures.en.md',
    'repo/site/src/content/learn/design.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
