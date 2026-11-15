// galacean example: Bloom tint
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bloom tint",
  summary: "tint colours the glow: a white tint keeps each shape's own halo, a red or blue one washes the whole bloom in that hue. The card cycles the tint; the full view has a colour picker.",
  section: "Post Process",
  tags: ['BloomEffect','tint','Color'],
  docs: [
    'repo/docs/en/graphics/postProcess/effects.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
