// penrose example: perspective against ortho
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'perspective against ortho',
  summary:
    'The same cube from the same eye under three lenses. `perspective(30, …)` and `perspective(75, …)` differ in field of view, so the wide one exaggerates depth, while `ortho` is a parallel projection where the far face is as large as the near one.',
  section: 'Style: Vectors & Matrices',
  tags: ['perspective', 'ortho', 'lookAt', 'projectList', 'projection', '3D'],
  docs: ['repo/packages/docs-site/docs/ref/style/vectors-matrices.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
