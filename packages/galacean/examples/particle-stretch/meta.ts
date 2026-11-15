// galacean example: Particle stretch billboard
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle stretch billboard",
  summary:
    "In StretchBillboard mode, velocityScale and lengthScale stretch each particle along its motion into streaks; both values change over time and have sliders in the full view.",
  section: "Particle",
  tags: ['velocityScale', 'lengthScale', 'ParticleRenderMode.StretchBillboard'],
  docs: [
    'repo/docs/en/graphics/particle/renderer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
