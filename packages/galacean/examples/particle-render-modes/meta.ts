// galacean example: Particle render modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle render modes",
  summary:
    "Arrow particles drawn with ParticleRenderMode Billboard, StretchBillboard, Mesh (a cone) and None side by side. HorizontalBillboard and VerticalBillboard are in the enum but throw Not implemented in 1.6.13, so they are left out. A select changes the first emitter in the full view.",
  section: "Particle",
  tags: ['ParticleRenderer.renderMode', 'ParticleRenderMode'],
  docs: [
    'repo/docs/en/graphics/particle/renderer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
