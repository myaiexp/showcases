// galacean example: Particle fire
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle fire",
  summary:
    "A fire built from modules: a narrow ConeShape, random start values, a yellow to red gradient with alpha, and a size curve that shrinks the flames as they rise. A slider changes the cone angle in the full view.",
  section: "Particle",
  tags: ['ConeShape', 'colorOverLifetime', 'sizeOverLifetime', 'BlendMode.Additive'],
  docs: [
    'repo/docs/en/graphics/particle/renderer.mdx',
    'repo/docs/en/graphics/particle/renderer-emission-module.mdx',
    'repo/docs/en/graphics/particle/renderer-color-module.mdx',
    'repo/docs/en/graphics/particle/renderer-size-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
