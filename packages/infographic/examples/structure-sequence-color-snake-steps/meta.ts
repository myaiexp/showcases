// AntV Infographic example: Structure: SequenceColorSnakeSteps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Structure: SequenceColorSnakeSteps",
  summary:
    "The SequenceColorSnakeSteps structure (id sequence-color-snake-steps) draws a coloured snake path that folds back at the end of each row, chosen with a design block in the infographic syntax. The 5 steps change itemsPerRow, circleStrokeWidth, gap, rowGap and columnGap under the structure line, so you see what each prop does. The full view prints the syntax being rendered.",
  section: "Built-in structures",
  tags: ['sequence-color-snake-steps', 'design', 'itemsPerRow', 'circleStrokeWidth', 'gap', 'rowGap', 'columnGap'],
  docs: [
    'repo/site/src/content/reference/built-in-structures.en.md',
    'repo/site/src/content/learn/design.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
