// penrose example: ptOnLine: stepping along a line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ptOnLine: stepping along a line',
  summary:
    '`ptOnLine(p1, p2, r)` walks a distance `r` from `p1` towards `p2`. A sampled step size places dots at one, two, three and four steps; the grey line stops at `p2`, but the walk does not, so a large step runs off past it.',
  section: 'Computation: Paths & Curves',
  tags: ['ptOnLine'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
