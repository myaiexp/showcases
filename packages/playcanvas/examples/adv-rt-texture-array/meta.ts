// playcanvas example: Render targets into texture array layers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render targets into texture array layers',
  summary:
    'A texture created with arrayLength has several layers, and a RenderTarget with the layer option renders into one of them. Four cameras fill the four layers of one texture, each rolled a quarter turn, and a ShaderMaterial with a sampler2DArray shows them in a grid; the full view shows a single layer at a time.',
  section: 'Graphics: Advanced Rendering',
  tags: ['RenderTarget', 'layer', 'arrayLength', 'sampler2DArray', 'Texture', 'ShaderMaterial'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/render-targets.md', 'repo/docs/user-manual/graphics/textures.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
