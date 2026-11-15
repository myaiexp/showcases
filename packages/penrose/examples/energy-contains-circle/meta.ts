// penrose example: Deriving contains for two circles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Deriving contains for two circles',
  summary:
    'A circle A is inside B when d <= r_B - r_A, so the constraint energy is d - (r_B - r_A), written `sub(ops.vdist(a.center, b.center), sub(b.r, a.r))`. Circle B is fixed, an objective drags A toward a target outside, and the drawn distance d shows the energy dropping to 0 when A touches the inside of B.',
  section: 'Writing Constraints & Objectives',
  tags: ['sub', 'ops.vdist', 'contains', 'constraints', 'problem', 'Circle'],
  docs: [
    'repo/packages/docs-site/docs/ref/constraints.md',
    'repo/packages/docs-site/docs/ref/optimization-api.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
