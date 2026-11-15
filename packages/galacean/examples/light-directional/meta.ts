// galacean example: Directional light colour and direction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Directional light colour and direction",
  summary:
    "A DirectLight on a child entity: color tints its parallel rays and the entity's rotation sets their direction. The card turns the light around the shapes and sweeps its colour.",
  section: "Light",
  tags: ['DirectLight', 'color', 'transform.setRotation'],
  docs: [
    'repo/docs/en/graphics/light/directional.mdx',
    'repo/docs/en/graphics/light/light.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
