// Spark example: the SplatMesh onFrame callback driving a CPU-animated splat sheet
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SplatMesh onFrame and updateVersion',
  summary:
    'The onFrame callback ({ mesh, time, deltaTime }) runs once per frame; here it rewrites the splats of a rippling sheet with packedSplats.setSplat and sets needsUpdate. The splats only move on screen because onFrame also calls mesh.updateVersion(), which the checkbox turns off to freeze them.',
  section: 'SplatMesh',
  tags: ['onFrame', 'updateVersion', 'setSplat', 'needsUpdate'],
  docs: ['repo/docs/docs/splat-mesh.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
