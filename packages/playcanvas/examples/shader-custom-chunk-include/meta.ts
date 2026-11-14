// playcanvas example: Custom shader chunk with #include
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom shader chunk with #include',
  summary:
    'ShaderChunks.get(device, SHADERLANGUAGE_GLSL).set registers a chunk of helper functions under a name, and any ShaderMaterial source can then #include it. A sphere and a torus use different fragment shaders that share the same stripe and palette functions; the full view changes a stripe count passed to the chunk function.',
  section: 'Graphics: Shaders',
  tags: ['ShaderChunks', 'ShaderChunks.get', 'SHADERLANGUAGE_GLSL', '#include', 'ShaderMaterial'],
  docs: ['repo/docs/user-manual/graphics/shaders/preprocessor.md', 'repo/docs/user-manual/graphics/shaders/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
