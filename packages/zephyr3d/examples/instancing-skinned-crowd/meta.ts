// zephyr3d example: Skinned mesh instancing: a crowd sharing one primitive and material
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Skinned mesh instancing: a crowd sharing one primitive and material',
  summary:
    'Thirty-six figures are loaded from one GLB, so they share a Primitive and a material while each owns its AnimationSet, playing different clips at different phases. WebGL2 draws skinned instances from the regular instance list; the indirect GPU palette batching is WebGPU-only.',
  section: 'Geometry Instancing',
  tags: ['skinned instancing', 'fetchModel', 'animationSet', 'playAnimation', 'shared Primitive', 'BatchGroup'],
  docs: ['repo/apps/doc/web/en/instancing-skinned.md', 'repo/apps/doc/web/en/asset-loading.md', 'repo/apps/doc/web/en/animation-intro.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
