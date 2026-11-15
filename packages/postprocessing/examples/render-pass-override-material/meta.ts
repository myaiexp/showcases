// postprocessing example: RenderPass overrideMaterial
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'RenderPass: override material',
  summary:
    'Assigning renderPass.overrideMaterial draws every mesh with one material (normals, wireframe, flat white) while the scene itself is untouched; assigning null restores the scene materials. The pass keeps an OverrideMaterialManager that applies it.',
  section: 'Passes',
  tags: ['RenderPass', 'overrideMaterial', 'OverrideMaterialManager', 'MeshNormalMaterial', 'EffectComposer'],
  docs: ['repo/README.md', 'repo/src/passes/RenderPass.js', 'repo/src/core/OverrideMaterialManager.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
