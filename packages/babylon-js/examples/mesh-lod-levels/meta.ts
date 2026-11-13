// babylon-js example: Levels of detail by distance or coverage
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Levels of detail by distance or coverage',
  summary:
    'A 128-segment torus knot with three coarser knots added as addLODLevel levels at 15, 30 and 45 units and a null level at 55 that stops rendering. Switching useLODScreenCoverage on re-adds the levels as screen-coverage cutoffs. The camera dollies in and out; each level is a different colour and getLOD reports which one renders.',
  section: 'Mesh',
  tags: ['addLODLevel', 'removeLODLevel', 'useLODScreenCoverage', 'getLOD'],
  docs: ['repo/content/features/featuresDeepDive/mesh/LOD.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
