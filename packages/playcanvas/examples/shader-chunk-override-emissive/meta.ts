// playcanvas example: StandardMaterial emissive chunk
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'StandardMaterial chunk override: emissivePS',
  summary:
    'material.getShaderChunks(SHADERLANGUAGE_GLSL) and the WGSL map take replacement code for the engine chunk emissivePS, here writing travelling glow bands into dEmission from the world position and a time uniform fed with setParameter. The lit surface, shadows and tone mapping stay the StandardMaterial\'s; the full view removes the override again.',
  section: 'Graphics: Shaders',
  tags: ['Material.getShaderChunks', 'emissivePS', 'SHADERLANGUAGE_GLSL', 'SHADERLANGUAGE_WGSL', 'StandardMaterial', 'dEmission'],
  docs: ['repo/docs/user-manual/graphics/shaders/migrations.md', 'repo/docs/user-manual/graphics/shaders/shader-parameters.md', 'repo/docs/user-manual/graphics/shaders/preprocessor.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
