// galacean example: Shadows from a directional light
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shadows from a directional light",
  summary:
    "The shadow recipe: a DirectLight with a shadowType, scene.castShadows as the master switch and castShadows/receiveShadows on the renderers. The sun swings round and the shadows follow; the full view has the switches.",
  section: "Light",
  tags: ['DirectLight', 'shadowType', 'ShadowType', 'scene.castShadows', 'MeshRenderer.castShadows'],
  docs: [
    'repo/docs/en/graphics/light/shadow.mdx',
    'repo/docs/en/graphics/light/directional.mdx',
    'repo/docs/en/graphics/renderer/meshRenderer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
