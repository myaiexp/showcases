// galacean example: Particle force over lifetime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle force over lifetime",
  summary:
    "forceOverLifetime pushes particles like wind: none, a constant forceX swinging in the card, and a curve from -3 to 3. Sliders for forceX and forceZ in the full view.",
  section: "Particle",
  tags: ['forceOverLifetime', 'forceX', 'forceZ'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-force-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
