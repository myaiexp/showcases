// galacean example: Cast and receive shadows per renderer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cast and receive shadows per renderer",
  summary:
    "The caster sphere floats over a cube and the floor. The card steps through the sphere's castShadows and the cube's and floor's receiveShadows so the shadow vanishes from one surface or the other.",
  section: "Light",
  tags: ['Renderer.castShadows', 'Renderer.receiveShadows'],
  docs: [
    'repo/docs/en/graphics/light/shadow.mdx',
    'repo/docs/en/graphics/renderer/meshRenderer.mdx',
    'repo/docs/en/graphics/renderer/renderer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
