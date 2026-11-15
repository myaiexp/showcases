// penrose example: The disjoint constraint
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The disjoint constraint',
  summary:
    'The first exercise solution: circles are disjoint when d >= r1 + r2, so the energy is `r1 + r2 - d`. An objective pulls two circles together and the constraint stops them where they touch; passes that start overlapping are pushed apart to the same distance.',
  section: 'Writing Constraints & Objectives',
  tags: ['disjoint', 'sub', 'add', 'ops.vdist', 'constraints', 'problem'],
  docs: [
    'repo/packages/docs-site/docs/ref/constraints.md',
    'repo/packages/docs-site/docs/ref/optimization-api.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
