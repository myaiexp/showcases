// playcanvas example: Multiple render targets, StandardMaterial
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Multiple render targets, StandardMaterial',
  summary:
    'A camera with a custom shader pass renders three lit shapes into one RenderTarget with three colour buffers. The materials override the outputPS chunk (GLSL and WGSL) to write world normals and gloss to targets 1 and 2, and the full view toggles the per-attachment clear colours set with CameraComponent.setClearColor.',
  section: 'Graphics: Advanced Rendering',
  tags: ['RenderTarget', 'colorBuffers', 'setShaderPass', 'setClearColor', 'outputPS', 'getShaderChunks', 'pcFragColor1', 'maxColorAttachments', 'TextureRenderer'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/multiple-render-targets.md', 'repo/docs/user-manual/graphics/advanced-rendering/render-targets.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
