// penrose example: chevron and midpointOffset on a line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'chevron and midpointOffset on a line',
  summary:
    '`chevron(line, padding)` returns three points for a direction mark at the line\'s midpoint, which `pathFromPoints` draws as a "<" pointing back along the line. `midpointOffset(line, padding)` returns a spot beside the midpoint, here holding a label. The line is sampled, so both follow it.',
  section: 'Computation: Paths & Curves',
  tags: ['chevron', 'midpointOffset', 'pathFromPoints', 'Line'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
