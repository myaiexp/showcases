// penrose example: A constraint keeps the point inside a disk
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A constraint keeps the point inside a disk',
  summary:
    'The objective pulls a point toward a target outside the disk; the constraint `vdist(p, centre) - radius` is driven to 0 or below, so the point stops on the rim at the spot nearest the target. Every other pass drops the constraint and the point reaches the target.',
  section: 'Optimization API',
  tags: ['constraints', 'objective', 'problem', 'ops.vdist', 'ops.vdistsq', 'run'],
  docs: [
    'repo/packages/docs-site/docs/ref/optimization-api.md',
    'repo/packages/docs-site/docs/ref/constraints.md',
    'repo/packages/core/src/api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
