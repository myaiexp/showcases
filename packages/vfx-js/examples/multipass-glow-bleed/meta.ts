// VFX-JS example: a glow that spills into the overflow area across three passes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Glow bleed with overflow',
  summary:
    'The multipass guide\'s glow bleed: pass 0 copies the headline into a buffer, pass 1 blurs it out into the 40px overflow, and the last pass lays the element over its glow. With overflow, buffers cover the element plus the extra room, so every buffer is read through toBuffer(uv) while uv stays element space.',
  section: 'Multipass',
  tags: ['multipass', 'overflow', 'toBuffer', 'viewport', 'glow'],
  docs: ['repo/docs/MULTIPASS.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
