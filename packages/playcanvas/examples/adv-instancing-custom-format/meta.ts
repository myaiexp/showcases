// playcanvas example: Instancing with a custom vertex format
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Instancing with a custom vertex format',
  summary:
    'Each of 3000 cubes carries only a position and a scale: a VertexFormat on SEMANTIC_ATTR12 and ATTR13, 16 bytes instead of a 64-byte Mat4. The StandardMaterial maps two attribute names with setAttribute() and overrides the transformInstancingVS chunk (GLSL and WGSL) to build the model matrix.',
  section: 'Graphics: Advanced Rendering',
  tags: ['VertexFormat', 'SEMANTIC_ATTR12', 'SEMANTIC_ATTR13', 'setAttribute', 'getShaderChunks', 'transformInstancingVS', 'getModelMatrix'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/hardware-instancing.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
