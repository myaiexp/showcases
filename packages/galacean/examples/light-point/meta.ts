// galacean example: Point light
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point light",
  summary:
    "A PointLight shines in every direction from one position and fades out at its distance. A glowing marker orbits the shapes carrying the light, with a distance and colour as in the docs.",
  section: "Light",
  tags: ['PointLight', 'distance', 'color', 'transform.setPosition'],
  docs: [
    'repo/docs/en/graphics/light/point.mdx',
    'repo/docs/en/graphics/light/light.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
