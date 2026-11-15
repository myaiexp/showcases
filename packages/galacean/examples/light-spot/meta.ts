// galacean example: Spotlight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Spotlight",
  summary:
    "A SpotLight with the docs' angle and penumbra, aimed by its entity's rotation: a cone of light that sweeps over three shapes. Sliders set angle, penumbra and distance in the full view.",
  section: "Light",
  tags: ['SpotLight', 'angle', 'penumbra', 'color', 'distance'],
  docs: [
    'repo/docs/en/graphics/light/spot.mdx',
    'repo/docs/en/graphics/light/light.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
