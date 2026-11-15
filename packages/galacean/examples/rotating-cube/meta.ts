// galacean example: the quick start's rotating model, built in script
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rotating cube',
  summary:
    "The quick start's scene without the Editor: a WebGLEngine, a root entity with a camera, a directional light and a cube, and a Script component whose onUpdate rotates its entity one degree per frame.",
  section: 'Basics',
  tags: ['WebGLEngine', 'createRootEntity', 'Script', 'onUpdate', 'transform.rotate', 'PrimitiveMesh'],
  docs: [
    'repo/docs/en/basics/quickStart/quick-start.mdx',
    'repo/docs/en/core/engine.mdx',
    'repo/docs/en/core/entity.mdx',
    'repo/docs/en/graphics/mesh/primitiveMesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
