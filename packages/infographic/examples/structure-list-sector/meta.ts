// AntV Infographic example: Structure: ListSector
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Structure: ListSector",
  summary:
    "The ListSector structure (id list-sector) draws a ring cut into sectors, one item each, with the title in the middle, chosen with a design block in the infographic syntax. The 4 steps change outerRadius, innerRadius, gapAngle, startAngle and endAngle under the structure line, so you see what each prop does. The full view prints the syntax being rendered.",
  section: "Built-in structures",
  tags: ['list-sector', 'design', 'outerRadius', 'innerRadius', 'gapAngle', 'startAngle', 'endAngle'],
  docs: [
    'repo/site/src/content/reference/built-in-structures.en.md',
    'repo/site/src/content/learn/design.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
