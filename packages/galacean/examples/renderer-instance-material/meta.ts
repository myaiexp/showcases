// galacean example: getMaterial versus getInstanceMaterial
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "getMaterial versus getInstanceMaterial",
  summary:
    "Two cubes share one material. Editing getMaterial() colours both; getInstanceMaterial() first clones the material for that renderer, so only one cube changes. The card alternates the two.",
  section: "Renderer",
  tags: ['Renderer.getMaterial', 'Renderer.getInstanceMaterial', 'setMaterial'],
  docs: [
    'repo/docs/en/graphics/renderer/renderer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
