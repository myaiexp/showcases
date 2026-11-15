// galacean example: Spotlight penumbra
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Spotlight penumbra",
  summary:
    "Spotlight edges: with penumbra 0 the cone ends sharply; a larger penumbra fades the intensity to zero across that angle. The card sweeps penumbra with the cone fixed on a wall.",
  section: "Light",
  tags: ['SpotLight', 'penumbra', 'angle'],
  docs: [
    'repo/docs/en/graphics/light/spot.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
