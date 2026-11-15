// penrose example: rectLineDist between a rectangle and a line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'rectLineDist between a rectangle and a line',
  summary:
    'A vertical line at a sampled gap from the right edge of a rectangle. `rectLineDist(bottomLeft, topRight, start, end)` measures the distance between them from the rectangle\'s two corners and the line\'s end points; the red bar is that long and runs from the rectangle\'s edge to the line.',
  section: 'Computation: Geometry Queries',
  tags: ['rectLineDist', 'bboxPts'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts', 'repo/packages/core/src/lib/Queries.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
