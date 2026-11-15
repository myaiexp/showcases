// AntV Infographic example: Structure: SequenceTimeline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Structure: SequenceTimeline",
  summary:
    "The SequenceTimeline structure (id sequence-timeline) draws a vertical timeline with a gradient line and STEP labels, chosen with a design block in the infographic syntax. The 4 steps change gap and lineOffset under the structure line, so you see what each prop does. The full view prints the syntax being rendered.",
  section: "Built-in structures",
  tags: ['sequence-timeline', 'design', 'gap', 'lineOffset'],
  docs: [
    'repo/site/src/content/reference/built-in-structures.en.md',
    'repo/site/src/content/learn/design.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
