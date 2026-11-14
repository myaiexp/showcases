// playcanvas example: Instancing with a ShaderMaterial and colour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Instancing with a ShaderMaterial and per-instance colour',
  summary:
    'A fully custom ShaderMaterial reads a position-and-scale attribute and an RGB colour from one interleaved instancing buffer, behind the INSTANCING preprocessor define. 2500 spheres form a spiral of stars coloured per instance, in one draw call.',
  section: 'Graphics: Advanced Rendering',
  tags: ['ShaderMaterial', 'INSTANCING', 'VertexFormat', 'SEMANTIC_ATTR12', 'SEMANTIC_ATTR13', 'setInstancing'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/hardware-instancing.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
