// penrose example: wedge, ptOnLine and arcSweepFlag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'wedge, ptOnLine and arcSweepFlag',
  summary:
    'Two rays leave a vertex at sampled angles, sometimes with the second one counterclockwise of the first and sometimes clockwise. `ptOnLine` finds the points a fixed distance along each ray, `arcSweepFlag` reports which way to turn, and `wedge` fills the sector between them either way round.',
  section: 'Computation: Paths & Curves',
  tags: ['wedge', 'ptOnLine', 'arcSweepFlag', 'Path'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
