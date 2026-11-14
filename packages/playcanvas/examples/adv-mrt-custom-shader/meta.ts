// playcanvas example: Multiple render targets, custom shader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Multiple render targets, custom shader',
  summary:
    'A ShaderMaterial writes pcFragColor0, pcFragColor1 and pcFragColor2 inside a pass-define guard (SCENEBUFFERS_PASS, the upper-cased name given to setShaderPass), filling albedo, world normal and distance textures in one render pass, while the main camera sees the same material as an ordinary shader.',
  section: 'Graphics: Advanced Rendering',
  tags: ['ShaderMaterial', 'RenderTarget', 'colorBuffers', 'setShaderPass', 'setClearColor', 'pcFragColor0', 'pcFragColor2', 'TextureRenderer'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/multiple-render-targets.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
