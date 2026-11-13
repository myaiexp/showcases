// Spark example: tiny-lod against bhatt-lod (quality) LoD tree builders
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Quick and quality LoD trees',
  summary:
    'Spark has two ways to merge splats into an LoD tree: the quick tiny-lod voxel-octree builder meant for on-demand use, and the slower bhatt-lod builder meant for pre-processing. createLodSplats() runs the first and createLodSplats({ quality: true }) the second (lod: true and lod: "quality" pick the same for a file). Both knots share one small budget so their coarse levels are on show, and the readout times each build.',
  section: 'LoD Deep Dive',
  tags: ['createLodSplats', 'quality', 'tiny-lod', 'bhatt-lod', 'lodSplats'],
  docs: ['repo/docs/docs/new-spark-renderer.md', 'repo/docs/docs/new-features-2.0.md', 'repo/docs/docs/lod-getting-started.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
