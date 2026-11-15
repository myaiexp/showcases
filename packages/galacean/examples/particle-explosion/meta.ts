// galacean example: Particle explosion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle explosion",
  summary:
    "One Burst of 80 particles from a small SphereShape with random speeds and sizes, a size curve that peaks early and a hot-to-dark gradient, looping every 2.5 seconds. A play button in the full view.",
  section: "Particle",
  tags: ['Burst', 'SphereShape', 'sizeOverLifetime', 'colorOverLifetime'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-main-module.mdx',
    'repo/docs/en/graphics/particle/renderer-emission-module.mdx',
    'repo/docs/en/graphics/particle/renderer-size-module.mdx',
    'repo/docs/en/graphics/particle/renderer-color-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
