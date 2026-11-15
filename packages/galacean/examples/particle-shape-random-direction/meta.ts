// galacean example: Particle random direction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle random direction",
  summary:
    "randomDirectionAmount blends the shape direction with a random one, and shape.enabled switches the shape off altogether, so a thin line emitter fans out. Controls in the full view.",
  section: "Particle",
  tags: ['randomDirectionAmount', 'BaseShape.enabled', 'BoxShape'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-emission-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
