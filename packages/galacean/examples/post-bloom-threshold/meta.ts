// galacean example: Bloom threshold
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bloom threshold",
  summary: "Bloom filters out pixels below the threshold brightness (in gamma space, default 0.9): lowering it lets more of the scene glow. The card sweeps the value; the full view has a slider.",
  section: "Post Process",
  tags: ['BloomEffect','threshold'],
  docs: [
    'repo/docs/en/graphics/postProcess/effects.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
