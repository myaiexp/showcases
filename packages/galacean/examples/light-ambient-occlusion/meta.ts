// galacean example: Ambient occlusion on and off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Ambient occlusion on and off",
  summary:
    "Ambient occlusion darkens creases and contact areas where objects block ambient light. A cluster of stacked boxes under only an environment light, with scene.ambientOcclusion.enabled toggling in the card.",
  section: "Light",
  tags: ['scene.ambientOcclusion', 'AmbientOcclusion.enabled'],
  docs: [
    'repo/docs/en/graphics/light/ambientOcclusion.mdx',
    'repo/docs/en/graphics/light/ambient.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
