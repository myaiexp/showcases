// playcanvas example: ShaderMaterial in GLSL
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ShaderMaterial in GLSL',
  summary:
    'A shader description (uniqueName, vertexGLSL, fragmentGLSL and an attributes map from names to SEMANTIC_ streams) becomes a ShaderMaterial, and one material draws a sphere, a torus and a box. The full view scales the time that setParameter feeds to the shader.',
  section: 'Graphics: Shaders',
  tags: ['ShaderMaterial', 'ShaderDesc', 'uniqueName', 'vertexGLSL', 'fragmentGLSL', 'attributes', 'SEMANTIC_POSITION', 'SEMANTIC_TEXCOORD0'],
  docs: ['repo/docs/user-manual/graphics/shaders/index.md', 'repo/docs/user-manual/graphics/shaders/glsl-specifics.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
