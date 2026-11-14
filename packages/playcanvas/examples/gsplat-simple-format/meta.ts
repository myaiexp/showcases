// playcanvas example: Procedural splats, the simple format
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Procedural splats: the simple format',
  summary:
    'A GSplatContainer filled from JavaScript, step by step as the procedural-splats page lists it: createSimpleFormat, new GSplatContainer, lock the dataCenter (xyz plus a uniform size in w) and dataColor (half floats) textures, write the centers array and aabb, then update(). The full view rewrites the size column and calls update with centersUpdated false.',
  section: 'Gaussian Splatting',
  tags: ['GSplatContainer', 'GSplatFormat.createSimpleFormat', 'dataCenter', 'dataColor', 'FloatPacking.float2Half', 'GSplatContainer.update', 'gsplat component'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/building/procedural-splats/index.md',
    'repo/docs/user-manual/gaussian-splatting/rendering-architecture/splat-data-format.md',
    'repo/docs/user-manual/gaussian-splatting/what-is-gaussian-splatting.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
