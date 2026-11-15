// galacean example: Bloom scatter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bloom scatter",
  summary: "scatter sets how far the bloom spreads (default 0.7): low values keep a tight glow around the shapes, high values wash a wide haze across the frame.",
  section: "Post Process",
  tags: ['BloomEffect','scatter'],
  docs: [
    'repo/docs/en/graphics/postProcess/effects.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
