// Spark example: procedural splats created one by one with pushSplat in constructSplats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Building splats with pushSplat',
  summary:
    'A spiral galaxy made of flat disc splats, each one computed in a loop and appended with pushSplat inside the SplatMesh constructSplats callback. The same Vector3, Quaternion and Color objects are reused for every splat, as the docs suggest. Change the count or the number of arms to rebuild it.',
  section: 'Procedural Splats',
  tags: ['constructSplats', 'pushSplat', 'PackedSplats', 'SplatMesh'],
  docs: ['repo/docs/docs/procedural-splats.md', 'repo/docs/docs/packed-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
