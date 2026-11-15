// galacean example: Point light range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point light range",
  summary:
    "A row of cubes lit by a PointLight at one end: distance is the range, and its pool of light grows and shrinks along the row as the value sweeps.",
  section: "Light",
  tags: ['PointLight', 'distance'],
  docs: [
    'repo/docs/en/graphics/light/point.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
