// penrose example: pointLineDist: a point at a distance from a segment
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "pointLineDist: a point at a distance from a segment",
  summary:
    'A line is fixed and the orange dot\'s position is free. `encourage pointLineDist(b.icon.center, a.icon, padding)` brings the dot to exactly `padding` from the nearest point of the segment; which side it ends up on depends on where it started.',
  section: "Objective Functions",
  tags: ['pointLineDist', 'encourage', 'objective', 'distance', 'Line'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
