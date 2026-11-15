// galacean example: Particle bursts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle bursts",
  summary:
    "Three Burst objects at 0, 1 and 2 seconds with growing counts on an emitter with rate 0, looping every three seconds. Buttons add, remove and clear bursts in the full view.",
  section: "Particle",
  tags: ['Burst', 'emission.addBurst', 'removeBurstByIndex', 'clearBurst'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-emission-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
