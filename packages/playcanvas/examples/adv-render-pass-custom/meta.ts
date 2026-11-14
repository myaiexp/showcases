// playcanvas example: Custom RenderPass textures
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom RenderPass textures',
  summary:
    'Two RenderPass subclasses, attached to no camera, generate a brick texture and a normal map from its height. Each overrides postInit to clear, execute to draw a QuadRender with default draw states, and destroy; they render on their own from the prerender event, every frame while the card animates and in the full view only when a slider changes.',
  section: 'Graphics: Advanced Rendering',
  tags: ['RenderPass', 'QuadRender', 'postInit', 'execute', 'setDrawStates', 'setClearColor', 'render', 'prerender', 'normalMap'],
  docs: [
    'repo/docs/user-manual/graphics/advanced-rendering/frame-graph/render-pass.md',
    'repo/docs/user-manual/graphics/advanced-rendering/frame-graph/frame-passes.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
