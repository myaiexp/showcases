// AntV Infographic example: Structure: Quadrant
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Structure: Quadrant",
  summary:
    "The Quadrant structure (id quadrant) draws four quadrants around two axes, chosen with a design block in the infographic syntax. The 4 steps change showAxis, dashedAxis, quadrantWidth and quadrantHeight under the structure line, so you see what each prop does. The full view prints the syntax being rendered.",
  section: "Built-in structures",
  tags: ['quadrant', 'design', 'showAxis', 'dashedAxis', 'quadrantWidth', 'quadrantHeight'],
  docs: [
    'repo/site/src/content/reference/built-in-structures.en.md',
    'repo/site/src/content/learn/design.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
