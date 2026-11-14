// Spark example: SplatMesh onLoad, forEachSplat and PackedSplats.setSplat
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reading and rewriting splats on the CPU',
  summary:
    'onLoad fires once a SplatMesh has its splats, and forEachSplat visits each one to report simple statistics. The recolour buttons visit every splat again and write a new colour back with packedSplats.setSplat, because the callback’s vectors are only decoded copies, then set needsUpdate and updateVersion() so the edit shows.',
  section: 'SplatMesh',
  tags: ['onLoad', 'forEachSplat', 'setSplat', 'needsUpdate', 'isInitialized'],
  docs: ['repo/docs/docs/splat-mesh.md', 'repo/docs/docs/packed-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
