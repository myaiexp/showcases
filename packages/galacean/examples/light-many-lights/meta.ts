// galacean example: Several lights of each kind
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Several lights of each kind",
  summary:
    "The overview notes up to ten lights of each type are supported: three orbiting coloured point lights and two spotlights over a plain floor, with the direct light left out.",
  section: "Light",
  tags: ['DirectLight', 'PointLight', 'SpotLight', 'color'],
  docs: [
    'repo/docs/en/graphics/light/light.mdx',
    'repo/docs/en/graphics/light/point.mdx',
    'repo/docs/en/graphics/light/spot.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
