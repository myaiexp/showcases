// babylon-js example: Billboard modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Billboard modes',
  summary:
    'Four labelled planes with billboardMode NONE, X, Y and ALL, under a parent that rolls around its Z axis. Orbit to see which axes each plane turns on to face the camera; TransformNode.BillboardUseParentOrientation decides whether the parent’s rotation is taken into account.',
  section: 'Mesh',
  tags: ['billboardMode', 'BILLBOARDMODE_ALL', 'BillboardUseParentOrientation'],
  docs: ['repo/content/features/featuresDeepDive/mesh/billboard.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
